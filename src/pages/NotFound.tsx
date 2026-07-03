import { Link } from 'react-router-dom';

import { ROUTES } from '@/config/routes';

/** Page 404. */
export function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="font-display text-brass-500 text-6xl">404</p>
        <p className="text-ink-500 mt-2 text-sm">Page introuvable.</p>
        <Link
          to={ROUTES.home}
          className="text-ink-800 mt-6 inline-block underline underline-offset-4"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
