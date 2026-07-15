import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@/config/routes';
import { RootLayout } from '@/layouts/RootLayout';
import { WorldHome } from '@/pages/world/WorldHome';
import { WorldChapterPage } from '@/pages/world/WorldChapterPage';
import { NotFound } from '@/pages/NotFound';
import { Reservation } from '@/pages/Reservation';
import { SuiteDetail } from '@/pages/suites/SuiteDetail';
import { SuitesList } from '@/pages/suites/SuitesList';

/**
 * Arbre de routes unique, partagé par le client (createBrowserRouter) et par le
 * pré-rendu statique (createStaticHandler).
 *
 * Les routes publiques sont chargées en amont (rendu statique, SEO/LCP).
 * Les routes d'administration sont chargées en `lazy` : leur code — et Appwrite —
 * sont exclus du bundle public et du pré-rendu.
 */
export const routes: RouteObject[] = [
  {
    path: ROUTES.home,
    element: <RootLayout />,
    children: [
      { index: true, element: <WorldHome /> },
      {
        path: 'maison',
        lazy: async () => {
          const { MaisonPage } = await import('@/pages/world/MaisonPage');
          return { Component: MaisonPage };
        },
      },
      { path: 'bains', element: <WorldChapterPage chapter="bains" /> },
      { path: 'cabinet', element: <WorldChapterPage chapter="cabinet" /> },
      { path: 'jardin', element: <WorldChapterPage chapter="jardin" /> },
      { path: 'matin', element: <WorldChapterPage chapter="matin" /> },
      { path: 'nuit', element: <WorldChapterPage chapter="nuit" /> },
      {
        path: 'experiences',
        element: <WorldChapterPage chapter="experiences" />,
      },
      { path: 'journal', element: <WorldChapterPage chapter="journal" /> },
      { path: ROUTES.reservation.slice(1), element: <Reservation /> },
      {
        path: 'suites',
        children: [
          { index: true, element: <SuitesList /> },
          { path: ':slug', element: <SuiteDetail /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: ROUTES.admin.root,
    lazy: async () => {
      const { AdminProviders } = await import('@/pages/admin/AdminProviders');
      return { Component: AdminProviders };
    },
    children: [
      {
        // /admin/connexion
        path: 'connexion',
        lazy: async () => {
          const { Login } = await import('@/pages/admin/Login');
          return { Component: Login };
        },
      },
      {
        lazy: async () => {
          const { ProtectedRoute } =
            await import('@/components/ProtectedRoute');
          return { Component: ProtectedRoute };
        },
        children: [
          {
            lazy: async () => {
              const { AdminLayout } = await import('@/layouts/AdminLayout');
              return { Component: AdminLayout };
            },
            children: [
              {
                index: true,
                lazy: async () => {
                  const { Dashboard } = await import('@/pages/admin/Dashboard');
                  return { Component: Dashboard };
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
