import type { Extra, PriceBreakdown } from '@/reservation/types';

interface PricingInput {
  /** Prix par nuit de la suite sélectionnée (0 si aucune). */
  readonly nightlyRate: number;
  readonly nights: number;
  /** Nombre total de personnes (adultes + enfants) pour la facturation « par personne ». */
  readonly guests: number;
  readonly selectedExtras: readonly Extra[];
}

/** Coût d'une option selon son mode de facturation. */
export function extraCost(
  extra: Extra,
  context: { nights: number; guests: number },
): number {
  switch (extra.billing) {
    case 'per-stay':
      return extra.price;
    case 'per-night':
      return extra.price * context.nights;
    case 'per-person':
      return extra.price * context.guests;
  }
}

/**
 * Calcule le détail du prix. Fonction pure et unique — aucun calcul de tarif
 * n'est effectué ailleurs dans l'application.
 */
export function computePricing({
  nightlyRate,
  nights,
  guests,
  selectedExtras,
}: PricingInput): PriceBreakdown {
  const subtotal = nightlyRate * nights;
  const extrasTotal = selectedExtras.reduce(
    (sum, extra) => sum + extraCost(extra, { nights, guests }),
    0,
  );

  return {
    nights,
    subtotal,
    extrasTotal,
    total: subtotal + extrasTotal,
    currency: 'EUR',
  };
}
