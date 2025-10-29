import type { CategoryItem } from './types';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 1,
    name: "Épices",
    subtitle: "Plus de 50 produits",
    imageSrc: "/featured-products/moroccan-tagine.png",
    imageAlt: "Collection d'épices orientales"
  },
  {
    id: 2,
    name: "Huiles & Olives",
    subtitle: "Plus de 20 produits",
    imageSrc: "/featured-products/basket-moroccan.png",
    imageAlt: "Huiles d'olive et olives premium"
  },
  {
    id: 3,
    name: "Pâtes & Grains",
    subtitle: "Plus de 30 produits",
    imageSrc: "/featured-products/tunisian-couscous.png",
    imageAlt: "Pâtes et grains traditionnels"
  },
  {
    id: 4,
    name: "Boissons",
    subtitle: "Plus de 15 produits",
    imageSrc: "/featured-products/algerian-chakchouka.png",
    imageAlt: "Boissons traditionnelles du Maghreb"
  }
];

// Duplicate categories multiple times for seamless infinite scroll
export const INFINITE_CATEGORIES = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES, ...CATEGORIES];