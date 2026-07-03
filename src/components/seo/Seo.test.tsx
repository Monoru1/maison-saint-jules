import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Seo } from './Seo';

describe('Seo', () => {
  it('met à jour le titre du document et la meta description', () => {
    render(<Seo title="Titre de test" description="Description de test" />);

    expect(document.title).toBe('Titre de test');
    const description = document.head.querySelector('meta[name="description"]');
    expect(description?.getAttribute('content')).toBe('Description de test');
  });
});
