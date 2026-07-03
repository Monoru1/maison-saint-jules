import { describe, expect, it } from 'vitest';

import { formatPrice } from './format';

describe('formatPrice', () => {
  it('formate un montant en euros sans décimales', () => {
    const result = formatPrice(690);
    expect(result).toContain('€');
    expect(result).toContain('690');
    expect(result).not.toContain(',00');
  });

  it('insère un séparateur de milliers', () => {
    // « 1 200 € » — l'espace séparateur peut être insécable selon l'ICU.
    expect(formatPrice(1200)).toMatch(/1\s?200/u);
  });
});
