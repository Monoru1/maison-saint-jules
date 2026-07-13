import { useEffect, useRef, useState } from 'react';

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function useLivingHouseCamera(sceneCount: number) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;

    const scenes = Array.from(
      root.querySelectorAll<HTMLElement>('[data-house-scene]'),
    );
    const compactQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(max-width: 767px)')
        : null;
    const modestDevice = (navigator.hardwareConcurrency || 8) <= 4;
    let frame = 0;
    let lastActive = -1;

    const measure = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const viewportCenter = viewport * 0.52;
      const rootRect = root.getBoundingClientRect();
      const journey = Math.max(rootRect.height - viewport, 1);
      const overall = clamp(-rootRect.top / journey);
      let nearest = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      const observations = scenes.map((scene, index) => {
        const rect = scene.getBoundingClientRect();
        const local = clamp((viewport - rect.top) / (viewport + rect.height));
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < nearestDistance) {
          nearest = index;
          nearestDistance = distance;
        }
        return { scene, index, local };
      });

      const compact = compactQuery?.matches === true || modestDevice;
      observations.forEach(({ scene, index, local }) => {
        if (Math.abs(index - nearest) > 1) return;
        const entrance = clamp(local / 0.42);
        const exit = clamp((1 - local) / 0.2);
        const presence = Math.min(entrance, exit);
        scene.style.setProperty(
          '--local-shift',
          `${(-3 + local * 6).toFixed(2)}%`,
        );
        scene.style.setProperty(
          '--copy-shift',
          `${((0.52 - local) * 44).toFixed(2)}px`,
        );
        scene.style.setProperty(
          '--threshold-open',
          `${(local * 46).toFixed(2)}%`,
        );
        scene.style.setProperty(
          '--reflection-shift',
          `${(local * 420).toFixed(2)}%`,
        );
        scene.style.setProperty('--shadow-shift', `${(local * 8).toFixed(2)}%`);
        scene.style.setProperty(
          '--linen-skew',
          `${(-3 + local * 3).toFixed(2)}deg`,
        );
        scene.style.setProperty(
          '--steam-opacity',
          (0.28 + local * 0.5).toFixed(3),
        );
        scene.style.setProperty('--scene-entry', entrance.toFixed(4));
        scene.style.setProperty('--scene-presence', presence.toFixed(4));
        scene.style.setProperty(
          '--scene-scale',
          (1.16 - entrance * 0.1 + (1 - exit) * 0.025).toFixed(4),
        );
        scene.style.setProperty(
          '--scene-blur',
          `${(compact ? 0 : (1 - entrance) * 8).toFixed(2)}px`,
        );
        scene.style.setProperty(
          '--scene-inset',
          `${((1 - entrance) * 44).toFixed(2)}%`,
        );
        scene.style.setProperty(
          '--iris-radius',
          `${(8 + entrance * 112).toFixed(2)}%`,
        );
        scene.style.setProperty(
          '--copy-opacity',
          clamp((presence - 0.18) * 1.7).toFixed(3),
        );
        scene.style.setProperty(
          '--light-travel',
          `${(-45 + local * 155).toFixed(2)}%`,
        );
      });

      const mappedScene = Math.round(
        clamp(nearest - 1, 0, Math.max(sceneCount - 1, 0)),
      );

      root.style.setProperty('--house-progress', overall.toFixed(4));
      root.style.setProperty(
        '--camera-opacity',
        (0.12 + overall * 0.28).toFixed(3),
      );
      root.style.setProperty(
        '--jamb-opacity',
        (0.18 + overall * 0.42).toFixed(3),
      );
      root.style.setProperty('--jamb-shift', `${(overall * -42).toFixed(2)}%`);
      root.style.setProperty('--focus-opacity', (overall * 0.12).toFixed(3));
      root.style.setProperty('--active-scene', String(mappedScene));
      root.dataset.activeScene = String(mappedScene);

      if (mappedScene !== lastActive) {
        lastActive = mappedScene;
        setActiveScene(mappedScene);
      }
    };

    const requestMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', requestMeasure, { passive: true });
    window.addEventListener('resize', requestMeasure, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestMeasure);
      window.removeEventListener('resize', requestMeasure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sceneCount]);

  return { activeScene, rootRef };
}
