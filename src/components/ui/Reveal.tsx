import { type ReactNode, useEffect, useRef } from 'react';

/**
 * Révélation « feutrée » au défilement (luxe silencieux).
 *
 * Conception : aucune valeur d'état React n'est utilisée, seule une classe est
 * ajoutée au nœud via `IntersectionObserver`. Le rendu serveur (SSG) et
 * l'hydratation client produisent donc exactement le même HTML — pas de
 * décalage. Sans JavaScript, le contenu reste visible (progressive
 * enhancement) ; `prefers-reduced-motion` neutralise l'animation.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  /** Retard d'apparition en millisecondes (pour un effet de cascade). */
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      className={className}
      style={
        delay ? ({ transitionDelay: `${String(delay)}ms` } as const) : undefined
      }
    >
      {children}
    </Tag>
  );
}
