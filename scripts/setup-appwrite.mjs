#!/usr/bin/env node
/**
 * Configuration idempotente d'Appwrite pour Maison Saint-Jules.
 *
 * - Lit `.env.appwrite.local` (jamais commité, jamais exposé au frontend).
 * - Crée la base, les collections, les attributs et les index décrits ci-dessous.
 * - Idempotent : un élément déjà présent est journalisé « exists » sans erreur.
 * - Attend que les attributs soient « available » avant de créer les index
 *   (Appwrite provisionne les attributs de façon asynchrone).
 *
 * La clé serveur ne quitte jamais ce script : le frontend n'en dépend jamais.
 *
 * Usage : npm run appwrite:setup
 */
import { Client, Databases, Permission, Query, Role } from 'node-appwrite';

/* -------------------------------------------------------------------------- */
/*  Environnement                                                             */
/* -------------------------------------------------------------------------- */

try {
  process.loadEnvFile(new URL('../.env.appwrite.local', import.meta.url));
} catch {
  console.error(
    '\n✗ Fichier `.env.appwrite.local` introuvable à la racine du projet.\n' +
      '  Créez-le à partir du modèle `.env.appwrite.local.example`.\n',
  );
  process.exit(1);
}

const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_API_KEY,
} = process.env;

for (const [name, value] of Object.entries({
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_API_KEY,
})) {
  if (!value) {
    console.error(
      `\n✗ Variable manquante dans .env.appwrite.local : ${name}\n`,
    );
    process.exit(1);
  }
}

const DB = APPWRITE_DATABASE_ID;
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setKey(APPWRITE_API_KEY);
const databases = new Databases(client);

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const tally = { created: 0, exists: 0 };
const isConflict = (error) => error?.code === 409;

function log(state, label) {
  tally[state] += 1;
  console.log(
    `  ${state === 'created' ? '＋ created' : '· exists '}  ${label}`,
  );
}

const str = (key, size, required = true) => ({
  kind: 'string',
  key,
  size,
  required,
});
const int = (key, required = true) => ({ kind: 'integer', key, required });
const bool = (key, required = true) => ({ kind: 'boolean', key, required });
const dt = (key, required = true) => ({ kind: 'datetime', key, required });
const mail = (key, required = true) => ({ kind: 'email', key, required });
const index = (key, attributes) => ({ key, attributes });

const publicWrite = [
  Permission.create(Role.any()),
  Permission.read(Role.users()),
  Permission.update(Role.users()),
  Permission.delete(Role.users()),
];
const publicRead = [
  Permission.read(Role.any()),
  Permission.create(Role.users()),
  Permission.update(Role.users()),
  Permission.delete(Role.users()),
];

/* -------------------------------------------------------------------------- */
/*  Schéma métier                                                             */
/* -------------------------------------------------------------------------- */

