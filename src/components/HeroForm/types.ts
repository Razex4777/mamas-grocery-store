export interface SlideData {
  id: number;
  headline: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

export interface HeroFormProps {
  autoPlayInterval?: number; // Default: 5500ms
  transitionDuration?: number; // Default: 4000ms
  className?: string;
}

export interface SlideContentProps {
  slide: SlideData;
  isActive: boolean;
  imageLoaded?: boolean;
}

export interface NavigationControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideSelect: (index: number) => void;
}

export interface FloatingShapesProps {
  className?: string;
}

export interface AnimationConfig {
  slideTransition: {
    duration: number;
    ease: string;
  };
  textStagger: {
    delayChildren: number;
    staggerChildren: number;
  };
  textEntrance: {
    initial: { x: number; opacity: number };
    animate: { x: number; opacity: number };
    transition: { duration: number; ease: string };
  };
}