import type { GalleryImage } from '@/hotel/types';

/** Composition d'aperçu de la galerie (visuels réels ajoutés ultérieurement). */
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
      src: '/images/suites/suite-jardin-cover.webp',
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
      src: '/images/suites/suite-jardin-cover.webp',
      alt: 'Suite raffinée baignée de lumière',
      category: 'gallery',
    },
  },
  {
    id: 'table',
    featured: true,
    image: {
      src: '/images/suites/suite-jardin-cover.webp',
      alt: 'Table dressée au restaurant Le Cabinet',
      category: 'gallery',
    },
  },
  {
    id: 'spa',
    image: {
      src: '/images/hotel/jardin-apres-pluie.webp',
      alt: 'Bassin du spa sous les voûtes de pierre',
      category: 'gallery',
    },
  },
] as const;
