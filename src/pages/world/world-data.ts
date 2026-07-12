import { ROUTES } from '@/config/routes';

export interface WorldChapter {
  title: string;
  eyebrow: string;
  line: string;
  copy: string;
  image: string;
  alt: string;
  next: { label: string; href: string };
  details: readonly [string, string, string];
}

export const worldChapters = {
  maison: {
    title: 'La Maison',
    eyebrow: 'I · Le seuil',
    line: 'Une adresse qui ne se donne pas tout entière.',
    copy: 'La Maison Saint-Jules ne commence pas dans le hall. Elle commence dans l’instant où la rue perd un peu de son poids. La pierre garde l’eau, le noyer retient la lumière et une porte laisse deviner que quelqu’un a pensé à votre arrivée.',
    image: '/images/hotel/threshold-dawn.webp',
    alt: 'Porte de la Maison Saint-Jules après la pluie',
    next: { label: 'Entrer dans les suites', href: ROUTES.suites },
    details: [
      '1878 — une demeure d’éditeur',
      'Pierre, noyer, lin, laiton',
      'Le silence est une matière',
    ],
  },
  bains: {
    title: 'Les Bains',
    eyebrow: 'IV · L’eau',
    line: 'Le corps ralentit avant la pensée.',
    copy: 'Les bains ne sont pas un spa ajouté à un hôtel. Ce sont des pièces minérales où l’eau modifie la lumière, où la vapeur brouille les contours et où chaque rituel commence par une minute sans demande.',
    image: '/images/hotel/jardin-apres-pluie.webp',
    alt: 'Reflet d’eau dans le jardin intérieur de la Maison',
    next: { label: 'Trouver le jardin', href: ROUTES.jardin },
    details: [
      'Pierre brossée et eau sombre',
      'Rituels sans urgence',
      'Lumière mouvante, pas de musique imposée',
    ],
  },
  cabinet: {
    title: 'Le Cabinet',
    eyebrow: 'III · La table',
    line: 'Un dîner comme une conversation qui prend son temps.',
    copy: 'Vingt couverts seulement. La table ne cherche pas à être vue : elle laisse une assiette, un verre et la chaleur du bois faire le travail. À côté, la cuisine existe par la vapeur et la précision de ses gestes.',
    image: '/images/restaurant/le-cabinet.webp',
    alt: 'Table du Cabinet à la Maison Saint-Jules',
    next: { label: 'Passer aux bains', href: ROUTES.bains },
    details: [
      'Vingt couverts',
      'Cuisine française de saison',
      'Service attentif, présence discrète',
    ],
  },
  jardin: {
    title: 'Le Jardin',
    eyebrow: 'V · La respiration',
    line: 'L’eau est entendue avant d’être vue.',
    copy: 'Derrière les pièces, le jardin retire les murs de l’attention. Après la pluie, l’eau reprend le ciel ; les feuilles bougent sans jouer pour la caméra. C’est la scène où la Maison accepte que rien ne se passe.',
    image: '/images/hotel/jardin-apres-pluie.webp',
    alt: 'Jardin intérieur de Maison Saint-Jules après la pluie',
    next: { label: 'Voir le matin', href: ROUTES.matin },
    details: [
      'Osmonde, mousse, érable',
      'Ombres lentes',
      'Une pause sans appel à l’action',
    ],
  },
  matin: {
    title: 'Le Matin',
    eyebrow: 'VI · Le jour',
    line: 'La Maison s’ouvre avant que Paris ne s’accélère.',
    copy: 'Les voilages bougent à peine. Une fenêtre côté jardin laisse entrer l’air frais. Le premier café arrive sans horloge et la lumière trouve, une à une, les traces de la veille.',
    image: '/images/suites/suite-jardin-cover.webp',
    alt: 'Suite de la Maison baignée de lumière du matin',
    next: { label: 'Attendre la nuit', href: ROUTES.nuit },
    details: ['Lumière à 3900 K', 'Lin, papier, café', 'Paris encore au loin'],
  },
  nuit: {
    title: 'La Nuit',
    eyebrow: 'VII · Après 22 h',
    line: 'La lumière ne disparaît pas. Elle choisit où rester.',
    copy: 'Lorsque le jardin devient sombre, les lampes ne remplacent pas le jour : elles redessinent les distances. Le laiton capte un reflet, une fenêtre devient un cadre et la Maison semble n’appartenir qu’à ceux qui y restent.',
    image: '/images/hotel/threshold-dawn.webp',
    alt: 'Entrée de la Maison à la lumière du soir',
    next: { label: 'Composer un séjour', href: ROUTES.experiences },
    details: [
      'Ambre à 2400 K',
      'Ombres lisibles',
      'La ville devient une rumeur',
    ],
  },
  experiences: {
    title: 'Les Expériences',
    eyebrow: 'VIII · Les gestes',
    line: 'Une journée ne se remplit pas. Elle se compose.',
    copy: 'Petit-déjeuner à la fenêtre, quelques pages dans le salon, bain lent, promenade sans itinéraire, voiture préparée, Paris retrouvé au bon moment. La conciergerie ne vend pas un programme : elle enlève les frictions.',
    image: '/images/suites/suite-jardin-cover.webp',
    alt: 'Suite de la Maison Saint-Jules',
    next: { label: 'Lire le journal', href: ROUTES.journal },
    details: ['Petit-déjeuner', 'Lecture et bain', 'Conciergerie et Paris'],
  },
  journal: {
    title: 'Journal de la Maison',
    eyebrow: 'Les traces',
    line: 'Ce qui change avec les saisons mérite d’être regardé.',
    copy: 'Architecture, cuisine, jardin, lumière et saisons : le journal garde les détails qui font une Maison vivante. Pas des nouvelles pour remplir un fil ; des observations qui donnent envie de revenir voir.',
    image: '/images/hotel/jardin-apres-pluie.webp',
    alt: 'Détails du jardin de la Maison Saint-Jules',
    next: { label: 'Revenir au seuil', href: ROUTES.maison },
    details: ['Architecture', 'Cuisine', 'Jardin et saisons'],
  },
} satisfies Record<string, WorldChapter>;
