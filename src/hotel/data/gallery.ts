import type { GalleryImage } from '@/hotel/types';

/** Composition photographique : six plans distincts, aucun substitut de marque. */
export const galleryImages: readonly GalleryImage[] = [
  {
    id: 'facade',
    featured: true,
    image: {
      src: '/images/hotel/threshold-dawn.webp',
      alt: 'Façade haussmannienne de la Maison au crépuscule',
      category: 'gallery',
    },
  },
  {
    id: 'salon',
    image: {
      src: '/images/suites/suite-jardin-salon-v4.webp',
      alt: 'Salon feutré aux boiseries d’époque',
      category: 'gallery',
    },
  },
  {
    id: 'jardin',
    image: {
      src: '/images/hotel/jardin-apres-pluie.webp',
      alt: 'Jardin privé après la pluie',
      category: 'gallery',
    },
  },
  {
    id: 'suite',
    image: {
      src: '/images/suites/chambre-signature-morning-v4.webp',
      alt: 'Suite raffinée baignée de lumière',
      category: 'gallery',
    },
  },
  {
    id: 'table',
    featured: true,
    image: {
      src: '/images/restaurant/cabinet-table-v4.webp',
      alt: 'Table dressée au restaurant Le Cabinet',
      category: 'gallery',
    },
  },
  {
    id: 'spa',
    image: {
      src: '/images/suites/chambre-signature-bath-v4.webp',
      alt: 'Bassin du spa sous les voûtes de pierre',
      category: 'gallery',
    },
  },
] as const;
