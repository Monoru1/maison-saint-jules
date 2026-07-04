import type { Suite } from '@/hotel/types';
import type { Extra, PriceBreakdown, StayDetails } from '@/reservation/types';
import { extraCost } from '@/reservation/utils/pricing';
import { formatDate, formatPrice } from '@/utils/format';

interface SummaryAsideProps {
  stay: StayDetails;
  suite: Suite | undefined;
  selectedExtras: readonly Extra[];
  pricing: PriceBreakdown;
}

/** Récapitulatif live du séjour et du prix estimé (réutilisé dans le tunnel). */
export function SummaryAside({
  stay,
  suite,
  selectedExtras,
  pricing,
}: SummaryAsideProps) {
  const guests = stay.adults + stay.children;

  return (
    <aside
      aria-label="Récapitulatif de la demande"
      className="bg-ivory-muted border-ink-200/70 h-fit border p-6 lg:sticky lg:top-28"
    >
      <h2 className="font-display text-ink-900 text-xl">Votre séjour</h2>

      <dl className="mt-5 space-y-3 text-sm">
        <Row
          label="Arrivée"
          value={stay.arrival ? formatDate(stay.arrival) : '—'}
        />
        <Row
          label="Départ"
          value={stay.departure ? formatDate(stay.departure) : '—'}
        />
        <Row
          label="Nuits"
          value={pricing.nights > 0 ? String(pricing.nights) : '—'}
        />
        <Row
          label="Voyageurs"
          value={`${guests} ${guests > 1 ? 'personnes' : 'personne'}`}
        />
        <Row label="Suite" value={suite?.name ?? '—'} />
      </dl>

      {selectedExtras.length > 0 ? (
        <ul className="border-ink-200/70 mt-5 space-y-2 border-t pt-5 text-sm">
          {selectedExtras.map((extra) => (
            <li
              key={extra.id}
              className="text-ink-600 flex justify-between gap-4"
            >
              <span>{extra.name}</span>
              <span>
                {formatPrice(
                  extraCost(extra, { nights: pricing.nights, guests }),
                )}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <dl className="border-ink-200/70 mt-5 space-y-2 border-t pt-5 text-sm">
        <Row label="Sous-total suite" value={formatPrice(pricing.subtotal)} />
        <Row label="Options" value={formatPrice(pricing.extrasTotal)} />
      </dl>

      <div className="border-ink-900/10 mt-4 flex items-baseline justify-between border-t pt-4">
        <span className="font-display text-ink-900 text-lg">Total estimé</span>
        <span className="font-display text-brass-600 text-2xl">
          {formatPrice(pricing.total)}
        </span>
      </div>
      <p className="text-ink-400 mt-3 text-xs">
        Estimation hors taxe de séjour. Aucun paiement à ce stade.
      </p>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-400">{label}</dt>
      <dd className="text-ink-800 text-right">{value}</dd>
    </div>
  );
}
