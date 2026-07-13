import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { WorldChapterPage } from './WorldChapterPage';

describe('WorldChapterPage', () => {
  it('compose chaque chapitre en plusieurs plans éditoriaux', () => {
    render(
      <MemoryRouter>
        <WorldChapterPage chapter="maison" />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('img')).toHaveLength(4);
    expect(screen.getByText('La pièce en trois temps')).toBeInTheDocument();
    expect(screen.getByText('18 h 43')).toBeInTheDocument();
    expect(screen.getByText('2 700 K')).toBeInTheDocument();
  });

  it('donne aux Bains une respiration et une ligne d’eau propres', () => {
    render(
      <MemoryRouter>
        <WorldChapterPage chapter="bains" />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText('La ligne d’eau')).toBeInTheDocument();
    expect(
      screen.getByText('Le monde sonore s’arrête ici.'),
    ).toBeInTheDocument();
    expect(screen.getByText('34 °C')).toBeInTheDocument();
  });
});
