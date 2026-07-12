import type { Restaurant } from '@/hotel/types';

export const restaurant: Restaurant = {
  name: 'Le Cabinet',
  cuisine: 'Cuisine française contemporaine',
  chef: {
    name: 'Augustin Lévêque',
    title: 'Chef exécutif',
  },
  description:
    'Une table confidentielle de vingt couverts. Le chef Augustin Lévêque compose une cuisine de saison, précise et sincère, au plus près des producteurs. Un dîner comme une conversation.',
  image: {
    src: '/images/suites/suite-jardin-cover.webp',
    alt: 'Table dressée au restaurant Le Cabinet',
    category: 'restaurant',
  },
} as const;
