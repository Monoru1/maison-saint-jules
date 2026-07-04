import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ReservationFunnel } from './ReservationFunnel';

function renderFunnel() {
  return render(
    <MemoryRouter>
      <ReservationFunnel />
    </MemoryRouter>,
  );
}

const clickContinue = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: 'Continuer' }));
};

describe('ReservationFunnel', () => {
  it('bloque la progression tant que le séjour est invalide', async () => {
    const user = userEvent.setup();
    renderFunnel();

    expect(
      screen.getByRole('heading', { name: 'Votre séjour' }),
    ).toBeInTheDocument();

    await clickContinue(user);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    // toujours à l'étape 1
    expect(
      screen.getByRole('heading', { name: 'Votre séjour' }),
    ).toBeInTheDocument();
  });

  it('parcourt le tunnel jusqu’à une demande référencée', async () => {
    const user = userEvent.setup();
    renderFunnel();

    // Étape 1 — séjour (2 nuits)
    fireEvent.change(screen.getByLabelText('Arrivée'), {
      target: { value: '2026-07-04' },
    });
    fireEvent.change(screen.getByLabelText('Départ'), {
      target: { value: '2026-07-06' },
    });
    await clickContinue(user);

    // Étape 2 — suite
    expect(
      screen.getByRole('heading', { name: 'Votre suite' }),
    ).toBeInTheDocument();
    await clickContinue(user); // sans sélection -> erreur
    expect(screen.getByRole('alert')).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: 'Choisir' })[0]!);
    await clickContinue(user);

    // Étape 3 — options
    expect(
      screen.getByRole('heading', { name: 'Vos options' }),
    ).toBeInTheDocument();
    await user.click(screen.getAllByRole('checkbox')[0]!);
    await clickContinue(user);

    // Étape 4 — informations
    expect(
      screen.getByRole('heading', { name: 'Vos informations' }),
    ).toBeInTheDocument();
    await user.type(screen.getByLabelText('Prénom'), 'Camille');
    await user.type(screen.getByLabelText('Nom'), 'Durand');
    await user.type(screen.getByLabelText('E-mail'), 'camille@example.com');
    await user.type(screen.getByLabelText('Téléphone'), '+33612345678');
    await user.click(screen.getByRole('checkbox'));
    await clickContinue(user);

    // Étape 5 — confirmation
    expect(
      screen.getByRole('heading', { name: 'Confirmation' }),
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole('button', { name: /Envoyer ma demande/ }),
    );

    expect(
      await screen.findByText(/Votre demande est prête/),
    ).toBeInTheDocument();
    expect(await screen.findByText(/^MSJ-/)).toBeInTheDocument();
  });
});
