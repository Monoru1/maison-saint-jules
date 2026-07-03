import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@/config/routes';
import { RootLayout } from '@/layouts/RootLayout';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { Reservation } from '@/pages/Reservation';

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
      { index: true, element: <Home /> },
      { path: ROUTES.reservation.slice(1), element: <Reservation /> },
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
