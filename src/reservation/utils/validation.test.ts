import { describe, expect, it } from 'vitest';

import type { CustomerInfo, StayDetails } from '@/reservation/types';

import { parseStayState, validateCustomer, validateStay } from './validation';

const stay = (over: Partial<StayDetails> = {}): StayDetails => ({
  arrival: '2026-07-04',
  departure: '2026-07-06',
  adults: 2,
  children: 0,
  ...over,
});

const customer = (over: Partial<CustomerInfo> = {}): CustomerInfo => ({
  firstName: 'Camille',
  lastName: 'Durand',
  email: 'camille@example.com',
  phone: '+33 6 12 34 56 78',
  specialRequest: '',
  consent: true,
  ...over,
});

describe('validateStay', () => {
  it('valide un séjour correct et calcule les nuits', () => {
    const result = validateStay(stay());
    expect(result.valid).toBe(true);
    expect(result.nights).toBe(2);
  });

  it('rejette des dates inversées ou manquantes', () => {
    expect(validateStay(stay({ departure: '2026-07-03' })).valid).toBe(false);
    expect(validateStay(stay({ arrival: '' })).valid).toBe(false);
  });

  it('exige au moins un adulte', () => {
    const result = validateStay(stay({ adults: 0 }));
    expect(result.valid).toBe(false);
    expect(result.errors.guests).toBeDefined();
  });
});

describe('validateCustomer', () => {
  it('valide un client complet', () => {
    expect(validateCustomer(customer()).valid).toBe(true);
  });

  it('rejette un e-mail invalide', () => {
    const result = validateCustomer(customer({ email: 'invalide' }));
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it('exige le consentement', () => {
    const result = validateCustomer(customer({ consent: false }));
    expect(result.valid).toBe(false);
    expect(result.errors.consent).toBeDefined();
  });
});

describe('parseStayState', () => {
  it('accepte un état valide et rejette le reste', () => {
    expect(parseStayState(stay())).not.toBeNull();
    expect(parseStayState(null)).toBeNull();
    expect(parseStayState({ arrival: '2026-07-04' })).toBeNull();
  });
});
