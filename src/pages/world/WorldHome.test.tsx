import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { WorldHome } from './WorldHome';

describe('WorldHome', () => {
  it('met en scène les huit pièces comme un parcours continu', () => {
    render(
      <MemoryRouter>
        <WorldHome />
      </MemoryRouter>,
    );

    expect(screen.getByText('Il pleut encore un peu.')).toBeInTheDocument();
    expect(screen.getByText('L’eau redessine les murs.')).toBeInTheDocument();
    expect(
      screen.getByText('La lumière choisit où rester.'),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Franchir cette pièce')).toHaveLength(8);
    expect(
      screen.getByLabelText('Position dans la Maison'),
    ).toBeInTheDocument();
  });
});
