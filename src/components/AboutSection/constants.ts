<<<<<<< HEAD
import type { SpecialOfferCard, FeatureBox } from './types';

export const SPECIAL_OFFERS: SpecialOfferCard[] = [
  {
    id: 1,
    title: "Produits Marocains",
    price: "Vaste Sélection",
    backgroundColor: "bg-red-600", // This can act as a fallback color
    imageSrc: "/about/basket-moroccan.png", // The NEW foreground image (basket)
    backgroundImageSrc: "/about/flag-moroccan.png", // The NEW background image (flag)
    imageAlt: "Panier de produits marocains"
  },
  {
    id: 2,
    title: "Produits Algériens",
    price: "Vaste Sélection",
    backgroundColor: "bg-gray-900",
    imageSrc: "/about/basket-algerian.png", // The NEW foreground image (basket)
    backgroundImageSrc: "/about/flag-algerian.png", // The NEW background image (flag)
    imageAlt: "Panier de produits algériens"
  },
  {
    id: 3,
    title: "Produits Tunisiens",
    price: "Vaste Sélection",
    backgroundColor: "bg-orange-600",
    imageSrc: "/about/basket-tunisian.png", // The NEW foreground image (basket)
    backgroundImageSrc: "/about/flag-tunisian.png", // The NEW background image (flag)
    imageAlt: "Panier de produits tunisiens"
  },
  {
    id: 4,
    title: "Produits Orientaux",
    price: "Vaste Sélection",
    backgroundColor: "bg-blue-600",
    imageSrc: "/about/basket-oriental.png", // Oriental basket
    backgroundImageSrc: "/about/orient-map.png", // Orient map as background
    imageAlt: "Panier de produits orientaux"
  },
  {
    id: 5,
    title: "Produits Africains",
    price: "Vaste Sélection",
    backgroundColor: "bg-green-600",
    imageSrc: "/about/basket-african.png", // African basket
    backgroundImageSrc: "/about/africa-map.png", // Africa map as background
    imageAlt: "Panier de produits africains"
  }
];

export const FEATURE_BOXES: FeatureBox[] = [
  {
    id: 1,
    icon: "📦",
    title: "Vaste Sélection",
    description: "Des produits authentiques du Maroc, de l'Algérie, et de la Tunisie."
  },
  {
    id: 2,
    icon: "🚛",
    title: "Distribution Efficace",
    description: "Nous assurons une logistique fiable et rapide à travers le Canada."
  }
];

export const MARQUEE_ITEMS = [
  "PRODUITS MAROCAINS",
  "SPÉCIALITÉS ALGÉRIENNES",
  "DÉLICES TUNISIENS",
  "ÉPICES ORIENTALES",
  "CONSERVES AUTHENTIQUES",
  "PÂTISSERIES TRADITIONNELLES",
  "THÉS ET INFUSIONS"
];

export const ABOUT_CONTENT = {
  subtitle: "À PROPOS DE NOUS",
  title: "L'élite des produits orientaux à votre portée.",
  description: "Nous distribuons des ingrédients de plus haute qualité à travers Canada. Notre vision porte l'accent sur la recherche afin de développer des produits qui se démarquent, autant en qualité et accessibilité.",
  imageSrc: "/about/products-wooden-table.png",
  imageAlt: "Produits orientaux sur table en bois avec arrière-plan champêtre"
};

export const ORIENT_SECTION = {
  title: "Voyage Oriental – Votre",
  titleSecondLine: "Passerelle vers l'Orient",
  description: "Découvrez nos produits authentiques importés directement du Maroc, d'Algérie et de Tunisie. Savourez les saveurs, les arômes et la culture culinaire du Grand Maghreb dans chaque bouchée.",
  tagline: "Plus que des produits... c'est un voyage culinaire.",
  additionalText: [
    "Nous importons soigneusement les meilleurs produits des marchés traditionnels et des producteurs locaux du Maghreb pour vous offrir une expérience gustative authentique.",
    "De l'huile d'olive premium aux épices rares, en passant par les pâtisseries traditionnelles et les conserves artisanales, chaque produit raconte l'histoire de son terroir d'origine."
  ],
  mapImageSrc: "/about/orient-map.png",
  mapImageAlt: "Carte de l'Orient - Maroc, Algérie, Tunisie"
};

