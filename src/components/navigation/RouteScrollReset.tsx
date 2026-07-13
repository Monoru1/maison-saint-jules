import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Une nouvelle pièce commence toujours depuis son seuil, jamais depuis la
 * position occupée dans la pièce précédente.
 */
export function RouteScrollReset() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    // Le site utilise un scroll doux pour la traversée. On le neutralise le
    // temps du changement de route afin d'éviter une descente visible.
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    root.style.scrollBehavior = previousScrollBehavior;
  }, [pathname]);

  return null;
}
