import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom';

import { ROUTES } from '@/config/routes';
import { pageMeta, suiteMeta } from '@/config/seo';
import { suites } from '@/hotel/data';
import { worldChapters } from '@/pages/world/world-data';
import { routes } from '@/routes';

export interface PrerenderRoute {
  readonly path: string;
  readonly title: string;
  readonly description: string;
}

/** Routes publiques à figer en HTML statique (SSG). */
export const prerenderRoutes: readonly PrerenderRoute[] = [
  { path: ROUTES.home, ...pageMeta.home },
  { path: ROUTES.reservation, ...pageMeta.reservation },
  { path: ROUTES.suites, ...pageMeta.suites },
  ...suites.map((suite) => ({
    path: ROUTES.suiteDetail(suite.slug),
    ...suiteMeta(suite),
  })),
  ...Object.entries(worldChapters).map(([path, chapter]) => ({
    path: `/${path}`,
    title: `${chapter.title} — Maison Saint-Jules`,
    description: chapter.line,
  })),
];

/** Rend une route en chaîne HTML pour le pré-rendu statique. */
export async function render(pathname: string): Promise<string> {
  const handler = createStaticHandler(routes);
  const context = await handler.query(
    new Request(`http://localhost${pathname}`),
  );

  if (context instanceof Response) {
    throw new Error(
      `Redirection inattendue lors du pré-rendu de « ${pathname} ».`,
    );
  }

  const staticRouter = createStaticRouter(handler.dataRoutes, context);

  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={staticRouter} context={context} />
    </StrictMode>,
  );
}
