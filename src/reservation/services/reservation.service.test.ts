import { describe, expect, it } from 'vitest';

import type { BookingDraft } from '@/reservation/types';

import { createBookingRequest } from './reservation.service';

const draft: BookingDraft = {
  stay: {
    arrival: '2026-07-04',
    departure: '2026-07-06',
    adults: 2,
    children: 0,
  },
  suiteSlug: 'suite-jardin',
  selectedExtraIds: ['champagne'],
  customer: {
    firstName: 'Camille',
    lastName: 'Durand',
    email: 'camille@example.com',
    phone: '+33 6 12 34 56 78',
    specialRequest: '',
    consent: true,
  },
  pricing: {
    nights: 2,
    subtotal: 2400,
    extrasTotal: 120,
    total: 2520,
    currency: 'EUR',
  },
};

describe('createBookingRequest', () => {
  it('produit une demande prête, référencée, sans altérer le brouillon', async () => {
    const result = await createBookingRequest(draft);
    expect(result.status).toBe('ready');
    expect(result.reference).toMatch(/^MSJ-/);
    expect(result.draft).toEqual(draft);
    expect(() => new Date(result.submittedAt).toISOString()).not.toThrow();
  });
});
