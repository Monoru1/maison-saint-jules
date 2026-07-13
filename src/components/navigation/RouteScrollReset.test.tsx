import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RouteScrollReset } from './RouteScrollReset';

describe('RouteScrollReset', () => {
  const scrollTo = vi.fn();

  beforeEach(() => {
    scrollTo.mockReset();
    vi.stubGlobal('scrollTo', scrollTo);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('replace immédiatement chaque nouvelle route en haut de page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/maison']}>
        <RouteScrollReset />
        <Link to="/jardin">Entrer dans le jardin</Link>
        <Routes>
          <Route path="/maison" element={<p>La Maison</p>} />
          <Route path="/jardin" element={<p>Le Jardin</p>} />
        </Routes>
      </MemoryRouter>,
    );

    scrollTo.mockClear();
    await user.click(screen.getByRole('link', { name: /jardin/i }));

    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledWith({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    });
    expect(document.documentElement.style.scrollBehavior).toBe('');
  });
});
