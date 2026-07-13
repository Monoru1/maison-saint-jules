const intrinsicWidths: Record<string, number> = {
  '/images/hotel/jardin-apres-pluie.webp': 1448,
  '/images/hotel/salon-dusk.webp': 1672,
  '/images/hotel/threshold-dawn.webp': 1600,
  '/images/hotel/threshold-dawn-portrait.webp': 941,
  '/images/hotel/vestibule-rain-v4.webp': 1672,
  '/images/restaurant/cabinet-table-v4.webp': 1672,
  '/images/restaurant/le-cabinet.webp': 1449,
  '/images/spa/baths-still.webp': 1122,
  '/images/suites/appartement-delacroix-terrace-v4.webp': 1672,
  '/images/suites/chambre-signature-bath-v4.webp': 1672,
  '/images/suites/chambre-signature-morning-v4.webp': 1672,
  '/images/suites/suite-jardin-cover.webp': 1448,
  '/images/suites/suite-jardin-salon-v4.webp': 1672,
};

const variantPath = (src: string, width: number) =>
  src.replace(/\.webp$/, `-${width}.webp`);

/** Construit un srcset stable à partir des variantes générées et commitées. */
export function responsiveImageProps(src: string, sizes: string) {
  const intrinsicWidth = intrinsicWidths[src];
  if (!intrinsicWidth) return { src, sizes };

  const candidates = [640, 1024].filter((width) => width < intrinsicWidth);
  const srcSet = [
    ...candidates.map((width) => `${variantPath(src, width)} ${width}w`),
    `${src} ${intrinsicWidth}w`,
  ].join(', ');

  return { src, srcSet, sizes };
}
