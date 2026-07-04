import { z } from 'zod';

import type { CustomerInfo, StayDetails } from '@/reservation/types';

import { computeNights } from './nights';

/* -------------------------------------------------------------------------- */
/*  Séjour (dates + voyageurs)                                                 */
/* -------------------------------------------------------------------------- */

export interface StayValidation {
  readonly valid: boolean;
  readonly nights: number;
  readonly errors: { readonly stay?: string; readonly guests?: string };
}

export function validateStay(stay: StayDetails): StayValidation {
  const nights = computeNights(stay.arrival, stay.departure);
  const errors: { stay?: string; guests?: string } = {};

  if (!stay.arrival || !stay.departure) {
    errors.stay = 'Sélectionnez vos dates d’arrivée et de départ.';
  } else if (nights < 1) {
    errors.stay =
      'La date de départ doit suivre la date d’arrivée (une nuit minimum).';
  }
  if (stay.adults < 1) {
    errors.guests = 'Au moins un adulte est requis.';
  }

  return { valid: !errors.stay && !errors.guests, nights, errors };
}

/* -------------------------------------------------------------------------- */
/*  Client (Zod)                                                               */
/* -------------------------------------------------------------------------- */

export const customerSchema = z.object({
  firstName: z.string().trim().min(1, 'Prénom requis'),
  lastName: z.string().trim().min(1, 'Nom requis'),
  email: z.email('Adresse e-mail invalide'),
  phone: z.string().trim().min(6, 'Numéro de téléphone requis'),
  specialRequest: z.string().max(1000, 'Demande trop longue'),
  consent: z
    .boolean()
    .refine((value) => value, 'Vous devez accepter les conditions.'),
});

export type CustomerErrors = Partial<Record<keyof CustomerInfo, string>>;

export function validateCustomer(customer: CustomerInfo): {
  valid: boolean;
  errors: CustomerErrors;
} {
  const result = customerSchema.safeParse(customer);
  if (result.success) return { valid: true, errors: {} };

  const errors: CustomerErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !(key in errors)) {
      errors[key as keyof CustomerInfo] = issue.message;
    }
  }
  return { valid: false, errors };
}

/* -------------------------------------------------------------------------- */
/*  Pré-remplissage depuis l'état de navigation (BookingBar)                   */
/* -------------------------------------------------------------------------- */

const stayStateSchema = z.object({
  arrival: z.string(),
  departure: z.string(),
  adults: z.number().int().min(1).max(6),
  children: z.number().int().min(0).max(4),
});

/** Valide l'état transmis par la barre de réservation, ou `null`. */
export function parseStayState(state: unknown): StayDetails | null {
  const result = stayStateSchema.safeParse(state);
  return result.success ? result.data : null;
}
