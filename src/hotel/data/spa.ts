import type { SpaTreatment } from '@/hotel/types';

export const spaIntroduction =
  'Sous les voûtes de pierre, le spa de la Maison est un sanctuaire confidentiel. Piscine intérieure, hammam et cabines de soin où le temps s’efface.';

export const spaTreatments: readonly SpaTreatment[] = [
  {
    id: 'rituel-maison',
    name: 'Rituel Maison',
    duration: 90,
    description:
      'Un modelage signature aux huiles précieuses, pensé pour dénouer le corps et apaiser l’esprit.',
  },
  {
    id: 'soin-pierre-lin',
    name: 'Soin Pierre & Lin',
    duration: 60,
    description:
      'Gommage à la pierre fine et enveloppement au lin, pour une peau lumineuse et régénérée.',
  },
  {
    id: 'parenthese-absolue',
    name: 'Parenthèse Absolue',
    duration: 120,
    description:
      'Un parcours complet — hammam, modelage et soin du visage — pour une déconnexion totale.',
  },
] as const;
