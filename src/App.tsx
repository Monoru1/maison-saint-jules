import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthProvider';
import { router } from '@/router';

/**
 * Point d'entrée applicatif : fournit le contexte d'authentification puis
 * monte le routeur.
 */
export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
