import type { GalleryImage } from '@/hotel/types';

/** Composition d'aperçu de la galerie (visuels réels ajoutés ultérieurement). */
export const galleryImages: readonly GalleryImage[] = [
  {
    id: 'facade',
    alt: 'Façade haussmannienne de la Maison au crépuscule',
    image: null,
    featured: true,
  },
  { id: 'salon', alt: 'Salon feutré aux boiseries d’époque', image: null },
  { id: 'jardin', alt: 'Jardin privé et fontaine', image: null },
  { id: 'suite', alt: 'Suite raffinée baignée de lumière', image: null },
  {
    id: 'table',
    alt: 'Table dressée au restaurant Le Cabinet',
    image: null,
    featured: true,
  },
  { id: 'spa', alt: 'Bassin du spa sous les voûtes de pierre', image: null },
] as const;
