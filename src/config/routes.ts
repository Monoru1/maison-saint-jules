/** Table centralisée des chemins de routes publiques et privées. */
export const ROUTES = {
  home: '/',
  reservation: '/reservation',
  suites: '/suites',
  suiteDetail: (slug: string): string => `/suites/${slug}`,
  maison: '/maison',
  bains: '/bains',
  cabinet: '/cabinet',
  jardin: '/jardin',
  matin: '/matin',
  nuit: '/nuit',
  experiences: '/experiences',
  journal: '/journal',
  admin: {
    root: '/admin',
    login: '/admin/connexion',
  },
} as const;
