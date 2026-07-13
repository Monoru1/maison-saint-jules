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
  quote: string;
  gallery: readonly [WorldChapterImage, WorldChapterImage, WorldChapterImage];
  moments: readonly [
    WorldChapterMoment,
    WorldChapterMoment,
    WorldChapterMoment,
  ];
  signature: { label: string; value: string; note: string };
}

interface WorldChapterImage {
  image: string;
  alt: string;
  caption: string;
}

interface WorldChapterMoment {
  time: string;
  title: string;
  copy: string;
}

export const worldChapters = {
  maison: {
    title: 'La Maison',
    eyebrow: 'I · Le seuil',
    line: 'Une adresse qui ne se donne pas tout entière.',
    copy: 'La Maison Saint-Jules ne commence pas dans le hall. Elle commence dans l’instant où la rue perd un peu de son poids. La pierre garde l’eau, le noyer retient la lumière et une porte laisse deviner que quelqu’un a pensé à votre arrivée.',
    image: '/images/hotel/vestibule-rain-v4.webp',
    alt: 'Porte de la Maison Saint-Jules après la pluie',
    next: { label: 'Entrer dans les suites', href: ROUTES.suites },
    details: [
      '1878 — une demeure d’éditeur',
      'Pierre, noyer, lin, laiton',
      'Le silence est une matière',
    ],
    quote:
      'Une maison devient hospitalière quand elle semble vous avoir précédé.',
    gallery: [
      {
        image: '/images/hotel/threshold-dawn.webp',
        alt: 'La façade de la Maison dans la lumière humide du soir',
        caption: 'Dehors · la pierre garde la pluie',
      },
      {
        image: '/images/hotel/salon-dusk.webp',
        alt: 'Le salon de la Maison à la tombée du jour',
        caption: 'Dedans · le noyer retient le bruit',
      },
      {
        image: '/images/suites/suite-jardin-salon-v4.webp',
        alt: 'Une porte du salon ouverte vers le jardin',
        caption: 'Plus loin · une pièce en annonce une autre',
      },
    ],
    moments: [
      {
        time: '18 h 43',
        title: 'La rue',
        copy: 'La ville est encore proche, mais sa vitesse ne franchit pas la porte.',
      },
      {
        time: '18 h 44',
        title: 'Le vestibule',
        copy: 'Le plafond se lève, le pas change de son, le regard trouve la lumière.',
      },
      {
        time: '18 h 46',
        title: 'Être attendu',
        copy: 'Un manteau disparaît. Une clé arrive. Rien ne demande d’explication.',
      },
    ],
    signature: {
      label: 'Température de la Maison',
      value: '2 700 K',
      note: 'Une chaleur de lampe, jamais une lumière jaune.',
    },
  },
  bains: {
    title: 'Les Bains',
    eyebrow: 'IV · L’eau',
    line: 'Le corps ralentit avant la pensée.',
    copy: 'Les bains ne sont pas un spa ajouté à un hôtel. Ce sont des pièces minérales où l’eau modifie la lumière, où la vapeur brouille les contours et où chaque rituel commence par une minute sans demande.',
    image: '/images/suites/chambre-signature-bath-v4.webp',
    alt: 'Bains de pierre et eau sombre à la Maison Saint-Jules',
    next: { label: 'Trouver le jardin', href: ROUTES.jardin },
    details: [
      'Pierre brossée et eau sombre',
      'Rituels sans urgence',
      'Lumière mouvante, pas de musique imposée',
    ],
    quote: 'L’eau ne décore pas la pièce. Elle en change la gravité.',
    gallery: [
      {
        image: '/images/spa/baths-still.webp',
        alt: 'Surface sombre du bassin minéral',
        caption: 'Le bassin · l’eau attend avant le corps',
      },
      {
        image: '/images/suites/chambre-signature-bath-v4.webp',
        alt: 'Pierre claire et vapeur dans les Bains',
        caption: 'La pierre · brossée, tiède, silencieuse',
      },
      {
        image: '/images/hotel/jardin-apres-pluie.webp',
        alt: 'Eau de pluie sur les feuilles du jardin',
        caption: 'Après · retrouver l’air et la pluie',
      },
    ],
    moments: [
      {
        time: '00 min',
        title: 'Déposer',
        copy: 'Le tissu quitte les épaules. La pièce ne demande encore aucun geste.',
      },
      {
        time: '12 min',
        title: 'Immerger',
        copy: 'L’eau à 34 °C efface les angles sans effacer la présence du corps.',
      },
      {
        time: '31 min',
        title: 'Revenir',
        copy: 'Une serviette chaude, une infusion claire, puis une minute sans parole.',
      },
    ],
    signature: {
      label: 'Température du bassin',
      value: '34 °C',
      note: 'Assez chaude pour ralentir, assez claire pour rester éveillé.',
    },
  },
  cabinet: {
    title: 'Le Cabinet',
    eyebrow: 'III · La table',
    line: 'Un dîner comme une conversation qui prend son temps.',
    copy: 'Vingt couverts seulement. La table ne cherche pas à être vue : elle laisse une assiette, un verre et la chaleur du bois faire le travail. À côté, la cuisine existe par la vapeur et la précision de ses gestes.',
    image: '/images/restaurant/cabinet-table-v4.webp',
    alt: 'Table du Cabinet à la Maison Saint-Jules',
    next: { label: 'Passer aux bains', href: ROUTES.bains },
    details: [
      'Vingt couverts',
      'Cuisine française de saison',
      'Service attentif, présence discrète',
    ],
    quote: 'Le service juste se reconnaît à tout ce qu’il n’interrompt pas.',
    gallery: [
      {
        image: '/images/restaurant/le-cabinet.webp',
        alt: 'La salle intime du Cabinet avant le service',
        caption: 'Avant · vingt places, aucune table anonyme',
      },
      {
        image: '/images/restaurant/cabinet-table-v4.webp',
        alt: 'Détail d’une table dressée au Cabinet',
        caption: 'Le geste · verre fin, métal mat, linge franc',
      },
      {
        image: '/images/hotel/salon-dusk.webp',
        alt: 'Le salon où prolonger le dîner',
        caption: 'Après · la conversation change de pièce',
      },
    ],
    moments: [
      {
        time: '19 h 28',
        title: 'Le premier verre',
        copy: 'Le froid du cristal précède le goût. La table reste presque nue.',
      },
      {
        time: '20 h 16',
        title: 'Le feu',
        copy: 'Une cuisson, une sauce, un légume : la saison n’est jamais traduite en décor.',
      },
      {
        time: '22 h 04',
        title: 'La dernière assiette',
        copy: 'Le service ralentit avant vous et laisse la soirée trouver sa sortie.',
      },
    ],
    signature: {
      label: 'Nombre de couverts',
      value: '20',
      note: 'La juste distance entre une table vivante et une salle privée.',
    },
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
    quote:
      'Le jardin n’est pas une destination. C’est l’endroit où le parcours cesse d’insister.',
    gallery: [
      {
        image: '/images/hotel/jardin-apres-pluie.webp',
        alt: 'Le jardin intérieur après une averse',
        caption: 'Après la pluie · chaque vert reprend sa profondeur',
      },
      {
        image: '/images/suites/suite-jardin-cover.webp',
        alt: 'La suite ouverte sur le jardin intérieur',
        caption: 'Depuis la chambre · le dehors entre sans bruit',
      },
      {
        image: '/images/suites/suite-jardin-salon-v4.webp',
        alt: 'Le salon au bord du jardin',
        caption: 'À la lisière · rester dedans et respirer dehors',
      },
    ],
    moments: [
      {
        time: '07 h 12',
        title: 'La rosée',
        copy: 'Les pierres sont froides. Le feuillage tient encore la lumière basse.',
      },
      {
        time: '14 h 35',
        title: 'L’ombre',
        copy: 'L’érable déplace lentement une tache fraîche sur le mur.',
      },
      {
        time: '19 h 02',
        title: 'L’eau',
        copy: 'La fontaine devient plus audible quand la Maison commence à parler moins fort.',
      },
    ],
    signature: {
      label: 'Distance à la fontaine',
      value: '12 pas',
      note: 'Elle est entendue avant d’être entièrement découverte.',
    },
  },
  matin: {
    title: 'Le Matin',
    eyebrow: 'VI · Le jour',
    line: 'La Maison s’ouvre avant que Paris ne s’accélère.',
    copy: 'Les voilages bougent à peine. Une fenêtre côté jardin laisse entrer l’air frais. Le premier café arrive sans horloge et la lumière trouve, une à une, les traces de la veille.',
    image: '/images/suites/chambre-signature-morning-v4.webp',
    alt: 'Suite de la Maison baignée de lumière du matin',
    next: { label: 'Attendre la nuit', href: ROUTES.nuit },
    details: ['Lumière à 3900 K', 'Lin, papier, café', 'Paris encore au loin'],
    quote: 'Le matin est le seul luxe qui recommence sans se répéter.',
    gallery: [
      {
        image: '/images/suites/chambre-signature-morning-v4.webp',
        alt: 'Une chambre traversée par la lumière du matin',
        caption: '07 h 21 · le jour touche d’abord le lin',
      },
      {
        image: '/images/suites/suite-jardin-cover.webp',
        alt: 'Le lit d’une suite ouvert sur le jardin',
        caption: '08 h 03 · le jardin entre dans la chambre',
      },
      {
        image: '/images/restaurant/cabinet-table-v4.webp',
        alt: 'Une table prête pour le premier café',
        caption: '08 h 36 · le café arrive sans interrompre',
      },
    ],
    moments: [
      {
        time: '06 h 48',
        title: 'Ouvrir',
        copy: 'Les voilages prennent l’air avant que la Maison ne prenne la parole.',
      },
      {
        time: '07 h 32',
        title: 'Goûter',
        copy: 'Pain encore tiède, beurre franc, fruit coupé au dernier moment.',
      },
      {
        time: '09 h 10',
        title: 'Sortir',
        copy: 'La porte rend Paris à un visiteur qui ne marche déjà plus au même rythme.',
      },
    ],
    signature: {
      label: 'Lumière du matin',
      value: '3 900 K',
      note: 'Blanche sur le papier, chaude lorsqu’elle traverse le lin.',
    },
  },
  nuit: {
    title: 'La Nuit',
    eyebrow: 'VII · Après 22 h',
    line: 'La lumière ne disparaît pas. Elle choisit où rester.',
    copy: 'Lorsque le jardin devient sombre, les lampes ne remplacent pas le jour : elles redessinent les distances. Le laiton capte un reflet, une fenêtre devient un cadre et la Maison semble n’appartenir qu’à ceux qui y restent.',
    image: '/images/suites/appartement-delacroix-terrace-v4.webp',
    alt: 'Salon de la Maison à la lumière du soir',
    next: { label: 'Composer un séjour', href: ROUTES.experiences },
    details: [
      'Ambre à 2400 K',
      'Ombres lisibles',
      'La ville devient une rumeur',
    ],
    quote:
      'La nuit ne cache pas la Maison. Elle révèle ce qu’elle choisit de garder.',
    gallery: [
      {
        image: '/images/hotel/salon-dusk.webp',
        alt: 'Le salon dans la lumière profonde du soir',
        caption: 'Le salon · le bois devient presque noir',
      },
      {
        image: '/images/suites/appartement-delacroix-terrace-v4.webp',
        alt: 'Une terrasse privée éclairée dans la nuit',
        caption: 'La terrasse · Paris reste à distance',
      },
      {
        image: '/images/hotel/threshold-dawn.webp',
        alt: 'La Maison éclairée depuis la rue',
        caption: 'Dehors · une seule fenêtre suffit',
      },
    ],
    moments: [
      {
        time: '20 h 41',
        title: 'Allumer',
        copy: 'Les lampes construisent des îlots ; les plafonds ont le droit de disparaître.',
      },
      {
        time: '22 h 17',
        title: 'Ralentir',
        copy: 'Le pas du personnel se fait plus rare, les portes se ferment sans claquer.',
      },
      {
        time: '00 h 08',
        title: 'Garder',
        copy: 'Une veilleuse, le reflet du jardin et l’eau posée près du lit.',
      },
    ],
    signature: {
      label: 'Lumière après 22 h',
      value: '2 400 K',
      note: 'Une présence ambrée qui ne tente jamais de refaire le jour.',
    },
  },
  experiences: {
    title: 'Les Expériences',
    eyebrow: 'VIII · Les gestes',
    line: 'Une journée ne se remplit pas. Elle se compose.',
    copy: 'Petit-déjeuner à la fenêtre, quelques pages dans le salon, bain lent, promenade sans itinéraire, voiture préparée, Paris retrouvé au bon moment. La conciergerie ne vend pas un programme : elle enlève les frictions.',
    image: '/images/suites/suite-jardin-salon-v4.webp',
    alt: 'Suite de la Maison Saint-Jules',
    next: { label: 'Lire le journal', href: ROUTES.journal },
    details: ['Petit-déjeuner', 'Lecture et bain', 'Conciergerie et Paris'],
    quote:
      'Une expérience réussie laisse un souvenir précis et un emploi du temps flou.',
    gallery: [
      {
        image: '/images/suites/suite-jardin-salon-v4.webp',
        alt: 'Un salon calme préparé pour la lecture',
        caption: 'Lire · une heure protégée du programme',
      },
      {
        image: '/images/spa/baths-still.webp',
        alt: 'Le bassin des Bains dans le silence',
        caption: 'S’immerger · changer de température et d’échelle',
      },
      {
        image: '/images/hotel/threshold-dawn.webp',
        alt: 'La rue de Paris au départ de la Maison',
        caption: 'Sortir · Paris, choisi plutôt que subi',
      },
    ],
    moments: [
      {
        time: 'Matin',
        title: 'À la fenêtre',
        copy: 'Le petit-déjeuner se compose autour de la lumière, pas autour d’un horaire imposé.',
      },
      {
        time: 'Après-midi',
        title: 'Sans itinéraire',
        copy: 'Une adresse, une voiture si nécessaire, et assez de vide pour bifurquer.',
      },
      {
        time: 'Soir',
        title: 'Revenir',
        copy: 'La clé est reconnue. Le bain ou la table attendent sans devenir une obligation.',
      },
    ],
    signature: {
      label: 'Principe de conciergerie',
      value: 'Moins',
      note: 'Moins d’options présentées, davantage de justesse dans chaque proposition.',
    },
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
    quote:
      'Ce qui mérite d’être conservé est souvent ce que personne n’avait pensé à annoncer.',
    gallery: [
      {
        image: '/images/hotel/vestibule-rain-v4.webp',
        alt: 'Un détail architectural du vestibule',
        caption: 'Architecture · la poignée qui règle la première seconde',
      },
      {
        image: '/images/restaurant/le-cabinet.webp',
        alt: 'La table du Cabinet en préparation',
        caption: 'Cuisine · ce que la saison change dans le geste',
      },
      {
        image: '/images/hotel/jardin-apres-pluie.webp',
        alt: 'Le jardin observé après la pluie',
        caption: 'Saisons · le même cadre, jamais la même matière',
      },
    ],
    moments: [
      {
        time: 'Note 01',
        title: 'La pierre et l’eau',
        copy: 'Pourquoi la façade devient plus présente lorsqu’il pleut.',
      },
      {
        time: 'Note 02',
        title: 'Servir sans interrompre',
        copy: 'Les gestes appris par le personnel quand une conversation doit durer.',
      },
      {
        time: 'Note 03',
        title: 'Le jardin en novembre',
        copy: 'Ce qui reste quand les feuilles ne sont plus là pour séduire.',
      },
    ],
    signature: {
      label: 'Rythme éditorial',
      value: 'Saisonnier',
      note: 'Publier uniquement lorsqu’un détail nouveau mérite réellement d’être gardé.',
    },
  },
} satisfies Record<string, WorldChapter>;
