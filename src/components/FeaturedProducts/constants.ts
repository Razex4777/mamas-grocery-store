import type { FeaturedProduct } from './types';

// Wholesale-focused product data for professional buyers
export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 'p1',
    title: 'Couscous Dari Premium',
    category: 'Grains',
    priceDisplay: '5,49 $',
    wholesalePrice: '4,20 $',
    minOrderQty: 50,
    imageSrc: '/featured-products/tunisian-couscous.png',
    description: 'Couscous premium de qualité supérieure, idéal pour restaurants',
    inStock: true,
    origin: 'Tunisie'
  },
  {
    id: 'p2',
    title: 'Maruja Lait et Amandes',
    category: 'Chocolat',
    priceDisplay: '3,99 $',
    wholesalePrice: '2,85 $',
    minOrderQty: 100,
    imageSrc: '/featured-products/moroccan-tagine.png',
    description: 'Chocolat artisanal aux amandes, parfait pour épiceries fines',
    inStock: true,
    origin: 'Maroc'
  },
  {
    id: 'p3',
    title: "Huile d'Olive Salma Extra Vierge",
    category: 'Huiles',
    priceDisplay: '15,99 $',
    wholesalePrice: '12,50 $',
    minOrderQty: 24,
    imageSrc: '/about/basket-algerian.png',
    description: 'Huile d\'olive extra vierge première pression à froid',
    inStock: true,
    origin: 'Algérie'
  },
  {
    id: 'p4',
    title: 'Jus de Pomme Rowiba Bio',
    category: 'Boissons',
    priceDisplay: '4,49 $',
    wholesalePrice: '3,20 $',
    minOrderQty: 48,
    imageSrc: '/featured-products/algerian-chakchouka.png',
    description: 'Jus de pomme biologique 100% naturel sans additifs',
    inStock: false,
    origin: 'Algérie'
  },
  {
    id: 'p5',
    title: 'Flan Delicio Caramel',
    category: 'Desserts',
    priceDisplay: '2,99 $',
    wholesalePrice: '2,10 $',
    minOrderQty: 72,
    imageSrc: '/about/basket-moroccan.png',
    description: 'Flan au caramel traditionnel, longue conservation',
    inStock: true,
    origin: 'Maroc'
  },
  {
    id: 'p6',
    title: 'Thé Vert Menthe Atlas',
    category: 'Boissons',
    priceDisplay: '8,99 $',
    wholesalePrice: '6,50 $',
    minOrderQty: 30,
    imageSrc: '/about/basket-tunisian.png',
    description: 'Thé vert premium aux feuilles de menthe fraîche',
    inStock: true,
    origin: 'Maroc'
  },
  {
    id: 'p7',
    title: 'Harissa Traditionnelle Forte',
    category: 'Épices',
    priceDisplay: '6,99 $',
    wholesalePrice: '4,99 $',
    minOrderQty: 60,
    imageSrc: '/hero_form/tunisian-couscous.png',
    description: 'Harissa artisanale préparée selon la recette traditionnelle',
    inStock: true,
    origin: 'Tunisie'
  },
  {
    id: 'p8',
    title: 'Miel d\'Acacia Sahara',
    category: 'Épicerie Fine',
    priceDisplay: '18,99 $',
    wholesalePrice: '14,50 $',
    minOrderQty: 20,
    imageSrc: '/hero_form/moroccan-tagine.png',
    description: 'Miel pur d\'acacia récolté dans les oasis du Sahara',
    inStock: true,
    origin: 'Algérie'
  }
];

