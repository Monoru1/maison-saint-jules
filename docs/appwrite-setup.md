# Configuration Appwrite

Procédure de provisionnement de la base Appwrite de **Maison Saint-Jules**.
Le script `scripts/setup-appwrite.mjs` crée la base, les collections, les
attributs et les index de façon **idempotente** : relancé, il ne recrée rien et
journalise `exists`.

## 1. Prérequis

- Un projet Appwrite Cloud (`maison-saint-jules`) sur `https://fra.cloud.appwrite.io/v1`.
- Une **clé API serveur** (console Appwrite → _Overview → Integrations → API Keys_)
  avec les scopes `databases.read` et `databases.write`.

## 2. Variables d'environnement (jamais commitées)

Copiez le modèle puis renseignez la clé :

```bash
cp .env.appwrite.local.example .env.appwrite.local
```

```dotenv
APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=maison-saint-jules
APPWRITE_DATABASE_ID=maison_saint_jules_db
APPWRITE_API_KEY=standard_xxx…            # secret — jamais dans Git
```

> **Sécurité.** `.env.appwrite.local` est ignoré par Git (`.env.*` + `*.local`).
> La clé serveur n'est lue **que** par ce script. Le frontend n'utilise que les
> variables publiques `VITE_APPWRITE_*` (endpoint + project id), jamais la clé.
> Une clé exposée (capture, historique de chat, log) doit être **révoquée et
> régénérée** immédiatement dans la console Appwrite.

## 3. Exécution

```bash
npm run appwrite:setup
```

Le script :

1. charge `.env.appwrite.local` et valide les variables ;
2. crée la base `maison_saint_jules_db` ;
3. pour chaque collection : crée la collection (avec ses permissions), ses
   attributs, **attend** qu'ils soient `available`, puis crée les index ;
4. journalise chaque élément (`created` / `exists`) et un récapitulatif final.

## 4. Modèle de données

| Collection            | Accès                                     | Rôle                         |
| --------------------- | ----------------------------------------- | ---------------------------- |
| `booking_requests`    | création publique, lecture/écriture admin | demandes de séjour du tunnel |
| `contact_messages`    | création publique, lecture/écriture admin | messages des formulaires     |
| `suites`              | lecture publique, écriture admin          | catalogue des suites         |
| `extras`              | lecture publique, écriture admin          | options du séjour            |
| `gallery_items`       | lecture publique, écriture admin          | galerie                      |
| `offers`              | lecture publique, écriture admin          | offres                       |
| `site_settings`       | lecture publique, écriture admin          | réglages du site             |
| `availability_blocks` | lecture publique, écriture admin          | périodes bloquées            |

Les permissions traduisent la règle produit : le public **soumet** des demandes
et **consulte** le contenu éditorial ; seul l'administrateur (session Appwrite)
modifie les données.

## 5. Idempotence & maintenance

- Relancer le script est sans risque : les éléments existants sont préservés.
- Ajouter un attribut/index : compléter le `schema` du script puis relancer.
- Un attribut en échec (`failed`) interrompt le script avec un message explicite.

## 6. Dépannage

| Symptôme                                   | Cause probable                     | Action                               |
| ------------------------------------------ | ---------------------------------- | ------------------------------------ |
| `Variable manquante`                       | `.env.appwrite.local` incomplet    | renseigner la variable               |
| `401 / 403`                                | clé API sans scope `databases.*`   | recréer une clé avec les bons scopes |
| `Délai dépassé en attendant les attributs` | provisionnement lent côté Appwrite | relancer le script (idempotent)      |
