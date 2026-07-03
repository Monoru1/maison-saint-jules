# Maison Saint-Jules

Plateforme hôtelière **premium** — vitrine publique immersive et espace
d'administration sécurisé. Ce dépôt contient l'application web
(React + Vite + TypeScript, styles TailwindCSS) et son intégration à
Appwrite Cloud.

> **État actuel — Sprints 1 & 2 livrés :** page d'accueil immersive, système
> média typé (prêt pour les vraies photographies), et **expérience Suites**
> complète — liste `/suites` avec filtres et pages de détail `/suites/:slug`,
> le tout pré-rendu (SSG). Le moteur de réservation et le back-office CRUD
> arrivent aux sprints suivants.

---

## Sommaire

- [Stack technique](#stack-technique)
- [Direction artistique](#direction-artistique)
- [Architecture](#architecture)
- [Rendu statique (SSG)](#rendu-statique-ssg)
- [Accessibilité & SEO](#accessibilité--seo)
- [Tests](#tests)
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

| Domaine      | Technologie                                    |
| ------------ | ---------------------------------------------- |
| Framework UI | React 19                                       |
| Build / dev  | Vite 8                                         |
| Langage      | TypeScript 6 (mode strict)                     |
| Styles       | TailwindCSS 4 (CSS-first, `@theme`)            |
| Routage      | React Router 7 (routes de données)             |
| Rendu        | SPA + pré-rendu statique (SSG maison)          |
| Backend      | Appwrite Cloud (Auth **administration seule**) |
| Validation   | Zod                                            |
| Tests        | Vitest + Testing Library (jsdom)               |

---

## Direction artistique

Maison Saint-Jules n'est pas un palace ostentatoire, mais une **adresse
confidentielle**. Le luxe y est silencieux : calme, intimité, patrimoine.

**Palette** (exposée en tokens Tailwind dans `src/styles/globals.css`) :

| Rôle             | Hex       | Token       |
| ---------------- | --------- | ----------- |
| Noir             | `#0E0E0E` | `ink-900`   |
| Ivoire           | `#F3F0E8` | `ivory`     |
| Pierre           | `#CBBFA8` | `pierre`    |
| Laiton/champagne | `#B89A5B` | `brass-500` |
| Vert forêt       | `#1F2F24` | `foret-800` |

**Typographies** : Playfair Display (titres), Inter (texte).
**Motion** : révélations feutrées au défilement, jamais démonstratives, via le
composant [`Reveal`](src/components/ui/Reveal.tsx) (voir plus bas).

**Système média** : chaque visuel est décrit par un `HotelImage`
(`src`, `alt`, `category`, `width`/`height`, `focalPoint`). Tant que `src` vaut
`null`, un placeholder de marque s'affiche ; renseigner le chemin sous
`public/images/<category>/` publie la photographie réelle sans autre changement
de code. Le composant [`Media`](src/components/ui/Media.tsx) consomme ce contrat
(cadrage `focalPoint`, dimensions anti-CLS).

---

## Architecture

```text
src/
├── components/
│   ├── navigation/   # Navbar (menu mobile accessible) & Footer
│   ├── sections/     # Sections de la Home (Hero, Suites, Spa…)
│   ├── seo/          # Composant <Seo> (titre + métadonnées)
│   ├── suites/       # Domaine Suites (SuiteCard, SuiteFilters, SuiteGallery)
│   └── ui/           # Design System (Button, Media, Reveal, Container…)
├── config/           # Configuration typée (env validé, routes, SEO, constantes)
├── context/          # AuthProvider + contexte (scopé à l'administration)
├── hooks/            # Hooks réutilisables (useAuth…)
├── hotel/
│   ├── data/         # Contenu typé de la Maison (identité, suites, spa…)
│   └── types/        # Types du domaine hôtelier
├── layouts/          # RootLayout (public) & AdminLayout
├── lib/              # Intégrations techniques (client Appwrite)
├── pages/            # Pages routées (Home, Reservation, suites/, admin/…)
├── services/         # Services métier au-dessus de lib/ (auth.service)
├── styles/           # Styles globaux + design tokens (@theme)
├── test/             # Configuration des tests (setup)
├── types/            # Types transverses
├── utils/            # Fonctions pures (cn, formatPrice)
├── routes.tsx        # Arbre de routes partagé (client + SSG)
├── main.tsx          # Point d'entrée client (hydratation / rendu)
└── entry-server.tsx  # Point d'entrée SSR pour le pré-rendu
scripts/
└── prerender.mjs     # Fige les routes publiques en HTML statique
public/
└── images/           # Photographies par catégorie (hotel, suites, restaurant…)
```

**Principes** : SOLID, composants réutilisables, typage strict, un dossier =
une responsabilité, aucune valeur secrète en dur, zéro duplication.

Le **Design System** (`components/ui`) est la seule source des primitives
visuelles : toute section le réutilise (aucun style « jetable »).

---

## Rendu statique (SSG)

L'application reste une SPA, mais les **routes publiques sont figées en HTML
statique** au build (meilleur SEO, meilleur LCP, crédibilité marketing) — sans
migration de framework.

Chaîne de build :

1. `build:client` — bundle client (hydratable) ;
2. `build:server` — bundle SSR (`entry-server.tsx`) ;
3. `prerender` — rend chaque route publique et l'injecte dans le template Vite
   (titre, description et canonique ajustés par page).

Routes figées : `/`, `/reservation`, `/suites` et une page par suite
(`/suites/:slug`). Les slugs proviennent des données (`suiteSlugs`) — ajouter
une suite pré-rend automatiquement sa page.

Décisions clés :

- **Routes d'administration en `lazy`** : leur code — et le SDK Appwrite — sont
  exclus du bundle public **et** du chemin de pré-rendu. Le contexte d'auth est
  scopé au seul sous-arbre `/admin`.
- **`Reveal` sans état React** : la classe de visibilité est ajoutée via
  `IntersectionObserver` directement sur le nœud → HTML serveur et hydratation
  client identiques (aucun décalage). Sans JavaScript, le contenu reste visible.
- **Fallback SPA** (`public/_redirects`) : les pages pré-rendues sont servies
  comme fichiers ; toute autre route (dont `/admin/*`) retombe sur le SPA.

---

## Accessibilité & SEO

- Lien d'évitement (« Aller au contenu »), landmarks (`header`/`main`/`footer`),
  navigation mobile en `dialog` (focus, `Échap`, verrou de défilement).
- Contrastes conformes à la charte, `prefers-reduced-motion` respecté.
- Métadonnées par page centralisées (`src/config/seo.ts`), Open Graph et
  canonique injectés dans le HTML statique.

---

## Tests

Vitest + Testing Library (environnement jsdom) :

- **unitaires** — `formatPrice`, `cn` ;
- **composants** — `Seo` (métadonnées), `Reveal` (repli sans IO) ;
- **accessibilité** — `Navbar` (ouverture/fermeture du menu, `aria-expanded`,
  `Échap`) ;
- **intégration** — `Home` (hero + sections clés + appels à réserver).

```bash
npm test        # exécution unique
npm run test:watch
```

---

## Prérequis

- **Node.js** ≥ 22 (voir `.nvmrc` — `nvm use`)
- **npm** ≥ 10
- Un projet **Appwrite Cloud** existant

---

## Démarrage rapide

```bash
npm install
cp .env.example .env    # puis vérifier/ajuster les valeurs
npm run dev
```

---

## Variables d'environnement

Toutes les variables client sont préfixées `VITE_` et **validées au démarrage**
via Zod (`src/config/env.ts`). Une variable manquante ou invalide fait échouer
l'application immédiatement.

| Variable                     | Description                    | Exemple                            |
| ---------------------------- | ------------------------------ | ---------------------------------- |
| `VITE_APPWRITE_ENDPOINT`     | Endpoint de l'API Appwrite     | `https://fra.cloud.appwrite.io/v1` |
| `VITE_APPWRITE_PROJECT_ID`   | Identifiant du projet Appwrite | `maison-saint-jules`               |
| `VITE_APPWRITE_PROJECT_NAME` | Nom d'affichage du projet      | `Maison Saint-Jules`               |

> ⚠️ Le fichier `.env` n'est **jamais** committé. Seul `.env.example` l'est.

---

## Scripts

| Script                 | Rôle                                                 |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Serveur de développement Vite                        |
| `npm run build`        | Types → build client → build serveur → pré-rendu SSG |
| `npm run build:client` | Build client seul                                    |
| `npm run build:server` | Build du bundle SSR (`entry-server.tsx`)             |
| `npm run prerender`    | Fige les routes publiques en HTML statique           |
| `npm run preview`      | Prévisualise le build de production                  |
| `npm run typecheck`    | Vérification TypeScript stricte                      |
| `npm run lint`         | Analyse ESLint (type-aware)                          |
| `npm run format`       | Formatage Prettier                                   |
| `npm test`             | Suite de tests Vitest (exécution unique)             |

---

## Qualité & conventions

- **ESLint 9** (flat config, type-aware), règles React Hooks, `jsx-a11y`.
- **Prettier 3** — formatage unifié, tri automatique des classes Tailwind.
- **Husky + lint-staged** — ESLint + Prettier sur les fichiers indexés au commit.
- **Commits conventionnels** — validés par `commitlint`.
- **Alias** `@/*` → `src/*` (défini une seule fois dans `tsconfig`).

---

## Appwrite

Client centralisé dans `src/lib/appwrite.ts` :

- `client` — configuré depuis l'environnement validé ;
- `account` — authentification (**réservée à l'administration**) ;
- `databases` / `storage` — accès collections et fichiers ;
- `pingAppwrite()` — vérification de connectivité (non bloquante).

Prérequis console pour la connexion admin : déclarer la plateforme Web (CORS)
et créer l'utilisateur administrateur.

---

## Prochaines étapes

- **Moteur de réservation** (disponibilités, tunnel) ;
- **Direction artistique** — intégration des photographies réelles sous
  `public/images/` (le système média est déjà prêt) ;
- Back-office CRUD (suites, contenus) ;
- Internationalisation (chaînes prêtes à être externalisées) ;
- Pipeline CI (lint + typecheck + tests + build).

---

## Licence

Projet **propriétaire** — © Maison Saint-Jules. Tous droits réservés.
