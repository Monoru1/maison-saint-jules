import { act, fireEvent, render, screen } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CinematicPageTransition } from './CinematicPageTransition';

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  vi.useRealTimers();
  window.matchMedia = originalMatchMedia;
  delete document.body.dataset.cinematicTransition;
});

function Subject() {
  return (
    <>
      <CinematicPageTransition />
      <Routes>
        <Route path="/" element={<Link to="/bains">Les Bains</Link>} />
        <Route path="/bains" element={<h1>La pièce d’eau</h1>} />
      </Routes>
    </>
  );
}

describe('CinematicPageTransition', () => {
  it('referme la nappe avant d’ouvrir la route des Bains', async () => {
    vi.useFakeTimers();
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    const { container } = render(
      <MemoryRouter>
        <Subject />
      </MemoryRouter>,
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('link', { name: 'Les Bains' }));
      await Promise.resolve();
    });
    await vi.waitFor(() => {
      expect(container.querySelector('.water-transition')).toHaveAttribute(
        'data-phase',
        'closing',
      );
    });
    expect(screen.queryByText('La pièce d’eau')).not.toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1320);
      await Promise.resolve();
    });
    expect(screen.getByText('La pièce d’eau')).toBeInTheDocument();
    expect(container.querySelector('.water-transition')).toHaveAttribute(
      'data-phase',
      'opening',
    );

    await act(async () => {
      vi.advanceTimersByTime(1680);
      await Promise.resolve();
    });
    expect(container.querySelector('.water-transition')).toHaveAttribute(
      'data-phase',
      'idle',
    );
  });

  it('n’intercepte pas la navigation quand le mouvement est réduit', async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    const { container } = render(
      <MemoryRouter>
        <Subject />
      </MemoryRouter>,
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('link', { name: 'Les Bains' }));
      await Promise.resolve();
    });
    expect(container.querySelector('.water-transition')).toHaveAttribute(
      'data-phase',
      'idle',
    );
    expect(screen.getByText('La pièce d’eau')).toBeInTheDocument();
  });
});
