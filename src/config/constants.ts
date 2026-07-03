/**
 * Constantes applicatives globales.
 *
 * Aucune valeur secrète ici : uniquement des constantes non sensibles,
 * partagées et stables. Les secrets et la configuration d'environnement
 * vivent dans `env.ts`.
 */

export const APP = {
  name: 'Maison Saint-Jules',
  shortName: 'MSJ',
  description: 'Plateforme hôtelière premium — réservation et administration.',
  locale: 'fr-FR',
  defaultCurrency: 'EUR',
  defaultTimeZone: 'Europe/Paris',
} as const;

/**
 * Clés de stockage local (préfixées pour éviter toute collision).
 * L'authentification passe exclusivement par les cookies de session Appwrite ;
 * ces clés ne servent qu'à des préférences UI non sensibles.
 */
export const STORAGE_KEYS = {
  theme: 'msj:theme',
  locale: 'msj:locale',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
