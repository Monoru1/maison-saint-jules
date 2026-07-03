import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Reveal } from './Reveal';

describe('Reveal', () => {
  it('rend son contenu et reste visible sans IntersectionObserver', () => {
    // jsdom ne fournit pas IntersectionObserver : le repli doit garder
    // le contenu visible (progressive enhancement).
    render(
      <Reveal>
        <p>Contenu révélé</p>
      </Reveal>,
    );

    const paragraph = screen.getByText('Contenu révélé');
    expect(paragraph).toBeInTheDocument();

    const wrapper = paragraph.parentElement;
    expect(wrapper).toHaveAttribute('data-reveal');
    expect(wrapper).toHaveClass('is-visible');
  });
});
