import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { CategoryShowcaseProps, CategoryItem } from './types';
import { CATEGORIES } from './constants';

const CategoryCard: React.FC<{ category: CategoryItem }> = ({ category }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-64 sm:w-72 lg:w-80 mx-4 group cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Image Container with Squircle Shape */}
        <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden bg-gray-100 rounded-t-3xl">
          <motion.img
            src={category.imageSrc}
            alt={category.imageAlt}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Orange VOIR PLUS Button */}
            <motion.button
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-orange-600 transition-colors duration-200 shadow-xl"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              whileTap={{ scale: 0.95 }}
            >
              VOIR PLUS
            </motion.button>
          </motion.div>
        </div>
        
        {/* Text Content */}
        <div className="p-6 text-center bg-gray-50">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
            {category.name}
          </h3>
          <p className="text-sm lg:text-base text-gray-600 font-medium">
            {category.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CATEGORIES.length);
    }, 4000); // 4 seconds pause between slides

    return () => clearInterval(interval);
  }, [isPaused]);

  // Calculate how many cards to show based on screen size
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3; // Desktop: 3 cards
    if (window.innerWidth >= 640) return 2;  // Tablet: 2 cards
    return 1; // Mobile: 1 card
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create extended array for seamless looping
  const extendedCategories = [...CATEGORIES, ...CATEGORIES];
  
  // Calculate the translateX value
  const cardWidth = 320; // Approximate card width including margins
  const translateX = -(currentIndex * cardWidth);

  return (
    <div 
      className={`relative z-50 ${className}`}
      style={{
        marginTop: '-120px',
        marginBottom: '-120px'
      }}
    >
      {/* Stepped Marquee Container */}
      <div 
        className="relative overflow-hidden py-8 sm:py-12 lg:py-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Horizontally Sliding Categories with Drag */}
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          animate={{
            x: translateX
          }}
          drag="x"
          dragConstraints={{
            left: -(extendedCategories.length - cardsPerView) * cardWidth,
            right: 0
          }}
          dragElastic={0.1}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={(_, info) => {
            setIsPaused(false);
            
            // Calculate which index to snap to based on drag distance
            const dragDistance = info.offset.x;
            const threshold = cardWidth / 3;
            
            if (Math.abs(dragDistance) > threshold) {
              if (dragDistance > 0 && currentIndex > 0) {
                // Dragged right, go to previous
                setCurrentIndex(currentIndex - 1);
              } else if (dragDistance < 0 && currentIndex < CATEGORIES.length - 1) {
                // Dragged left, go to next
                setCurrentIndex(currentIndex + 1);
              }
            }
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        >
          {extendedCategories.map((category, index) => (
            <CategoryCard
              key={`${category.id}-${index}`}
              category={category}
            />
          ))}
        </motion.div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {CATEGORIES.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>


      </div>
    </div>
  );
};

export default CategoryShowcase;