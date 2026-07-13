import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routes } from '@/routes';
import '@/styles/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("[main] Élément racine '#root' introuvable dans index.html.");
}

// Une navigation vers une nouvelle pièce repart toujours de son seuil. Cette
// consigne empêche également le navigateur de restaurer une position obsolète
// avant que le routeur puisse appliquer son propre reset.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const router = createBrowserRouter(routes);

const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// Hydrate le HTML pré-rendu (SSG) s'il est présent, sinon rend depuis zéro (dev).
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
