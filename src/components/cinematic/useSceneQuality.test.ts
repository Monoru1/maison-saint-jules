import { afterEach, describe, expect, it, vi } from 'vitest';
import { measureSceneQuality } from './useSceneQuality';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('measureSceneQuality', () => {
  it('choisit le rendu essentiel lorsque matchMedia est indisponible', () => {
    vi.stubGlobal('matchMedia', undefined);

    expect(measureSceneQuality()).toBe('essential');
  });

  it('ne lance pas WebGL quand le mouvement réduit est demandé', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
      })),
    );
    const contextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext');

    expect(measureSceneQuality()).toBe('essential');
    expect(contextSpy).not.toHaveBeenCalled();
  });

  it('réserve la matière animée aux écrans au-dessus du mobile', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: query === '(max-width: 639px)',
      })),
    );
    const contextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext');

    expect(measureSceneQuality()).toBe('essential');
    expect(contextSpy).not.toHaveBeenCalled();
  });
});
