import type { Suite } from '@/hotel/types';

/** Trois catégories d'hébergement présentées en aperçu sur la page d'accueil. */
export const suites: readonly Suite[] = [
  {
    id: 'chambre-signature',
    name: 'Chambre Signature',
    tagline: 'Le raffinement d’une chambre parisienne',
    description:
      'Boiseries d’époque, lin lavé et lumière douce. Une chambre intime pensée comme un refuge au cœur de la Maison.',
    priceFrom: 690,
    guests: 2,
    area: 32,
    image: null,
  },
  {
    id: 'suite-jardin',
    name: 'Suite Jardin',
    tagline: 'Une échappée sur le jardin privé',
    description:
      'Ouverte sur les frondaisons centenaires, la Suite Jardin marie pierre claire, velours profond et sérénité végétale.',
    priceFrom: 1200,
    guests: 3,
    area: 58,
    image: null,
  },
  {
    id: 'appartement-delacroix',
    name: 'Appartement Delacroix',
    tagline: 'L’adresse la plus confidentielle de la Maison',
    description:
      'Un appartement d’exception au dernier étage, salon particulier et terrasse privée dominant les toits du 16ᵉ.',
    priceFrom: 2400,
    guests: 4,
    area: 96,
    image: null,
  },
] as const;
