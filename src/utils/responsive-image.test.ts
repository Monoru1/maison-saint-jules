import { describe, expect, it } from 'vitest';
import { responsiveImageProps } from './responsive-image';

describe('responsiveImageProps', () => {
  it('expose les variantes 640, 1024 et originale pour un grand visuel', () => {
    expect(
      responsiveImageProps('/images/hotel/threshold-dawn.webp', '100vw'),
    ).toEqual({
      src: '/images/hotel/threshold-dawn.webp',
      srcSet:
        '/images/hotel/threshold-dawn-640.webp 640w, /images/hotel/threshold-dawn-1024.webp 1024w, /images/hotel/threshold-dawn.webp 1600w',
      sizes: '100vw',
    });
  });

  it("n'annonce pas une variante plus large que l'image originale", () => {
    expect(
      responsiveImageProps(
        '/images/hotel/threshold-dawn-portrait.webp',
        '100vw',
      ).srcSet,
    ).toBe(
      '/images/hotel/threshold-dawn-portrait-640.webp 640w, /images/hotel/threshold-dawn-portrait.webp 941w',
    );
  });

  it('conserve un visuel non répertorié sans inventer de variantes', () => {
    expect(responsiveImageProps('/images/unknown.webp', '50vw')).toEqual({
      src: '/images/unknown.webp',
      sizes: '50vw',
    });
  });
});
