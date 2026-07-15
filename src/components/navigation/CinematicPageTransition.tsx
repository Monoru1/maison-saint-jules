import { useEffect, useRef, useState, type ComponentType } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { waterCurtainTiming } from '@/components/cinematic/water-curtain-timing';
import type { WaterCurtainPhase } from '@/components/cinematic/WaterCurtain';

type TransitionPhase = 'idle' | 'closing' | 'opening';
type WaterCurtainComponent = ComponentType<{ phase: WaterCurtainPhase }>;

let waterCurtainModule: Promise<{
  WaterCurtain: WaterCurtainComponent;
}> | null = null;

function loadWaterCurtain() {
  waterCurtainModule ??= import('@/components/cinematic/WaterCurtain');
  return waterCurtainModule;
}

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
  const [Curtain, setCurtain] = useState<WaterCurtainComponent | null>(null);
  const armed = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const findBainsAnchor = (target: EventTarget | null) => {
      const anchor =
        target instanceof Element
          ? target.closest<HTMLAnchorElement>('a[href]')
          : null;
      if (!anchor) return null;
      const destination = new URL(anchor.href, window.location.href);
      return destination.origin === window.location.origin &&
        destination.pathname === '/bains'
        ? { anchor, destination }
        : null;
    };

    const warmTransition = (event: Event) => {
      if (findBainsAnchor(event.target)) void loadWaterCurtain();
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      const match = findBainsAnchor(target);
      const anchor = match?.anchor ?? null;

      if (
        !anchor ||
        !match ||
        !isPlainInternalClick(event, anchor) ||
        phase !== 'idle' ||
        armed.current
      )
        return;

      const { destination } = match;
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (location.pathname === '/bains') return;

      event.preventDefault();
      if (reducedMotion) {
        void navigate(
          `${destination.pathname}${destination.search}${destination.hash}`,
        );
        return;
      }

      const nextPath = `${destination.pathname}${destination.search}${destination.hash}`;
      armed.current = true;
      document.body.dataset.cinematicTransition = 'water';
      void loadWaterCurtain()
        .then(({ WaterCurtain }) => {
          if (cancelled) return;
          setCurtain(() => WaterCurtain);
          setDestination(nextPath);
          setPhase('closing');
        })
        .catch(() => {
          armed.current = false;
          delete document.body.dataset.cinematicTransition;
          if (!cancelled) void navigate(nextPath);
        });
    };

    document.addEventListener('pointerover', warmTransition, true);
    document.addEventListener('focusin', warmTransition, true);
    document.addEventListener('click', onClick, true);
    return () => {
      cancelled = true;
      document.removeEventListener('pointerover', warmTransition, true);
      document.removeEventListener('focusin', warmTransition, true);
      document.removeEventListener('click', onClick, true);
    };
  }, [location.pathname, navigate, phase]);

  useEffect(() => {
    if (phase !== 'closing' || !destination) return;
    const timer = window.setTimeout(() => {
      void navigate(destination);
      setPhase('opening');
    }, waterCurtainTiming.closing);
    return () => window.clearTimeout(timer);
  }, [destination, navigate, phase]);

  useEffect(() => {
    if (phase !== 'opening') return;
    const timer = window.setTimeout(() => {
      setPhase('idle');
      setDestination(null);
      setCurtain(null);
      armed.current = false;
      delete document.body.dataset.cinematicTransition;
    }, waterCurtainTiming.opening);
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
      {Curtain ? <Curtain phase={phase} /> : null}
    </div>
  );
}
