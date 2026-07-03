import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('concatène les classes conditionnelles en ignorant les valeurs falsy', () => {
    expect(cn('a', false, 'c', undefined, null)).toBe('a c');
  });

  it('résout les conflits d’utilitaires Tailwind (le dernier gagne)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
