import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type TransitionPhase = 'idle' | 'closing' | 'opening';

const WATER_CLOSE_MS = 980;
const WATER_OPEN_MS = 1180;

function isPlainInternalClick(event: MouseEvent, anchor: HTMLAnchorElement) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    !anchor.download &&
    (!anchor.target || anchor.target === '_self')
  );
}

/**
 * Raccord de mise en scène réservé aux Bains : la page en cours est recouverte
 * par une nappe d'eau, puis les deux pans s'écartent sur la pièce minérale.
 * Le lien reste un vrai lien et le mouvement réduit conserve une navigation
 * immédiate, sans écran intermédiaire.
 */
export function CinematicPageTransition() {
  const location = useLocation();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [destination, setDestination] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      const anchor =
        target instanceof Element
          ? target.closest<HTMLAnchorElement>('a[href]')
          : null;

      if (!anchor || !isPlainInternalClick(event, anchor) || phase !== 'idle')
        return;

      const destination = new URL(anchor.href, window.location.href);
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (
        destination.origin !== window.location.origin ||
        destination.pathname !== '/bains' ||
        location.pathname === '/bains'
      ) {
        return;
      }

      event.preventDefault();
      if (reducedMotion) {
        void navigate(
          `${destination.pathname}${destination.search}${destination.hash}`,
        );
        return;
      }

      setDestination(
        `${destination.pathname}${destination.search}${destination.hash}`,
      );
      setPhase('closing');
      document.body.dataset.cinematicTransition = 'water';
    };

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
    };
  }, [location.pathname, navigate, phase]);

  useEffect(() => {
    if (phase !== 'closing' || !destination) return;
    const timer = window.setTimeout(() => {
      void navigate(destination);
      setPhase('opening');
    }, WATER_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [destination, navigate, phase]);

  useEffect(() => {
    if (phase !== 'opening') return;
    const timer = window.setTimeout(() => {
      setPhase('idle');
      setDestination(null);
      delete document.body.dataset.cinematicTransition;
    }, WATER_OPEN_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(
    () => () => {
      delete document.body.dataset.cinematicTransition;
    },
    [],
  );

  return (
    <div className="water-transition" data-phase={phase} aria-hidden="true">
      <div className="water-transition-lens" />
      <div className="water-transition-sheet water-transition-sheet-left">
        <i />
      </div>
      <div className="water-transition-sheet water-transition-sheet-right">
        <i />
      </div>
      <div className="water-transition-caustics" />
    </div>
  );
}
