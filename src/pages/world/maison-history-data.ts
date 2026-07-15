export const maisonHistory = {
  introduction: {
    eyebrow: 'Une demeure, cinq strates',
    title: 'La Maison n’a jamais été remise à neuf.',
    copy: 'Elle a été relue. Chaque intervention devait laisser comprendre ce qui existait avant elle : l’usure d’un passage, la profondeur d’une ancienne porte, une différence de pierre que personne n’a cherché à maquiller.',
  },
  eras: [
    {
      year: '1878',
      title: 'Une maison pour les livres',
      copy: 'Jules Delacroix, éditeur et collectionneur, fait élever une demeure de trois travées entre rue et jardin. Il demande un salon assez profond pour lire près du feu, mais refuse l’escalier d’apparat visible depuis l’entrée.',
      trace:
        'Aujourd’hui : le vestibule reste volontairement étroit ; le salon ne se découvre qu’après le second seuil.',
    },
    {
      year: '1908',
      title: 'Le jeudi de Madeleine',
      copy: 'Madeleine Delacroix ouvre la bibliothèque chaque jeudi à des traducteurs, graveurs et écrivains. Les conversations quittent progressivement le salon pour gagner la table puis le jardin.',
      trace:
        'Aujourd’hui : les pièces communiquent sans grand axe central. Une soirée peut changer d’espace sans jamais être interrompue.',
    },
    {
      year: '1936',
      title: 'Le jardin devient une pièce',
      copy: 'Éléonore, leur petite-fille, remplace la remise du fond de parcelle par une aile basse. Une fontaine est placée hors de l’axe : on doit l’entendre avant de pouvoir la voir.',
      trace:
        'Aujourd’hui : l’eau demeure invisible depuis la rue et guide les douze derniers pas vers le jardin.',
    },
    {
      year: '1974',
      title: 'La Maison se retire',
      copy: 'Les grandes réceptions cessent. Les pièces continuent d’être habitées, mais certaines portes restent fermées pendant des années. Le bois fonce, le laiton perd son éclat, la pierre se creuse au centre du vestibule.',
      trace:
        'Aujourd’hui : aucune patine n’a été uniformisée. Les marques d’usage ont été consolidées, jamais rejouées.',
    },
    {
      year: '2024',
      title: 'Hospitalité, sans effacement',
      copy: 'La restauration transforme la demeure en Maison d’hospitalité. Onze clés sont créées, les circulations de service sont rétablies et les Bains prennent place dans l’aile du jardin.',
      trace:
        'Aujourd’hui : le confort est contemporain, mais tout ce qui le produit — acoustique, air, technique — demeure hors champ.',
    },
  ],
  levels: [
    {
      level: 'Sous la Maison',
      name: 'L’invisible',
      spaces: 'Cuisine de préparation · cave · lingerie · réserves',
      purpose:
        'Le personnel peut préparer, réparer et circuler sans transformer l’attention portée au visiteur en spectacle.',
    },
    {
      level: 'Rez-de-chaussée',
      name: 'Recevoir',
      spaces: 'Vestibule · bibliothèque · salon · Le Cabinet',
      purpose:
        'La rue est comprimée par deux seuils, puis le plafond et la lumière s’ouvrent progressivement vers le jardin.',
    },
    {
      level: 'Premier étage',
      name: 'Habiter',
      spaces: 'Grandes suites · salon privé · office d’étage',
      purpose:
        'Les chambres les plus hautes donnent sur les arbres ; les portes sont décalées pour qu’aucun lit ne soit visible depuis le couloir.',
    },
    {
      level: 'Deuxième étage',
      name: 'Se retirer',
      spaces: 'Chambres mansardées · pièce du matin · bibliothèque haute',
      purpose:
        'Les volumes deviennent plus bas et plus personnels. Paris revient par fragments entre les toits.',
    },
    {
      level: 'Aile du jardin',
      name: 'Ralentir',
      spaces: 'Suite Jardin · Les Bains · cour humide',
      purpose:
        'La pierre, l’eau et le végétal remplacent les signes domestiques. C’est le point le plus éloigné de la rue.',
    },
  ],
  restoration: {
    eyebrow: 'Doctrine de restauration',
    title: 'Conserver la durée. Remplacer le bruit.',
    copy: 'La restauration n’a pas cherché l’image supposée de 1878. Elle a protégé les proportions, les usages et les traces qui rendent encore la Maison lisible.',
    kept: [
      'La pierre creusée au centre du vestibule',
      'Les boiseries de noyer et leurs différences de teinte',
      'Les poignées dépareillées des pièces privées',
      'Le parquet légèrement infléchi devant la bibliothèque',
    ],
    hidden: [
      'L’isolation acoustique entre les onze chambres',
      'Le renouvellement d’air à faible vitesse',
      'Les réseaux d’eau et la régulation des Bains',
      'Les circulations et offices réservés au personnel',
    ],
    refused: [
      'Les moulures ajoutées pour paraître anciennes',
      'Le laiton miroir et les marbres sans provenance',
      'La diffusion permanente d’un parfum signature',
      'La lumière uniforme qui efface les heures du jour',
    ],
  },
  unseen: {
    eyebrow: 'La Maison sans visiteur',
    title: 'Elle existe avant votre arrivée et après votre départ.',
    before: {
      time: '05 h 52 — avant',
      copy: 'Le jardinier relève l’eau tombée pendant la nuit. Les voilages côté est sont ouverts en premier. La pierre du vestibule est laissée légèrement fraîche ; la lumière du salon ne sera allumée que si le ciel l’exige.',
    },
    after: {
      time: '00 h 18 — après',
      copy: 'Le dernier verre quitte la bibliothèque. Les braises sont séparées, les objets trouvés consignés, les Bains remis au repos. Une lampe reste allumée sous l’escalier pour la personne qui pourrait encore rentrer.',
    },
  },
} as const;