const schema = [
  {
    id: 'booking_requests',
    name: 'Demandes de réservation',
    permissions: publicWrite,
    attributes: [
      str('reference', 32),
      str('status', 32),
      dt('arrival'),
      dt('departure'),
      int('nights'),
      int('adults'),
      int('children'),
      str('suite_id', 64),
      str('suite_slug', 128),
      str('suite_name', 160),
      int('suite_price_per_night'),
      str('selected_extras', 5000),
      int('subtotal'),
      int('extras_total'),
      int('total'),
      str('currency', 8),
      str('firstname', 80),
      str('lastname', 80),
      mail('email'),
      str('phone', 40),
      str('special_request', 2000, false),
      bool('consent'),
      dt('created_at'),
      dt('updated_at', false),
    ],
    indexes: [
      index('idx_reference', ['reference']),
      index('idx_status', ['status']),
      index('idx_arrival', ['arrival']),
      index('idx_departure', ['departure']),
      index('idx_email', ['email']),
      index('idx_created_at', ['created_at']),
    ],
  },
  {
    id: 'suites',
    name: 'Suites',
    permissions: publicRead,
    attributes: [
      str('slug', 128),
      str('name', 160),
      str('kind', 64),
      str('tagline', 200),
      str('description', 3000),
      int('area'),
      int('guests'),
      int('price_from'),
      str('cover_image', 500, false),
      // Champs JSON volumineux : taille > 16383 => stockés en TEXT (hors-ligne)
      // par Appwrite, afin de ne pas saturer la limite de taille de ligne MariaDB.
      str('gallery', 16384, false),
      str('services', 16384, false),
      str('features', 16384, false),
      str('signature_experience', 3000, false),
      bool('is_active'),
      int('sort_order'),
      dt('created_at'),
      dt('updated_at', false),
    ],
    indexes: [
      index('idx_slug', ['slug']),
      index('idx_kind', ['kind']),
      index('idx_is_active', ['is_active']),
      index('idx_sort_order', ['sort_order']),
    ],
  },
  {
    id: 'extras',
    name: 'Options',
    permissions: publicRead,
    attributes: [
      str('slug', 128),
      str('name', 160),
      str('description', 1000),
      int('price'),
      str('billing_mode', 32),
      bool('is_active'),
      int('sort_order'),
      dt('created_at'),
      dt('updated_at', false),
    ],
    indexes: [
      index('idx_slug', ['slug']),
      index('idx_is_active', ['is_active']),
      index('idx_sort_order', ['sort_order']),
    ],
  },
  {
    id: 'contact_messages',
    name: 'Messages de contact',
    permissions: publicWrite,
    attributes: [
      str('status', 32),
      str('firstname', 80),
      str('lastname', 80),
      mail('email'),
      str('phone', 40, false),
      str('subject', 160),
      str('message', 3000),
      str('source', 80, false),
      dt('created_at'),
      dt('updated_at', false),
    ],
    indexes: [],
  },
  {
    id: 'gallery_items',
    name: 'Galerie',
    permissions: publicRead,
    attributes: [
      str('title', 160),
      str('alt', 300),
      str('category', 64),
      str('image_src', 500, false),
      bool('featured'),
      int('sort_order'),
      bool('is_active'),
      dt('created_at'),
      dt('updated_at', false),
    ],
    indexes: [],
  },
  {
    id: 'offers',
    name: 'Offres',
    permissions: publicRead,
    attributes: [
      str('slug', 128),
      str('title', 160),
      str('description', 2000),
      dt('start_date', false),
      dt('end_date', false),
      str('discount_type', 32, false),
      int('discount_value', false),
      bool('is_active'),
      int('sort_order'),
      dt('created_at'),
      dt('updated_at', false),
    ],
    indexes: [],
  },
  {
    id: 'site_settings',
    name: 'Paramètres du site',
    permissions: publicRead,
    attributes: [
      str('key', 128),
      str('value', 8000),
      str('type', 32),
      dt('updated_at', false),
    ],
    indexes: [],
  },
  {
    id: 'availability_blocks',
    name: 'Blocages de disponibilité',
    permissions: publicRead,
    attributes: [
      str('suite_id', 64),
      str('suite_slug', 128),
      dt('start_date'),
      dt('end_date'),
      str('status', 32),
      str('reason', 500, false),
      dt('created_at'),
      dt('updated_at', false),
    ],
    indexes: [
      index('idx_suite_slug', ['suite_slug']),
      index('idx_start_date', ['start_date']),
      index('idx_end_date', ['end_date']),
      index('idx_status', ['status']),
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Opérations idempotentes                                                   */
/* -------------------------------------------------------------------------- */

async function ensureDatabase() {
  // Idempotent : si la base existe déjà, on continue sans tenter de la recréer
  // (utile lorsque la création est bloquée par la limite du plan).
  try {
    await databases.get(DB);
    log('exists', `database ${DB}`);
    return;
  } catch (error) {
    if (error?.code !== 404) throw error;
  }

  try {
    await databases.create(DB, 'Maison Saint-Jules');
    log('created', `database ${DB}`);
  } catch (error) {
    if (isConflict(error)) {
      log('exists', `database ${DB}`);
      return;
    }
    if (
      error?.code === 403 &&
      error?.type === 'additional_resource_not_allowed'
    ) {
      throw new Error(
        'Limite du plan Appwrite atteinte : impossible de créer une nouvelle base.\n' +
          '  → Libérez un emplacement (supprimez une base inutilisée dans un autre\n' +
          '    projet de la même organisation Appwrite) ou passez à un plan supérieur,\n' +
          '  → ou créez manuellement la base « ' +
          DB +
          ' » dans la console,\n' +
          '  puis relancez `npm run appwrite:setup` (le script reprendra la suite).',
      );
    }
    throw error;
  }
}

async function ensureCollection(col) {
  try {
    await databases.createCollection(
      DB,
      col.id,
      col.name,
      col.permissions,
      false,
      true,
    );
    log('created', `collection ${col.id}`);
  } catch (error) {
    if (!isConflict(error)) throw error;
    log('exists', `collection ${col.id}`);
    // Réaligne le nom et les permissions au cas où ils auraient changé.
    await databases.updateCollection(
      DB,
      col.id,
      col.name,
      col.permissions,
      false,
      true,
    );
  }
}

async function createAttribute(colId, { kind, key, size, required }) {
  if (kind === 'string')
    await databases.createStringAttribute(DB, colId, key, size, required);
  else if (kind === 'integer')
    await databases.createIntegerAttribute(DB, colId, key, required);
  else if (kind === 'boolean')
    await databases.createBooleanAttribute(DB, colId, key, required);
  else if (kind === 'datetime')
    await databases.createDatetimeAttribute(DB, colId, key, required);
  else if (kind === 'email')
    await databases.createEmailAttribute(DB, colId, key, required);
}

async function ensureAttributes(colId, attributes) {
  // Idempotence robuste : on liste l'existant plutôt que de s'appuyer sur un
  // code d'erreur. Appwrite valide la taille de ligne AVANT le contrôle de
  // doublon ; re-créer un attribut existant sur une collection proche de la
  // limite lèverait « attribute_limit_exceeded » (400) au lieu d'un 409.
  const existing = new Set(
    (
      await databases.listAttributes(DB, colId, [Query.limit(100)])
    ).attributes.map((attribute) => attribute.key),
  );
  for (const attribute of attributes) {
    if (existing.has(attribute.key)) {
      log('exists', `attr  ${colId}.${attribute.key}`);
      continue;
    }
    try {
      await createAttribute(colId, attribute);
      log('created', `attr  ${colId}.${attribute.key}`);
    } catch (error) {
      if (isConflict(error)) log('exists', `attr  ${colId}.${attribute.key}`);
      else throw error;
    }
  }
}

async function waitForAttributes(colId, keys) {
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    const { attributes } = await databases.listAttributes(DB, colId, [
      Query.limit(100),
    ]);
    const status = new Map(attributes.map((a) => [a.key, a.status]));
    const failed = keys.filter((key) => status.get(key) === 'failed');
    if (failed.length)
      throw new Error(`Attributs en échec (${colId}) : ${failed.join(', ')}`);
    const pending = keys.filter((key) => status.get(key) !== 'available');
    if (pending.length === 0) return;
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  throw new Error(`Délai dépassé en attendant les attributs de ${colId}`);
}

async function ensureIndexes(colId, indexes) {
  if (indexes.length === 0) return;
  const existing = new Set(
    (await databases.listIndexes(DB, colId, [Query.limit(100)])).indexes.map(
      (entry) => entry.key,
    ),
  );
  for (const { key, attributes } of indexes) {
    if (existing.has(key)) {
      log('exists', `index ${colId}.${key}`);
      continue;
    }
    try {
      await databases.createIndex(DB, colId, key, 'key', attributes);
      log('created', `index ${colId}.${key}`);
    } catch (error) {
      if (isConflict(error)) log('exists', `index ${colId}.${key}`);
      else throw error;
    }
  }
}

/* -------------------------------------------------------------------------- */
/*  Exécution                                                                 */
/* -------------------------------------------------------------------------- */

async function main() {
  console.log(
    `\n▶ Appwrite — ${APPWRITE_ENDPOINT}\n  projet ${APPWRITE_PROJECT_ID} · base ${DB}\n`,
  );
  await ensureDatabase();

  for (const col of schema) {
    console.log(`\n■ ${col.id}`);
    await ensureCollection(col);
    await ensureAttributes(col.id, col.attributes);
    await waitForAttributes(
      col.id,
      col.attributes.map((a) => a.key),
    );
    await ensureIndexes(col.id, col.indexes);
  }

  console.log(
    `\n✔ Terminé — ${tally.created} créé(s), ${tally.exists} déjà présent(s).\n`,
  );
}

main().catch((error) => {
  console.error(`\n✗ Échec : ${error?.message ?? String(error)}\n`);
  process.exit(1);
});
