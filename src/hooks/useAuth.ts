import { useContext } from 'react';

import { AuthContext, type AuthContextValue } from '@/context/auth-context';

/**
 * Accès à l'état et aux actions d'authentification.
 * Lève une erreur explicite si utilisé hors d'un `<AuthProvider>`.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error(
      'useAuth doit être utilisé à l’intérieur d’un <AuthProvider>.',
    );
  }
  return context;
}
