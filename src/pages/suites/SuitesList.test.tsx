import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { SuitesList } from './SuitesList';

function renderList() {
  return render(
    <MemoryRouter>
      <SuitesList />
    </MemoryRouter>,
  );
}

describe('SuitesList', () => {
  it('affiche toutes les suites par défaut', () => {
    renderList();
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('filtre par catégorie puis réinitialise', async () => {
    const user = userEvent.setup();
    renderList();

    await user.click(screen.getByRole('button', { name: 'Appartement' }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(
      screen.queryByRole('heading', { name: /Chambre Signature/i }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Toutes' }));
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('filtre par capacité et gère l’absence de résultat', async () => {
    const user = userEvent.setup();
    renderList();

    await user.selectOptions(screen.getByRole('combobox'), '4');
    expect(screen.getAllByRole('article')).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: 'Chambre' }));
    expect(screen.getByText(/Aucune suite/i)).toBeInTheDocument();
  });
});
