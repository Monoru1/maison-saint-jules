import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Home } from './Home';

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

describe('Home', () => {
  it('affiche le titre principal du hero', () => {
    renderHome();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /élégance/i,
    );
  });

  it('rend les sections clés de la Maison', () => {
    renderHome();
    expect(
      screen.getByRole('heading', { name: /Suites/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /sérénité/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /esprit des lieux/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /comme un privilège/i }),
    ).toBeInTheDocument();
  });

  it('propose la barre de réservation et des appels à réserver', () => {
    renderHome();
    expect(
      screen.getByRole('button', { name: /disponibilités/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /Réserver un séjour/i }).length,
    ).toBeGreaterThan(0);
  });
});
