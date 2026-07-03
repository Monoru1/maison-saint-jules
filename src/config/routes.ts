/**
 * Table centralisée des chemins de routes.
 * Source de vérité unique : aucune URL codée en dur dans les composants.
 */
export const ROUTES = {
  home: '/',
  admin: {
    root: '/admin',
    login: '/admin/connexion',
  },
} as const;