export const AFRICA_SECTION = {
  title: "Saveurs d'Afrique – Notre",
  titleSecondLine: "Sélection Continentale",
  description: "Nous importons également des produits authentiques d'autres pays africains. Explorez la richesse culinaire du continent africain avec nos spécialités soigneusement sélectionnées.",
  tagline: "L'Afrique dans votre assiette... une diversité infinie.",
  additionalText: [
    "Du Sénégal à l'Éthiopie, en passant par la Côte d'Ivoire et le Kenya, nous collaborons avec des producteurs locaux pour vous offrir des produits authentiques et de qualité supérieure.",
    "Découvrez les épices éthiopiennes, les cafés africains premium, les fruits séchés du Burkina Faso, et bien d'autres trésors culinaires du continent africain."
  ],
  mapImageSrc: "/about/africa-map.png",
  mapImageAlt: "Carte de l'Afrique - Autres pays africains"
=======
import type { SpecialOfferCard, FeatureBox } from './types';

export const SPECIAL_OFFERS: SpecialOfferCard[] = [
  {
    id: 1,
    title: "Produits Marocains",
    price: "Vaste Sélection",
    backgroundColor: "bg-red-600", // This can act as a fallback color
    imageSrc: "/about/basket-moroccan.png", // The NEW foreground image (basket)
    backgroundImageSrc: "/about/flag-moroccan.png", // The NEW background image (flag)
    imageAlt: "Panier de produits marocains"
  },
  {
    id: 2,
    title: "Produits Algériens",
    price: "Vaste Sélection",
    backgroundColor: "bg-gray-900",
    imageSrc: "/about/basket-algerian.png", // The NEW foreground image (basket)
    backgroundImageSrc: "/about/flag-algerian.png", // The NEW background image (flag)
    imageAlt: "Panier de produits algériens"
  },
  {
    id: 3,
    title: "Produits Tunisiens",
    price: "Vaste Sélection",
    backgroundColor: "bg-orange-600",
    imageSrc: "/about/basket-tunisian.png", // The NEW foreground image (basket)
    backgroundImageSrc: "/about/flag-tunisian.png", // The NEW background image (flag)
    imageAlt: "Panier de produits tunisiens"
  },
  {
    id: 4,
    title: "Produits Orientaux",
    price: "Vaste Sélection",
    backgroundColor: "bg-blue-600",
    imageSrc: "/about/basket-oriental.png", // Oriental basket
    backgroundImageSrc: "/about/orient-map.png", // Orient map as background
    imageAlt: "Panier de produits orientaux"
  },
  {
    id: 5,
    title: "Produits Africains",
    price: "Vaste Sélection",
    backgroundColor: "bg-green-600",
    imageSrc: "/about/basket-african.png", // African basket
    backgroundImageSrc: "/about/africa-map.png", // Africa map as background
    imageAlt: "Panier de produits africains"
  }
];

export const FEATURE_BOXES: FeatureBox[] = [
  {
    id: 1,
    icon: "📦",
    title: "Vaste Sélection",
    description: "Des produits authentiques du Maroc, de l'Algérie, et de la Tunisie."
  },
  {
    id: 2,
    icon: "🚛",
    title: "Distribution Efficace",
    description: "Nous assurons une logistique fiable et rapide à travers le Canada."
  }
];

export const MARQUEE_ITEMS = [
  "PRODUITS MAROCAINS",
  "SPÉCIALITÉS ALGÉRIENNES",
  "DÉLICES TUNISIENS",
  "ÉPICES ORIENTALES",
  "CONSERVES AUTHENTIQUES",
  "PÂTISSERIES TRADITIONNELLES",
  "THÉS ET INFUSIONS"
];

export const ABOUT_CONTENT = {
  subtitle: "À PROPOS DE NOUS",
  title: "L'élite des produits orientaux à votre portée.",
  description: "Nous distribuons des ingrédients de plus haute qualité à travers Canada. Notre vision porte l'accent sur la recherche afin de développer des produits qui se démarquent, autant en qualité et accessibilité.",
  imageSrc: "/about/products-wooden-table.png",
  imageAlt: "Produits orientaux sur table en bois avec arrière-plan champêtre"
};

export const ORIENT_SECTION = {
  title: "Voyage Oriental – Votre",
  titleSecondLine: "Passerelle vers l'Orient",
  description: "Découvrez nos produits authentiques importés directement du Maroc, d'Algérie et de Tunisie. Savourez les saveurs, les arômes et la culture culinaire du Grand Maghreb dans chaque bouchée.",
  tagline: "Plus que des produits... c'est un voyage culinaire.",
  additionalText: [
    "Nous importons soigneusement les meilleurs produits des marchés traditionnels et des producteurs locaux du Maghreb pour vous offrir une expérience gustative authentique.",
    "De l'huile d'olive premium aux épices rares, en passant par les pâtisseries traditionnelles et les conserves artisanales, chaque produit raconte l'histoire de son terroir d'origine."
  ],
  mapImageSrc: "/about/orient-map.png",
  mapImageAlt: "Carte de l'Orient - Maroc, Algérie, Tunisie"
};

export const AFRICA_SECTION = {
  title: "Saveurs d'Afrique – Notre",
  titleSecondLine: "Sélection Continentale",
  description: "Nous importons également des produits authentiques d'autres pays africains. Explorez la richesse culinaire du continent africain avec nos spécialités soigneusement sélectionnées.",
  tagline: "L'Afrique dans votre assiette... une diversité infinie.",
  additionalText: [
    "Du Sénégal à l'Éthiopie, en passant par la Côte d'Ivoire et le Kenya, nous collaborons avec des producteurs locaux pour vous offrir des produits authentiques et de qualité supérieure.",
    "Découvrez les épices éthiopiennes, les cafés africains premium, les fruits séchés du Burkina Faso, et bien d'autres trésors culinaires du continent africain."
  ],
  mapImageSrc: "/about/africa-map.png",
  mapImageAlt: "Carte de l'Afrique - Autres pays africains"
>>>>>>> f364477e1bf411dd22665f5070bbf41d1f473208
};