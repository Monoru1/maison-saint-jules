import { describe, expect, it } from 'vitest';

import { computeNights } from './nights';

describe('computeNights', () => {
  it('compte les nuits entre deux dates valides', () => {
    expect(computeNights('2026-07-04', '2026-07-06')).toBe(2);
    expect(computeNights('2026-12-31', '2027-01-02')).toBe(2);
  });

  it('retourne 0 si le départ ne suit pas l’arrivée', () => {
    expect(computeNights('2026-07-06', '2026-07-04')).toBe(0);
    expect(computeNights('2026-07-04', '2026-07-04')).toBe(0);
  });

  it('retourne 0 pour des dates absentes ou invalides', () => {
    expect(computeNights('', '2026-07-06')).toBe(0);
    expect(computeNights('2026-07-04', '')).toBe(0);
    expect(computeNights('pas-une-date', '2026-07-06')).toBe(0);
  });
});
