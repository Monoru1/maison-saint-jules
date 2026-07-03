import type { Experience } from '@/hotel/types';

export const experiences: readonly Experience[] = [
  {
    id: 'conciergerie',
    icon: 'concierge',
    title: 'Conciergerie sur-mesure',
    description:
      'Une conciergerie discrète et disponible, pour anticiper chacune de vos envies, à toute heure.',
  },
  {
    id: 'chauffeur',
    icon: 'chauffeur',
    title: 'Chauffeur privé',
    description:
      'Berline avec chauffeur à votre disposition pour parcourir Paris en toute quiétude.',
  },
  {
    id: 'visite-privee',
    icon: 'visite',
    title: 'Visites privées',
    description:
      'Accès confidentiel à des ateliers d’artistes, musées et lieux d’exception, hors des sentiers battus.',
  },
  {
    id: 'shopping',
    icon: 'shopping',
    title: 'Shopping d’exception',
    description:
      'Rendez-vous privés dans les maisons de couture et chez les artisans les plus rares de la capitale.',
  },
] as const;
