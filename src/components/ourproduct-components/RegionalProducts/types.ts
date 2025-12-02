export interface RegionalProduct {
  id: number;
  title: string;
  subtitle: string;
  backgroundColor: string;
  imageSrc: string;
  backgroundImageSrc: string;
  imageAlt: string;
  origin: string; // Origin key for filtering (e.g., 'Morocco', 'Algeria', etc.)
}

export interface RegionalProductsProps {
  className?: string;
}
