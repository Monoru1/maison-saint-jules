import { Outlet, useNavigate } from 'react-router-dom';

import { APP } from '@/config';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/hooks/useAuth';

/**
 * Gabarit de l'espace d'administration.
 * En-tête minimal avec identité de session et action de déconnexion.
 */
export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    void navigate(ROUTES.admin.login, { replace: true });
  };

  return (
    <div className="bg-ivory min-h-dvh">
      <header className="border-ink-100 flex items-center justify-between border-b px-6 py-4">
        <span className="font-display text-ink-900 text-lg">
          {APP.name} · <span className="text-brass-600">Administration</span>
        </span>
        <div className="text-ink-500 flex items-center gap-4 text-sm">
          {user ? <span>{user.email}</span> : null}
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="text-ink-700 hover:text-ink-900 underline underline-offset-4"
          >
            Déconnexion
          </button>
        </div>
      </header>
      <main className="px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
