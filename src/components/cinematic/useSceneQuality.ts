import { useEffect, useState } from 'react';

export type SceneQuality = 'high' | 'balanced' | 'essential';

interface NavigatorHints extends Navigator {
  connection?: { saveData?: boolean; effectiveType?: string };
  deviceMemory?: number;
}

function supportsWebGL() {
  if (navigator.userAgent.toLowerCase().includes('jsdom')) return false;
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl', {
      failIfMajorPerformanceCaveat: true,
    });
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

export function measureSceneQuality(): SceneQuality {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return 'essential';
  }

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const navigatorHints = navigator as NavigatorHints;
  const narrow = window.matchMedia('(max-width: 639px)').matches;
  const saveData = navigatorHints.connection?.saveData === true;
  const slowConnection = ['slow-2g', '2g'].includes(
    navigatorHints.connection?.effectiveType ?? '',
  );

  if (
    reducedMotion ||
    narrow ||
    saveData ||
    slowConnection ||
    !supportsWebGL()
  ) {
    return 'essential';
  }

  const limitedCpu = (navigator.hardwareConcurrency || 4) <= 4;
  const limitedMemory = (navigatorHints.deviceMemory ?? 4) <= 4;
  if (limitedCpu || limitedMemory || window.innerWidth < 1100)
    return 'balanced';

  return 'high';
}

export function useSceneQuality() {
  const [quality, setQuality] = useState<SceneQuality>(() =>
    typeof window === 'undefined' ? 'essential' : measureSceneQuality(),
  );

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const viewport = window.matchMedia('(max-width: 639px)');
    const update = () => setQuality(measureSceneQuality());

    const subscribe = (query: MediaQueryList) => {
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', update);
      } else {
        query.addListener?.(update);
      }
    };
    const unsubscribe = (query: MediaQueryList) => {
      if (typeof query.removeEventListener === 'function') {
        query.removeEventListener('change', update);
      } else {
        query.removeListener?.(update);
      }
    };

    subscribe(motion);
    subscribe(viewport);
    return () => {
      unsubscribe(motion);
      unsubscribe(viewport);
    };
  }, []);

  return quality;
}
