import type { HotelIdentity, HotelImage, SocialLink } from '@/hotel/types';

/** Identité et coordonnées (fictives) de la Maison. */
export const hotel: HotelIdentity = {
  name: 'Maison Saint-Jules',
  location: 'Paris XVI',
  tagline: 'Intimité. Élégance. Excellence.',
  address: {
    street: '18, rue des Jardins',
    postalCode: '75016',
    city: 'Paris',
  },
  phone: '+33 1 45 00 00 00',
  email: 'conciergerie@maison-saint-jules.fr',
} as const;

/** Devise éditoriale de la Maison. */
export const motto = "L'élégance n'a pas besoin d'être remarquée.";

/** Récit fondateur, en paragraphes. */
export const story: readonly string[] = [
  "Maison Saint-Jules est née de la restauration d'un hôtel particulier édifié à la fin du XIXᵉ siècle par Jules Delacroix, collectionneur passionné d'art, d'architecture et de voyages.",
  'Des décennies durant, cette demeure a accueilli artistes, écrivains et diplomates dans la plus grande discrétion. Cette philosophie demeure : le luxe ne se démontre pas, il se vit.',
  'Derrière une façade haussmannienne, le bruit de Paris disparaît. Un jardin privé, une fontaine, quelques lanternes — le temps ralentit.',
] as const;

export const socials: readonly SocialLink[] = [
  { label: 'Instagram', platform: 'instagram', href: 'https://instagram.com' },
  { label: 'Pinterest', platform: 'pinterest', href: 'https://pinterest.com' },
  { label: 'LinkedIn', platform: 'linkedin', href: 'https://linkedin.com' },
] as const;

/** Visuel de façade utilisé par la section « Notre histoire ». */
export const maisonImage: HotelImage = {
  src: null,
  alt: 'Façade haussmannienne de la Maison Saint-Jules au crépuscule',
  category: 'hotel',
};
