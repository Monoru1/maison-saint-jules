import type { JSX } from 'react';
import { useEffect, useState } from 'react';

import { APP } from '@/config';
import { pingAppwrite } from '@/lib/appwrite';
import type { AsyncStatus } from '@/types';

/**
 * Écran de démarrage temporaire (scaffolding).
 *
 * Il n'appartient à aucune page de l'hôtel : son seul rôle est de confirmer
 * que la base technique fonctionne et que la connexion à Appwrite est établie.
 * Il sera remplacé par le routeur applicatif lors des prochaines itérations.
 */
export function App(): JSX.Element {
  const [status, setStatus] = useState<AsyncStatus>('loading');

  useEffect(() => {
    let cancelled = false;

    void pingAppwrite().then((reachable) => {
      if (!cancelled) {
        setStatus(reachable ? 'success' : 'error');
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <section className="max-w-md text-center">
        <p className="text-brass-600 font-sans text-xs tracking-[0.35em] uppercase">
          Base technique
        </p>
        <h1 className="text-ink-900 font-display mt-3 text-5xl">{APP.name}</h1>
        <p className="text-ink-500 mt-4 text-sm">{APP.description}</p>

        <div className="border-ink-100 mt-10 flex items-center justify-center gap-2 border-t pt-6 text-sm">
          <ConnectionBadge status={status} />
        </div>
      </section>
    </main>
  );
}

function ConnectionBadge({ status }: { status: AsyncStatus }): JSX.Element {
  const config: Record<AsyncStatus, { dot: string; label: string }> = {
    idle: { dot: 'bg-ink-300', label: 'Appwrite — en attente' },
    loading: {
      dot: 'bg-brass-400 animate-pulse',
      label: 'Appwrite — vérification…',
    },
    success: { dot: 'bg-emerald-500', label: 'Appwrite — connecté' },
    error: { dot: 'bg-red-500', label: 'Appwrite — injoignable' },
  };

  const { dot, label } = config[status];

  return (
    <span className="text-ink-600 inline-flex items-center gap-2">
      <span className={`inline-block size-2 rounded-full ${dot}`} aria-hidden />
      {label}
    </span>
  );
}
