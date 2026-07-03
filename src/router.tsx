import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ROUTES } from '@/config/routes';
import { AdminLayout } from '@/layouts/AdminLayout';
import { RootLayout } from '@/layouts/RootLayout';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { Dashboard } from '@/pages/admin/Dashboard';
import { Login } from '@/pages/admin/Login';

/** Arbre de routes de l'application. */
export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: ROUTES.admin.login,
    element: <Login />,
  },
  {
    path: ROUTES.admin.root,
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [{ index: true, element: <Dashboard /> }],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
