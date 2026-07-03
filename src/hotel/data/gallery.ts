import type { GalleryImage } from '@/hotel/types';

/** Composition d'aperçu de la galerie (visuels réels ajoutés ultérieurement). */
export const galleryImages: readonly GalleryImage[] = [
  {
    id: 'facade',
    featured: true,
    image: {
      src: null,
      alt: 'Façade haussmannienne de la Maison au crépuscule',
      category: 'gallery',
    },
  },
  {
    id: 'salon',
    image: {
      src: null,
      alt: 'Salon feutré aux boiseries d’époque',
      category: 'gallery',
    },
  },
  {
    id: 'jardin',
    image: { src: null, alt: 'Jardin privé et fontaine', category: 'gallery' },
  },
  {
    id: 'suite',
    image: {
      src: null,
      alt: 'Suite raffinée baignée de lumière',
      category: 'gallery',
    },
  },
  {
    id: 'table',
    featured: true,
    image: {
      src: null,
      alt: 'Table dressée au restaurant Le Cabinet',
      category: 'gallery',
    },
  },
  {
    id: 'spa',
    image: {
      src: null,
      alt: 'Bassin du spa sous les voûtes de pierre',
      category: 'gallery',
    },
  },
] as const;
