import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MaisonPage } from './MaisonPage';
import { WorldChapterPage } from './WorldChapterPage';

describe('WorldChapterPage', () => {
  it('compose chaque chapitre en plusieurs plans éditoriaux', () => {
    render(
      <MemoryRouter>
        <MaisonPage />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('img')).toHaveLength(5);
    expect(screen.getByText('La pièce en trois temps')).toBeInTheDocument();
    expect(screen.getByText('18 h 43')).toBeInTheDocument();
    expect(screen.getByText('2 700 K')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'La Maison n’a jamais été remise à neuf.',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('1878')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Conserver la durée. Remplacer le bruit.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Elle existe avant votre arrivée et après votre départ.',
      ),
    ).toBeInTheDocument();
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
