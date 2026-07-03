import { Link } from 'react-router-dom';

import { APP } from '@/config';
import { ROUTES } from '@/config/routes';

/**
 * Page d'accueil publique — placeholder premium.
 * Le contenu marketing et le tunnel de réservation seront construits lors des
 * itérations dédiées au site public.
 */
export function Home() {
  return (
    <div className="grid min-h-dvh place-items-center px-6 text-center">
      <div className="max-w-lg">
        <p className="text-brass-600 text-xs tracking-[0.35em] uppercase">
          Hôtel · Paris
        </p>
        <h1 className="font-display text-ink-900 mt-3 text-6xl">{APP.name}</h1>
        <p className="text-ink-500 mt-4">{APP.description}</p>
        <p className="text-ink-400 mt-10 text-sm">
          Site en préparation — réservation bientôt disponible.
        </p>
        <Link
          to={ROUTES.admin.login}
          className="text-ink-300 hover:text-ink-500 mt-8 inline-block text-xs underline underline-offset-4"
        >
          Administration
        </Link>
      </div>
    </div>
  );
}
