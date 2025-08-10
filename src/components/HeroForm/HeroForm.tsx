import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { HeroFormProps } from './types';
import { SLIDES, DEFAULT_AUTO_PLAY_INTERVAL } from './constants';
import SlideContent from './SlideContent';
import NavigationControls from './NavigationControls';
import FloatingShapes from './FloatingShapes';

const HeroForm: React.FC<HeroFormProps> = ({
  autoPlayInterval = DEFAULT_AUTO_PLAY_INTERVAL,
  className = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(SLIDES.length).fill(false));
  const [hasError, setHasError] = useState(false);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = SLIDES.map((slide, index) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              setImagesLoaded(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
              resolve();
            };
            img.onerror = () => {
              console.warn(`Failed to load image: ${slide.imageSrc}`);
              setImagesLoaded(prev => {
                const newState = [...prev];
                newState[index] = true; // Mark as loaded even if failed
                return newState;
              });
              resolve(); // Don't reject to avoid breaking the entire component
            };
            img.src = slide.imageSrc;
          });
        });

        await Promise.all(imagePromises);
      } catch (error) {
        console.error('Error preloading images:', error);
        setHasError(true);
      }
    };

    preloadImages();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % SLIDES.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, currentSlide]);

  // Navigation functions that reset auto-play timer
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % SLIDES.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPreviousSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNextSlide();
          break;
        case ' ':
        case 'Enter':
          event.preventDefault();
          goToNextSlide();
          break;
        case '1':
          event.preventDefault();
          goToSlide(0);
          break;
        case '2':
          event.preventDefault();
          goToSlide(1);
          break;
        case '3':
          event.preventDefault();
          goToSlide(2);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);



  // Error boundary fallback
  if (hasError) {
    return (
      <section className={`relative w-full h-screen overflow-hidden bg-gray-900 flex items-center justify-center ${className}`}>
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">LES DÉLICES AUTHENTIQUES DU GRAND MAGHREB</h1>
          <p className="text-xl">Une expérience culinaire exceptionnelle vous attend</p>
          <button 
            className="mt-8 inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-colors duration-300"
            onClick={() => console.log('Navigate to catalog')}
          >
            VOIR LE CATALOGUE
          </button>
        </div>
      </section>
    );
  }

  return (
    <section 
      className={`relative w-full overflow-hidden ${className}`}
      role="banner"
      aria-label="Hero section showcasing Maghreb cuisine"
      tabIndex={0}
      aria-live="polite"
      aria-atomic="true"
      // Place hero immediately below the fixed navbar and ensure it fills
      // the remaining viewport height on desktop. The navbar height comes
      // from a CSS variable set by the header component.
      style={{
        // No top margin; page container already pads using navbar height
        minHeight: 'calc(100vh - var(--navbar-height, 112px))',
        height: 'calc(100vh - var(--navbar-height, 112px))',
      }}
    >
      {/* Fixed Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-gray-900"
        style={{
          backgroundImage: 'url(/hero_form/hero_background.png), linear-gradient(135deg, #1f2937 0%, #374151 100%)'
        }}
        aria-hidden="true"
      />
      
      {/* Semi-transparent Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/60"
        aria-hidden="true"
      />

      {/* Vignette edges - subtle green darkening towards borders */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 180px 60px rgba(0,100,0,0.4)' }}
        aria-hidden="true"
      />

      {/* Top/Bottom gradient fade for extra depth with green tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,100,0,0.25), rgba(0,100,0,0) 20%, rgba(0,100,0,0) 80%, rgba(0,100,0,0.3))',
        }}
        aria-hidden="true"
      />

      {/* Floating Decorative Shapes */}
      <FloatingShapes />

      {/* Brand Logo - Left Side */}
      <motion.div
        className="absolute top-8 left-1/3 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -30, scale: 0.8 }}
        animate={{ 
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { delay: 0.5, duration: 1, ease: "easeOut" }
        }}
        whileHover={{ 
          scale: 1.1,
          y: -5,
          transition: { duration: 0.3 }
        }}
      >
        <img 
          src="/logos/logo.png" 
          alt="Brand Logo" 
          className="h-32 lg:h-40 w-auto object-contain filter drop-shadow-2xl"
        />
      </motion.div>
      
      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Animated Slide Content */}
          <AnimatePresence mode="wait">
            <SlideContent
              key={currentSlide}
              slide={SLIDES[currentSlide]}
              isActive={true}
              imageLoaded={imagesLoaded[currentSlide]}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <NavigationControls
        currentSlide={currentSlide}
        totalSlides={SLIDES.length}
        onPrevious={goToPreviousSlide}
        onNext={goToNextSlide}
        onSlideSelect={goToSlide}
      />
    </section>
  );
};

export default HeroForm;