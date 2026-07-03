/**
 * Types du domaine « hôtel ».
 * Toutes les données de contenu (mockées aujourd'hui, servies par Appwrite
 * demain) sont conformes à ces contrats. Les visuels sont représentés par une
 * URL (`image`) ou `null` tant qu'aucune photographie réelle n'est fournie.
 */

export interface Suite {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  /** Prix indicatif « à partir de », en euros, hors taxes locales. */
  readonly priceFrom: number;
  readonly guests: number;
  /** Surface en mètres carrés. */
  readonly area: number;
  readonly image: string | null;
}

export interface Chef {
  readonly name: string;
  readonly title: string;
}

export interface Restaurant {
  readonly name: string;
  readonly cuisine: string;
  readonly chef: Chef;
  readonly description: string;
  readonly image: string | null;
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
  readonly alt: string;
  readonly image: string | null;
  /** Occupe une cellule agrandie dans la composition. */
  readonly featured?: boolean;
}

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
