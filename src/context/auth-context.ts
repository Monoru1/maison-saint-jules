import { createContext } from 'react';

import type { AuthUser } from '@/services/auth.service';

/** État d'authentification exposé par le contexte. */
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthContextValue {
  readonly user: AuthUser | null;
  readonly status: AuthStatus;
  readonly login: (email: string, password: string) => Promise<void>;
  readonly logout: () => Promise<void>;
}

/**
 * Contexte d'authentification. Défini dans un fichier dédié (sans composant)
 * pour préserver le bon fonctionnement du Fast Refresh.
 */
export const AuthContext = createContext<AuthContextValue | null>(null);
