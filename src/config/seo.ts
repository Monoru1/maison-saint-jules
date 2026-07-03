export interface PageMeta {
  readonly title: string;
  readonly description: string;
}

const SITE_NAME = 'Maison Saint-Jules';

/**
 * Métadonnées SEO par page. Source de vérité unique, consommée à la fois par
 * le composant `<Seo>` (navigation SPA) et par le script de pré-rendu (SSG),
 * afin que le HTML statique de chaque route porte les bons titres et
 * descriptions.
 */
export const pageMeta = {
  home: {
    title: `${SITE_NAME} — Hôtel particulier 5 étoiles, Paris XVI`,
    description:
      "Maison Saint-Jules, hôtel particulier d'exception au cœur du 16e arrondissement de Paris. Suites raffinées, restaurant gastronomique, spa confidentiel et service concierge.",
  },
  reservation: {
    title: `Réserver un séjour — ${SITE_NAME}`,
    description:
      'Composez votre séjour à la Maison Saint-Jules, hôtel particulier 5 étoiles au cœur de Paris XVI.',
  },
  notFound: {
    title: `Page introuvable — ${SITE_NAME}`,
    description: 'La page que vous recherchez est introuvable.',
  },
} as const satisfies Record<string, PageMeta>;

export type PageMetaKey = keyof typeof pageMeta;
