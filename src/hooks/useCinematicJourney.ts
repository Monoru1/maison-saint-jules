import { useEffect, useRef } from 'react';

/** Native scroll only; CSS consumes one progress variable and scene states. */
export function useCinematicJourney() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (
      !root ||
      (typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      typeof IntersectionObserver === 'undefined'
    )
      return;
    let frame = 0;
    const scenes = Array.from(
      root.querySelectorAll<HTMLElement>('[data-scene]'),
    );
    const update = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty(
        '--journey-progress',
        String(range ? window.scrollY / range : 0),
      );
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.toggleAttribute('data-active', entry.isIntersecting),
        );
      },
      { threshold: 0.42 },
    );
    scenes.forEach((scene) => observer.observe(scene));
    update();
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener('scroll', request);
      removeEventListener('resize', request);
    };
  }, []);
  return ref;
}
