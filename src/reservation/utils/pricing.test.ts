import { describe, expect, it } from 'vitest';

import type { Extra } from '@/reservation/types';

import { computePricing, extraCost } from './pricing';

const perStay: Extra = {
  id: 'a',
  name: 'A',
  description: '',
  price: 100,
  billing: 'per-stay',
};
const perNight: Extra = {
  id: 'b',
  name: 'B',
  description: '',
  price: 50,
  billing: 'per-night',
};
const perPerson: Extra = {
  id: 'c',
  name: 'C',
  description: '',
  price: 40,
  billing: 'per-person',
};

describe('extraCost', () => {
  it('facture selon le mode', () => {
    expect(extraCost(perStay, { nights: 3, guests: 2 })).toBe(100);
    expect(extraCost(perNight, { nights: 3, guests: 2 })).toBe(150);
    expect(extraCost(perPerson, { nights: 3, guests: 2 })).toBe(80);
  });
});

describe('computePricing', () => {
  it('additionne la suite et les options', () => {
    const result = computePricing({
      nightlyRate: 690,
      nights: 2,
      guests: 2,
      selectedExtras: [perStay, perNight, perPerson],
    });
    expect(result.subtotal).toBe(1380);
    // 100 (séjour) + 100 (2 nuits × 50) + 80 (2 pers × 40)
    expect(result.extrasTotal).toBe(280);
    expect(result.total).toBe(1660);
    expect(result.nights).toBe(2);
    expect(result.currency).toBe('EUR');
  });

  it('gère l’absence de suite et d’options', () => {
    const result = computePricing({
      nightlyRate: 0,
      nights: 0,
      guests: 1,
      selectedExtras: [],
    });
    expect(result.total).toBe(0);
  });
});
