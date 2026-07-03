import { Outlet } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthProvider';

/**
 * Fournit le contexte d'authentification au seul sous-arbre d'administration.
 * Chargé en `lazy` : Appwrite et la logique d'auth restent hors du bundle
 * public et du chemin de pré-rendu (SSG).
 */
export function AdminProviders() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
