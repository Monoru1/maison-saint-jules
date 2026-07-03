import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { authService, type AuthUser } from '@/services/auth.service';

import {
  AuthContext,
  type AuthContextValue,
  type AuthStatus,
} from './auth-context';

/**
 * Fournit l'état d'authentification à l'arbre applicatif.
 * Restaure la session existante au montage (le cas échéant).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let active = true;

    void authService
      .getCurrentUser()
      .then((current) => {
        if (!active) return;
        setUser(current);
        setStatus(current ? 'authenticated' : 'unauthenticated');
      })
      .catch(() => {
        if (!active) return;
        setUser(null);
        setStatus('unauthenticated');
      });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const current = await authService.login(email, password);
    setUser(current);
    setStatus('authenticated');
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, login, logout }),
    [user, status, login, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
