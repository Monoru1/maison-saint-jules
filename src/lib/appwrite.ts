import { Account, Client, Databases, Storage } from 'appwrite';

import { env } from '@/config/env';

/**
 * Client Appwrite unique, partagé par toute l'application.
 *
 * L'endpoint et l'identifiant de projet proviennent de la configuration
 * d'environnement validée (`@/config/env`) et ne sont jamais codés en dur :
 * cela permet de cibler différents environnements (dev, staging, prod) sans
 * modifier le code source.
 */
const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId);

/** Service d'authentification — réservé à l'administration. */
const account = new Account(client);

/** Accès à la base de données Appwrite. */
const databases = new Databases(client);

/** Accès au stockage de fichiers Appwrite (médias, documents). */
const storage = new Storage(client);

/**
 * Vérifie la connectivité avec Appwrite Cloud.
 *
 * @returns `true` si le serveur répond, `false` sinon.
 * Ne lève jamais : l'erreur éventuelle est journalisée et transformée en
 * booléen, afin que l'appelant décide de la stratégie (bannière, retry…).
 */
async function pingAppwrite(): Promise<boolean> {
  try {
    await client.ping();
    if (env.isDevelopment) {
      console.info('[appwrite] Connexion établie ✓');
    }
    return true;
  } catch (error) {
    console.error('[appwrite] Échec de la connexion :', error);
    return false;
  }
}

/**
 * Vérification immédiate de la connexion au démarrage, uniquement en
 * développement. En production, la connectivité est validée à la demande
 * (au premier appel réel) pour éviter tout effet de bord au chargement.
 */
if (env.isDevelopment) {
  void pingAppwrite();
}

export { account, client, databases, storage, pingAppwrite };
