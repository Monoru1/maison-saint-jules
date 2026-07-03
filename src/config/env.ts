import { z } from 'zod';

/**
 * Schéma de validation des variables d'environnement.
 *
 * Toutes les variables exposées au client DOIVENT être préfixées par `VITE_`
 * (contrainte Vite). La validation est exécutée une seule fois au démarrage :
 * si une variable est absente ou malformée, l'application échoue immédiatement
 * avec un message explicite (fail-fast) plutôt que de planter aléatoirement
 * plus tard à l'exécution.
 */
const environmentSchema = z.object({
  VITE_APPWRITE_ENDPOINT: z.url({
    message:
      'VITE_APPWRITE_ENDPOINT doit être une URL valide (ex: https://fra.cloud.appwrite.io/v1).',
  }),
  VITE_APPWRITE_PROJECT_ID: z
    .string()
    .min(1, 'VITE_APPWRITE_PROJECT_ID est requis.'),
  VITE_APPWRITE_PROJECT_NAME: z.string().min(1).default('Maison Saint-Jules'),
});

const parsed = environmentSchema.safeParse(import.meta.env);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `  • ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');

  throw new Error(
    `[env] Variables d'environnement invalides ou manquantes :\n${details}\n\n` +
      'Copiez `.env.example` vers `.env` et renseignez les valeurs manquantes.',
  );
}

const raw = parsed.data;

/**
 * Configuration applicative typée et immuable.
 * Point d'accès unique aux variables d'environnement dans tout le code.
 */
export const env = {
  appwrite: {
    endpoint: raw.VITE_APPWRITE_ENDPOINT,
    projectId: raw.VITE_APPWRITE_PROJECT_ID,
    projectName: raw.VITE_APPWRITE_PROJECT_NAME,
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

export type Env = typeof env;
