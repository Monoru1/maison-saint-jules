/**
 * Types du domaine « réservation ».
 * Le tunnel produit une demande de réservation typée, prête à être persistée
 * (aucune logique Appwrite ici).
 */

/** Mode de facturation d'une option. */
export type ExtraBilling = 'per-stay' | 'per-night' | 'per-person';

export interface Extra {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  /** Prix unitaire en euros (interprété selon `billing`). */
  readonly price: number;
  readonly billing: ExtraBilling;
}

/** Étape 1 — détails du séjour. */
export interface StayDetails {
  /** Date ISO `YYYY-MM-DD` (vide tant que non renseignée). */
  readonly arrival: string;
  readonly departure: string;
  readonly adults: number;
  readonly children: number;
}

/** Étape 4 — informations client. */
export interface CustomerInfo {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly specialRequest: string;
  readonly consent: boolean;
}

/** Résultat du calcul de prix (source unique). */
export interface PriceBreakdown {
  readonly nights: number;
  readonly subtotal: number;
  readonly extrasTotal: number;
  readonly total: number;
  readonly currency: 'EUR';
}

/** Demande de réservation complète, prête à être soumise. */
export interface BookingDraft {
  readonly stay: StayDetails;
  readonly suiteSlug: string;
  readonly selectedExtraIds: readonly string[];
  readonly customer: CustomerInfo;
  readonly pricing: PriceBreakdown;
}

export interface BookingRequestResult {
  readonly reference: string;
  readonly status: 'ready';
  readonly submittedAt: string;
  readonly draft: BookingDraft;
}
