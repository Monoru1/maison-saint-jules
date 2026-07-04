import type { ReactNode } from 'react';

import { Ornament } from '@/components/ui/Ornament';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { buttonClasses } from '@/components/ui/button-variants';
import type { Suite } from '@/hotel/types';
import type {
  BookingRequestResult,
  CustomerInfo,
  Extra,
  PriceBreakdown,
  StayDetails,
} from '@/reservation/types';
import { extraCost } from '@/reservation/utils/pricing';
import { formatDate, formatPrice } from '@/utils/format';

import { StepHeading } from './StepHeading';

interface StepConfirmationProps {
  stay: StayDetails;
  suite: Suite | undefined;
  selectedExtras: readonly Extra[];
  customer: CustomerInfo;
  pricing: PriceBreakdown;
  result: BookingRequestResult | null;
  submitting: boolean;
  onSubmit: () => void;
}

/** Étape 5 — récapitulatif complet et envoi de la demande. */
export function StepConfirmation({
  stay,
  suite,
  selectedExtras,
  customer,
  pricing,
  result,
  submitting,
  onSubmit,
}: StepConfirmationProps) {
  const guests = stay.adults + stay.children;

  if (result) {
    return (
      <div className="text-center">
        <SectionLabel>Demande envoyée</SectionLabel>
        <Ornament className="mx-auto mt-6" />
        <h2 className="text-ink-900 mt-6 text-3xl md:text-4xl">
          Votre demande est prête
        </h2>
        <p className="text-ink-500 mx-auto mt-5 max-w-lg leading-relaxed">
          Merci {customer.firstName}. Votre demande de séjour a bien été
          enregistrée. Notre conciergerie vous recontacte sous 24 heures pour la
          confirmer.
        </p>
        <div className="bg-ivory-muted border-ink-200/70 mx-auto mt-10 max-w-sm border p-6">
          <p className="text-ink-400 font-sans text-[0.7rem] tracking-[0.2em] uppercase">
            Référence
          </p>
          <p className="font-display text-ink-900 mt-1 text-2xl">
            {result.reference}
          </p>
          <p className="text-brass-600 mt-3 font-sans text-xs tracking-[0.15em] uppercase">
            Demande de réservation prête
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StepHeading
        step="Étape 5"
        title="Confirmation"
        subtitle="Vérifiez votre demande avant de l’envoyer. Aucun paiement à ce stade."
      />

      <div className="divide-ink-200/70 border-ink-200/70 divide-y border-y">
        <RecapRow label="Arrivée">{formatDate(stay.arrival)}</RecapRow>
        <RecapRow label="Départ">{formatDate(stay.departure)}</RecapRow>
        <RecapRow label="Nuits">{pricing.nights}</RecapRow>
        <RecapRow label="Voyageurs">
          {guests} {guests > 1 ? 'personnes' : 'personne'}
        </RecapRow>
        <RecapRow label="Suite">
          {suite
            ? `${suite.name} — ${formatPrice(suite.priceFrom)} / nuit`
            : '—'}
        </RecapRow>
        <RecapRow label="Options">
          {selectedExtras.length > 0 ? (
            <ul className="space-y-1">
              {selectedExtras.map((extra) => (
                <li key={extra.id}>
                  {extra.name} —{' '}
                  {formatPrice(
                    extraCost(extra, { nights: pricing.nights, guests }),
                  )}
                </li>
              ))}
            </ul>
          ) : (
            'Aucune option'
          )}
        </RecapRow>
        <RecapRow label="Client">
          {customer.firstName} {customer.lastName}
          <br />
          {customer.email} · {customer.phone}
          {customer.specialRequest ? (
            <>
              <br />
              <span className="text-ink-500 italic">
                « {customer.specialRequest} »
              </span>
            </>
          ) : null}
        </RecapRow>
      </div>

      <div className="border-ink-900/10 mt-6 flex items-baseline justify-between border-t pt-6">
        <span className="font-display text-ink-900 text-lg">Total estimé</span>
        <span className="font-display text-brass-600 text-2xl">
          {formatPrice(pricing.total)}
        </span>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting}
        className={`${buttonClasses({ variant: 'primary', size: 'lg' })} mt-10 w-full disabled:opacity-60 sm:w-auto`}
      >
        {submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </button>
    </div>
  );
}

function RecapRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 py-4 sm:grid-cols-[10rem_1fr]">
      <dt className="text-ink-400 font-sans text-xs tracking-[0.15em] uppercase">
        {label}
      </dt>
      <dd className="text-ink-800 text-sm leading-relaxed">{children}</dd>
    </div>
  );
}
