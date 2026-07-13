import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WorldHome } from './WorldHome';

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  vi.restoreAllMocks();
});

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
    expect(
      screen.getByRole('form', { name: 'Vérifier les disponibilités' }),
    ).toBeInTheDocument();
  });

  it('ne planifie aucun calcul caméra quand le mouvement est réduit', async () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    const requestAnimationFrame = vi.spyOn(window, 'requestAnimationFrame');

    render(
      <MemoryRouter>
        <WorldHome />
      </MemoryRouter>,
    );

    await act(() => window.dispatchEvent(new Event('scroll')));
    expect(requestAnimationFrame).not.toHaveBeenCalled();
    const film = document.querySelector<HTMLElement>('.world-film');
    expect(film?.style.getPropertyValue('--house-progress')).toBe('');
  });
});
