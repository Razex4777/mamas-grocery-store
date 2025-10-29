export interface SpecialOfferCard {
  id: number;
  title: string;
  price: string;
  backgroundColor: string;
  imageSrc: string;
  backgroundImageSrc: string;
  imageAlt: string;
}

export interface FeatureBox {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface AboutSectionProps {
  className?: string;
}

export interface SpecialOffersProps {
  className?: string;
}

export interface AboutUsBlockProps {
  className?: string;
}

export interface ScrollingMarqueeProps {
  className?: string;
}

export interface ScrollToTopProps {
  className?: string;
}