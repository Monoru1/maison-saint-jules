import { describe, expect, it } from 'vitest';

import { getSuiteBySlug, suiteSlugs, suites } from './suites';

describe('données suites', () => {
  it('expose des slugs uniques et non vides', () => {
    const slugs = suites.map((suite) => suite.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => slug.length > 0)).toBe(true);
  });

  it('garantit des champs cohérents pour chaque suite', () => {
    for (const suite of suites) {
      expect(suite.priceFrom).toBeGreaterThan(0);
      expect(suite.guests).toBeGreaterThan(0);
      expect(suite.area).toBeGreaterThan(0);
      expect(suite.cover.category).toBe('suites');
      expect(suite.gallery.length).toBeGreaterThan(0);
    }
  });

  it('résout une suite par slug, ou undefined', () => {
    expect(getSuiteBySlug('suite-jardin')?.name).toBe('Suite Jardin');
    expect(getSuiteBySlug('inconnue')).toBeUndefined();
    expect(suiteSlugs).toContain('appartement-delacroix');
  });
});
