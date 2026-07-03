import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@/config/routes';
import { useAuth } from '@/hooks/useAuth';

/**
 * Garde de route : n'autorise l'accès qu'aux utilisateurs authentifiés.
 * Pendant la vérification de session, affiche un état de chargement neutre ;
 * un invité est redirigé vers la page de connexion admin.
 */
export function ProtectedRoute() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div className="text-ink-400 grid min-h-dvh place-items-center text-sm">
        Chargement…
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <Navigate
        to={ROUTES.admin.login}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
