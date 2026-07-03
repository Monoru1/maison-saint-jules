/**
 * Table centralisée des chemins de routes et des ancres de sections.
 * Source de vérité unique : aucune URL codée en dur dans les composants.
 */
export const ROUTES = {
  home: '/',
  reservation: '/reservation',
  admin: {
    root: '/admin',
    login: '/admin/connexion',
  },
} as const;

/**
 * Ancres des sections de la page d'accueil (navigation par défilement).
 * Elles seront remplacées par de vraies routes au fur et à mesure que les
 * pages dédiées (Suites, Restaurant…) seront développées.
 */
export const HOME_SECTIONS = {
  signature: 'maison',
  suites: 'suites',
  restaurant: 'restaurant',
  spa: 'spa',
  experiences: 'experiences',
  gallery: 'galerie',
} as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[keyof typeof HOME_SECTIONS];
