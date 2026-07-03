/**
 * Types transverses partagés par l'application.
 * Les types métier (chambres, réservations, clients…) seront ajoutés au fur
 * et à mesure des itérations, dans des fichiers dédiés de ce dossier.
 */

/** Rend récursivement toutes les propriétés d'un type en lecture seule. */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

/** Union représentant un état de chargement asynchrone standard. */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

/** Résultat générique d'une opération pouvant échouer, sans exception. */
export type Result<T, E = Error> =
  | { readonly ok: true; readonly data: T }
  | { readonly ok: false; readonly error: E };
