import { useAuth } from '@/hooks/useAuth';

/**
 * Tableau de bord d'administration — placeholder.
 * Les modules (chambres, réservations, contenus) seront ajoutés ensuite.
 */
export function Dashboard() {
  const { user } = useAuth();
  const greeting = user ? `, ${user.name || user.email}` : '';

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="font-display text-ink-900 text-2xl">Tableau de bord</h1>
      <p className="text-ink-500 mt-3 text-sm">
        Bienvenue{greeting}. Les modules d’administration seront ajoutés
        progressivement au cours des prochaines itérations.
      </p>
    </section>
  );
}
