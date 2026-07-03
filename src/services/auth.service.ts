import { AppwriteException, type Models } from 'appwrite';

import { account } from '@/lib/appwrite';

/** Utilisateur authentifié Appwrite (administration). */
export type AuthUser = Models.User<Models.Preferences>;

/**
 * Service d'authentification — encapsule les appels Appwrite `account`.
 *
 * Cette couche ne gère aucun état React : elle expose uniquement des
 * opérations asynchrones. L'état de session vit dans le contexte React
 * (`AuthProvider`), ce qui respecte la séparation des responsabilités.
 *
 * L'authentification est réservée à l'administration.
 */
export const authService = {
  /** Ouvre une session e-mail / mot de passe et retourne l'utilisateur. */
  async login(email: string, password: string): Promise<AuthUser> {
    await account.createEmailPasswordSession(email, password);
    return account.get();
  },

  /** Ferme la session courante. */
  async logout(): Promise<void> {
    await account.deleteSession('current');
  },

  /**
   * Retourne l'utilisateur courant, ou `null` en l'absence de session.
   * Une réponse 401 (invité) est un cas nominal, pas une erreur.
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      return await account.get();
    } catch (error) {
      if (error instanceof AppwriteException && error.code === 401) {
        return null;
      }
      throw error;
    }
  },
} as const;
