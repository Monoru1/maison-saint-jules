/**
 * Types du domaine « hôtel ».
 * Toutes les données de contenu (mockées aujourd'hui, servies par Appwrite
 * demain) sont conformes à ces contrats.
 */

/* -------------------------------------------------------------------------- */
/*  Média                                                                      */
/* -------------------------------------------------------------------------- */

/** Familles de visuels — alignées sur l'arborescence `public/images/<category>/`. */
export type MediaCategory =
  'hotel' | 'suites' | 'restaurant' | 'spa' | 'gallery';

/** Point d'intérêt (0 → 1) pour le cadrage `object-position`. */
export interface FocalPoint {
  readonly x: number;
  readonly y: number;
}

/**
 * Descripteur d'image unique du système média.
 * `src === null` déclenche un placeholder de marque soigné, sans dépendance
 * externe. Renseigner `src` (chemin sous `public/images/`) suffit à publier la
 * photographie réelle — aucun autre changement de code n'est requis.
 */
export interface HotelImage {
  readonly src: string | null;
  readonly alt: string;
  readonly category: MediaCategory;
  readonly width?: number;
  readonly height?: number;
  readonly focalPoint?: FocalPoint;
}

/* -------------------------------------------------------------------------- */
/*  Suites                                                                     */
/* -------------------------------------------------------------------------- */

export type SuiteKind = 'chambre' | 'suite' | 'appartement';

/** Expérience signature associée à une suite. */
export interface SuiteExperience {
  readonly title: string;
  readonly description: string;
}

export interface Suite {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly kind: SuiteKind;
  readonly tagline: string;
  /** Résumé court (cartes, aperçu). */
  readonly description: string;
  /** Paragraphes éditoriaux (page détail). */
  readonly editorial: readonly string[];
  /** Prix indicatif « à partir de », en euros, hors taxes locales. */
  readonly priceFrom: number;
  /** Capacité (nombre de personnes). */
  readonly guests: number;
  /** Surface en mètres carrés. */
  readonly area: number;
  readonly bed: string;
  readonly view: string;
  readonly features: readonly string[];
  readonly services: readonly string[];
  readonly experience: SuiteExperience;
  readonly cover: HotelImage;
  readonly gallery: readonly HotelImage[];
}

/* -------------------------------------------------------------------------- */
/*  Restaurant · Spa · Expériences · Galerie                                   */
/* -------------------------------------------------------------------------- */

export interface Chef {
  readonly name: string;
  readonly title: string;
}

export interface Restaurant {
  readonly name: string;
  readonly cuisine: string;
  readonly chef: Chef;
  readonly description: string;
  readonly image: HotelImage;
}

export interface SpaTreatment {
  readonly id: string;
  readonly name: string;
  /** Durée du soin en minutes. */
  readonly duration: number;
  readonly description: string;
}

export type ExperienceIcon = 'concierge' | 'chauffeur' | 'visite' | 'shopping';

export interface Experience {
  readonly id: string;
  readonly icon: ExperienceIcon;
  readonly title: string;
  readonly description: string;
}

export interface GalleryImage {
  readonly id: string;
  readonly image: HotelImage;
  /** Occupe une cellule agrandie dans la composition. */
  readonly featured?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Navigation · Identité                                                      */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  readonly label: string;
  /** Ancre de section (#…) ou chemin de route. */
  readonly href: string;
}

export type SocialPlatform = 'instagram' | 'linkedin' | 'pinterest';

export interface SocialLink {
  readonly label: string;
  readonly platform: SocialPlatform;
  readonly href: string;
}

export interface HotelAddress {
  readonly street: string;
  readonly postalCode: string;
  readonly city: string;
}

export interface HotelIdentity {
  readonly name: string;
  readonly location: string;
  readonly tagline: string;
  readonly address: HotelAddress;
  readonly phone: string;
  readonly email: string;
}
