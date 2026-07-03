import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { SuiteDetail } from './SuiteDetail';

function renderDetail(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/suites/${slug}`]}>
      <Routes>
        <Route path="/suites/:slug" element={<SuiteDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('SuiteDetail', () => {
  it('présente la suite correspondant au slug', () => {
    renderDetail('suite-jardin');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Suite Jardin',
    );
    expect(screen.getByText(/1\s?200/)).toBeInTheDocument();
    expect(screen.getByText('Caractéristiques')).toBeInTheDocument();
    expect(screen.getByText('Services inclus')).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /Réserver cette suite/i }).length,
    ).toBeGreaterThan(0);
  });

  it('affiche la page 404 pour un slug inconnu', () => {
    renderDetail('suite-inexistante');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /éclipsée/i,
    );
  });
});
