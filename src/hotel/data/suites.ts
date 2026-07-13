import type { Suite, SuiteKind } from '@/hotel/types';

/** Libellés d'affichage des catégories de suites. */
export const suiteKindLabels: Record<SuiteKind, string> = {
  chambre: 'Chambre',
  suite: 'Suite',
  appartement: 'Appartement',
};

/**
 * Catalogue des hébergements de la Maison. Source de vérité unique consommée
 * par l'aperçu d'accueil, la page `/suites` et les pages `/suites/:slug`.
 */
export const suites: readonly Suite[] = [
  {
    id: 'chambre-signature',
    slug: 'chambre-signature',
    name: 'Chambre Signature',
    kind: 'chambre',
    tagline: 'Le raffinement d’une chambre parisienne',
    description:
      'Boiseries d’époque, lin lavé et lumière douce. Une chambre intime pensée comme un refuge au cœur de la Maison.',
    editorial: [
      'La Chambre Signature est l’essence de la Maison Saint-Jules : discrète, chaleureuse, sans un geste de trop. Les boiseries d’origine, patinées par le temps, encadrent un lit habillé de lin lavé et de laine.',
      'Chaque détail y répond à une même idée du confort — une lumière qui se tamise au fil de la journée, une acoustique feutrée, un mobilier chiné qui raconte une histoire. On s’y sent immédiatement chez soi.',
    ],
    priceFrom: 690,
    guests: 2,
    area: 32,
    bed: 'Lit king size 200 × 200',
    view: 'Vue cour intérieure',
    features: [
      'Boiseries d’époque restaurées',
      'Salle de bain en marbre',
      'Lin lavé et laine naturelle',
      'Insonorisation soignée',
    ],
    services: [
      'Petit-déjeuner servi en chambre',
      'Accès au spa',
      'Conciergerie 24h/24',
      'Wi-Fi haut débit',
    ],
    experience: {
      title: 'Réveil parisien',
      description:
        'Un petit-déjeuner composé par le chef, servi à l’heure que vous choisissez, dans le calme de votre chambre.',
    },
    cover: {
      src: '/images/suites/chambre-signature-morning-v4.webp',
      alt: 'Chambre Signature aux boiseries d’époque baignée de lumière douce',
      category: 'suites',
    },
    gallery: [
      {
        src: '/images/suites/chambre-signature-morning-v4.webp',
        alt: 'Lit habillé de lin lavé dans la Chambre Signature',
        category: 'suites',
      },
      {
        src: '/images/suites/chambre-signature-bath-v4.webp',
        alt: 'Salle de bain en marbre de la Chambre Signature',
        category: 'suites',
      },
      {
        src: '/images/suites/suite-jardin-salon-v4.webp',
        alt: 'Coin salon feutré de la Chambre Signature',
        category: 'suites',
      },
    ],
  },
  {
    id: 'suite-jardin',
    slug: 'suite-jardin',
    name: 'Suite Jardin',
    kind: 'suite',
    tagline: 'Une échappée sur le jardin privé',
    description:
      'Ouverte sur les frondaisons centenaires, la Suite Jardin marie pierre claire, velours profond et sérénité végétale.',
    editorial: [
      'Au premier étage de l’hôtel particulier, la Suite Jardin s’ouvre en grand sur les frondaisons centenaires. La ville disparaît ; ne reste que le bruissement des feuilles et la lumière filtrée par les arbres.',
      'L’espace de nuit et le salon se répondent dans une même palette de pierre claire et de velours profond. C’est une suite pour prendre le temps — lire, se reposer, recevoir en toute intimité.',
    ],
    priceFrom: 1200,
    guests: 3,
    area: 58,
    bed: 'Lit king size 200 × 200 + canapé-lit',
    view: 'Vue jardin privé',
    features: [
      'Salon séparé',
      'Grandes fenêtres sur le jardin',
      'Cheminée décorative',
      'Dressing en noyer',
    ],
    services: [
      'Petit-déjeuner servi en suite',
      'Accès au spa',
      'Conciergerie 24h/24',
      'Mise à disposition d’un majordome',
    ],
    experience: {
      title: 'Thé au jardin',
      description:
        'Un service de thé d’après-midi dressé face au jardin privé, autour d’une sélection de crus rares.',
    },
    cover: {
      src: '/images/suites/suite-jardin-cover.webp',
      alt: 'Suite Jardin ouverte sur les frondaisons du jardin privé',
      category: 'suites',
    },
    gallery: [
      {
        src: '/images/suites/suite-jardin-salon-v4.webp',
        alt: 'Salon de la Suite Jardin en velours profond',
        category: 'suites',
      },
      {
        src: '/images/suites/chambre-signature-morning-v4.webp',
        alt: 'Chambre de la Suite Jardin face aux arbres',
        category: 'suites',
      },
      {
        src: '/images/hotel/jardin-apres-pluie.webp',
        alt: 'Fenêtres de la Suite Jardin ouvertes sur la végétation',
        category: 'suites',
      },
    ],
  },
  {
    id: 'appartement-delacroix',
    slug: 'appartement-delacroix',
    name: 'Appartement Delacroix',
    kind: 'appartement',
    tagline: 'L’adresse la plus confidentielle de la Maison',
    description:
      'Un appartement d’exception au dernier étage : salon particulier et terrasse privée dominant les toits du 16ᵉ.',
    editorial: [
      'L’Appartement Delacroix occupe tout le dernier étage de la Maison. Nommé d’après son fondateur, il en incarne l’esprit : celui d’une demeure privée où l’on reçoit comme chez soi, loin des regards.',
      'Un salon particulier prolonge la chambre, une terrasse privée s’ouvre sur les toits de Paris. Ici, la Maison met à disposition son majordome et sa table : un séjour entièrement composé pour vous.',
    ],
    priceFrom: 2400,
    guests: 4,
    area: 96,
    bed: 'Deux chambres, lits king size',
    view: 'Terrasse privée sur les toits',
    features: [
      'Terrasse privée',
      'Salon particulier',
      'Deux chambres',
      'Salle à manger privée',
    ],
    services: [
      'Majordome dédié',
      'Table privée du chef sur demande',
      'Accès au spa en privatisation',
      'Transfert privé à l’arrivée',
    ],
    experience: {
      title: 'Dîner sur les toits',
      description:
        'Un dîner composé par le chef Augustin Lévêque, servi sur votre terrasse privée, au-dessus des toits du 16ᵉ.',
    },
    cover: {
      src: '/images/suites/appartement-delacroix-terrace-v4.webp',
      alt: 'Terrasse privée de l’Appartement Delacroix dominant les toits de Paris',
      category: 'suites',
    },
    gallery: [
      {
        src: '/images/suites/suite-jardin-salon-v4.webp',
        alt: 'Salon particulier de l’Appartement Delacroix',
        category: 'suites',
      },
      {
        src: '/images/suites/appartement-delacroix-terrace-v4.webp',
        alt: 'Terrasse de l’Appartement Delacroix au crépuscule',
        category: 'suites',
      },
      {
        src: '/images/suites/chambre-signature-morning-v4.webp',
        alt: 'Chambre principale de l’Appartement Delacroix',
        category: 'suites',
      },
      {
        src: '/images/restaurant/cabinet-table-v4.webp',
        alt: 'Salle à manger privée de l’Appartement Delacroix',
        category: 'suites',
      },
    ],
  },
] as const;

/** Retourne la suite correspondant au slug, ou `undefined` si inexistante. */
export function getSuiteBySlug(slug: string): Suite | undefined {
  return suites.find((suite) => suite.slug === slug);
}

/** Liste des slugs (pré-rendu SSG des pages de détail). */
export const suiteSlugs: readonly string[] = suites.map((suite) => suite.slug);
