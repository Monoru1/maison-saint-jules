import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Navbar } from './Navbar';

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar transparentAtTop />
    </MemoryRouter>,
  );
}

describe('Navbar', () => {
  it('ouvre puis ferme le menu mobile de façon accessible', async () => {
    const user = userEvent.setup();
    renderNavbar();

    const openButton = screen.getByRole('button', { name: 'Ouvrir le menu' });
    expect(openButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(openButton);

    expect(
      screen.getByRole('dialog', { name: 'Menu principal' }),
    ).toBeInTheDocument();
    expect(openButton).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
