# Maison Saint-Jules

Plateforme hôtelière **premium** — moteur de réservation côté client et espace
d'administration sécurisé. Ce dépôt contient l'application web (React + Vite +
TypeScript) et son intégration à Appwrite Cloud.

> **État actuel :** base technique. Aucune page hôtel n'est encore développée —
> l'objectif de cette première itération est de fournir un socle propre,
> typé strictement et prêt pour la production.

---

## Sommaire

- [Stack technique](#stack-technique)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Démarrage rapide](#démarrage-rapide)
- [Variables d'environnement](#variables-denvironnement)
- [Scripts](#scripts)
- [Qualité & conventions](#qualité--conventions)
- [Appwrite](#appwrite)
- [Prochaines étapes](#prochaines-étapes)
- [Licence](#licence)

---

## Stack technique

| Domaine         | Technologie                          |
| --------------- | ------------------------------------ |
| Framework UI    | React 19                             |
| Build / dev     | Vite 8                               |
| Langage         | TypeScript 6 (mode strict)           |
| Styles          | TailwindCSS 4 (CSS-first)            |
| Backend         | Appwrite Cloud                       |
| Base de données | Appwrite Databases                   |
| Stockage        | Appwrite Storage                     |
| Auth            | Appwrite Auth (administration seule) |
| Validation      | Zod                                  |

---

## Architecture

```text
src/
├── admin/         # Fonctionnalités d'administration (back-office)
├── animations/    # Variantes et primitives d'animation réutilisables
├── assets/        # Ressources statiques importées par le bundler
├── components/    # Composants UI réutilisables et sans état métier
├── config/        # Configuration typée (env validé, constantes)
├── context/       # Providers React (thème, session, i18n…)
├── hooks/         # Hooks React réutilisables
├── hotel/         # Domaine « hôtel » (chambres, services, contenus)
├── layouts/       # Gabarits de mise en page
├── lib/           # Intégrations techniques (client Appwrite…)
├── pages/         # Pages routées
├── reservation/   # Domaine « réservation » (tunnel, disponibilités…)
├── services/      # Services métier au-dessus de `lib/`
├── styles/        # Styles globaux et design tokens
├── types/         # Types transverses partagés
└── utils/         # Fonctions utilitaires pures
```

Principes : **SOLID**, composants réutilisables, typage strict, point d'accès
unique aux variables d'environnement, aucune valeur secrète en dur.

---

## Prérequis

- **Node.js** ≥ 20.19 (voir `.nvmrc` — `nvm use`)
- **npm** ≥ 10
- Un projet **Appwrite Cloud** existant

---

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env   # puis vérifier/ajuster les valeurs

# 3. Lancer le serveur de développement
npm run dev
```

L'écran de démarrage affiche l'état de la connexion à Appwrite (vérifiée
automatiquement via `client.ping()` en développement).

---

## Variables d'environnement

Toutes les variables client sont préfixées `VITE_` et **validées au démarrage**
via Zod (`src/config/env.ts`). Une variable manquante ou invalide fait échouer
l'application immédiatement avec un message explicite.

| Variable                     | Description                    | Exemple                            |
| ---------------------------- | ------------------------------ | ---------------------------------- |
| `VITE_APPWRITE_ENDPOINT`     | Endpoint de l'API Appwrite     | `https://fra.cloud.appwrite.io/v1` |
| `VITE_APPWRITE_PROJECT_ID`   | Identifiant du projet Appwrite | `maison-saint-jules`               |
| `VITE_APPWRITE_PROJECT_NAME` | Nom d'affichage du projet      | `Maison Saint-Jules`               |

> ⚠️ Le fichier `.env` n'est **jamais** committé. Seul `.env.example` l'est.

---

## Scripts

| Script                 | Rôle                                            |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Serveur de développement Vite                   |
| `npm run build`        | Vérification des types puis build de production |
| `npm run preview`      | Prévisualise le build de production             |
| `npm run typecheck`    | Vérification TypeScript stricte (sans émission) |
| `npm run lint`         | Analyse ESLint (type-aware)                     |
| `npm run lint:fix`     | ESLint avec correction automatique              |
| `npm run format`       | Formatage Prettier                              |
| `npm run format:check` | Vérifie le formatage sans modifier              |

---

## Qualité & conventions

- **ESLint 9** (flat config) — linting **basé sur les types**, règles React
  Hooks, accessibilité (`jsx-a11y`) et React Refresh.
- **Prettier 3** — formatage unifié, tri automatique des classes Tailwind.
- **Husky + lint-staged** — à chaque commit, ESLint + Prettier ne s'exécutent
  que sur les fichiers indexés.
- **Commits conventionnels** — validés par `commitlint`
  (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`…).
- **Alias** — `@/*` pointe vers `src/*` (défini une seule fois dans `tsconfig`).
- **EditorConfig** — cohérence de mise en forme entre machines et éditeurs.

> Alternative de performance : le template Vite propose désormais `oxlint`
> (Rust). Il a été volontairement retiré pour n'avoir **qu'un seul linter**
> (ESLint) et éviter toute duplication de règles. Il peut être réintroduit
> ultérieurement si la vitesse de lint devient un enjeu.

---

## Appwrite

Le client Appwrite est centralisé dans `src/lib/appwrite.ts` et expose :

- `client` — client configuré depuis l'environnement validé ;
- `account` — authentification (**réservée à l'administration**) ;
- `databases` — accès aux collections ;
- `storage` — accès aux fichiers ;
- `pingAppwrite()` — vérification de connectivité (non bloquante).

```ts
import { account, databases, storage } from '@/lib/appwrite';
```

---

## Prochaines étapes

Ces éléments seront ajoutés lors des itérations suivantes, une fois le besoin
réel confirmé (pas de dépendance installée « au cas où ») :

- Routeur applicatif et premières pages hôtel ;
- Couche de services métier (chambres, disponibilités, réservations) ;
- Espace d'administration authentifié ;
- Gestion des données serveur (cache, revalidation) ;
- Tests (unitaires + e2e) et pipeline CI.

---

## Licence

Projet **propriétaire** — © Maison Saint-Jules. Tous droits réservés.
Aucune reproduction ou distribution sans autorisation écrite.
