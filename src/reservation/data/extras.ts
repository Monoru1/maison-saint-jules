import type { Extra } from '@/reservation/types';

/**
 * Catalogue des options du séjour. Les trois modes de facturation sont
 * représentés (par nuit, par personne, par séjour) et pilotent le calcul du
 * prix — aucune logique de tarif n'est dispersée dans les composants.
 */
export const extras: readonly Extra[] = [
  {
    id: 'petit-dejeuner',
    name: 'Petit-déjeuner servi en chambre',
    description: 'Viennoiseries maison, fruits de saison et boissons chaudes.',
    price: 48,
    billing: 'per-night',
  },
  {
    id: 'transfert-prive',
    name: 'Transfert privé',
    description: 'Berline avec chauffeur depuis la gare ou l’aéroport.',
    price: 180,
    billing: 'per-stay',
  },
  {
    id: 'diner-gastronomique',
    name: 'Dîner gastronomique',
    description: 'Menu du chef Augustin Lévêque au restaurant Le Cabinet.',
    price: 145,
    billing: 'per-person',
  },
  {
    id: 'spa',
    name: 'Rituel au spa',
    description: 'Accès privatif et soin signature de soixante minutes.',
    price: 120,
    billing: 'per-person',
  },
  {
    id: 'champagne',
    name: 'Champagne à l’arrivée',
    description: 'Une cuvée de maison rafraîchie, servie dans votre suite.',
    price: 120,
    billing: 'per-stay',
  },
  {
    id: 'fleurs',
    name: 'Composition florale',
    description:
      'Un bouquet composé par notre fleuriste, renouvelé chaque jour.',
    price: 60,
    billing: 'per-stay',
  },
  {
    id: 'late-checkout',
    name: 'Départ tardif',
    description: 'Profitez de votre suite jusqu’à 16h le jour du départ.',
    price: 90,
    billing: 'per-stay',
  },
] as const;

/** Retourne l'option correspondant à l'identifiant, ou `undefined`. */
export function getExtraById(id: string): Extra | undefined {
  return extras.find((extra) => extra.id === id);
}
