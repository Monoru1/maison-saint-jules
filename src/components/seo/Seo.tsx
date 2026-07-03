import { useEffect } from 'react';

import type { PageMeta } from '@/config/seo';

/**
 * Met à jour le titre et les métadonnées lors de la navigation SPA.
 * Le HTML statique initial (SSG) est produit par le script de pré-rendu ;
 * ce composant maintient la cohérence des métadonnées côté client.
 */
export function Seo({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title;
    updateMeta('name', 'description', description);
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', description);
  }, [title, description]);

  return null;
}

function updateMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
): void {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
