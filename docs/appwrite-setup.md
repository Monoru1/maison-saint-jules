# Appwrite setup

Le schéma Appwrite doit être créé avec un script local et une clé serveur stockée hors Git.

Fichier local attendu : `.env.appwrite.local`.

Variables :

```bash
APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=maison-saint-jules
APPWRITE_DATABASE_ID=maison_saint_jules_db
APPWRITE_API_KEY=...
```

Commande :

```bash
npm run appwrite:setup
```

Ne jamais committer `.env.appwrite.local`.
