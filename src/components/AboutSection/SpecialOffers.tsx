import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import type { SpecialOffersProps } from './types';
import { SPECIAL_OFFERS } from './constants';

// Card component for desktop
const DesktopCard: React.FC<{ offer: any; index: number }> = ({ offer, index }) => (
  <>
    {/* Circular Flag Image Container */}
    <motion.div
      className="relative w-44 h-44 sm:w-48 sm:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 overflow-hidden rounded-full shadow-2xl"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.6, ease: "easeOut" }
      }}
    >
      <img
        src={offer.backgroundImageSrc}
        alt={`${offer.title} flag background`}
        className="w-full h-full object-cover"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500 rounded-full" />
      {/* Hover brightness effect */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 rounded-full" />

      {/* Hover overlay effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
      />
    </motion.div>

    {/* Text Content Below Circle */}
    <div className="mt-4 text-center">
      {/* Main Title */}
      <motion.h3
        className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold leading-tight text-white mb-2"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { delay: index * 0.2 + 0.4, duration: 0.6 }
        }}
        viewport={{ once: true }}
      >
        {offer.title}
      </motion.h3>

      {/* Subtitle */}
      <motion.p
        className="text-sm sm:text-base lg:text-lg font-semibold text-gray-300"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { delay: index * 0.2 + 0.5, duration: 0.6 }
        }}
        viewport={{ once: true }}
      >
        {offer.price}
      </motion.p>
    </div>

    {/* Product Image Below Text */}
    <motion.div
      className="mt-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
      initial={{
        scale: 0.7,
        y: 50,
        opacity: 0
      }}
      whileInView={{
        scale: 1,
        y: 0,
        opacity: 1,
        transition: {
          delay: index * 0.2 + 0.8,
          duration: 0.8,
          ease: "easeOut"
        }
      }}
      whileHover={{
        scale: 1.1,
        y: -10,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      viewport={{ once: true }}
      style={{
        filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.6))"
      }}
    >
      <img
        src={offer.imageSrc}
        alt={offer.imageAlt}
        className="w-full h-full object-contain"
      />

      {/* Subtle floating animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          y: [-2, 2, -2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.7
        }}
      />
    </motion.div>
  </>
);

// Card component for mobile (smaller size)
const MobileCard: React.FC<{ offer: any; index: number }> = ({ offer }) => (
  <>
    {/* Circular Flag Image Container - Mobile size */}
    <motion.div
      className="relative w-40 h-40 overflow-hidden rounded-full shadow-2xl"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.6, ease: "easeOut" }
      }}
    >
      <img
        src={offer.backgroundImageSrc}
        alt={`${offer.title} flag background`}
        className="w-full h-full object-cover"
      />
      {/* Light overlay for better visibility */}
      <div className="absolute inset-0 bg-black/30 rounded-full" />
    </motion.div>

    {/* Text Content Below Circle */}
    <div className="mt-3 text-center">
      {/* Main Title */}
      <h3
        className="text-sm font-bold leading-tight text-white mb-1"
      >
        {offer.title}
      </h3>

      {/* Subtitle */}
      <p
        className="text-xs font-semibold text-gray-300"
      >
        {offer.price}
      </p>
    </div>

    {/* Product Image Below Text - Mobile size */}
    <motion.div
      className="mt-3 w-12 h-12"
      style={{
        filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.6))"
      }}
    >
      <img
        src={offer.imageSrc}
        alt={offer.imageAlt}
        className="w-full h-full object-contain"
      />
    </motion.div>
  </>
);

const SpecialOffers: React.FC<SpecialOffersProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate card width for mobile drag
  const cardWidth = 200; // Approximate card width including margins
  const maxIndex = Math.max(0, SPECIAL_OFFERS.length - 2); // Show 2 cards on mobile

  return (
    <section className={`${className}`}>
      {/* Dark background for the entire section */}
      <div className="bg-gray-900 py-16 lg:py-24">
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.6 }
            }}
            viewport={{ once: true }}
          >
            Produits Authentiques
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{
              scaleX: 1,
              transition: { delay: 0.3, duration: 0.6 }
            }}
            viewport={{ once: true }}
          />
        </div>

        {/* Circular cards layout - Desktop: 5 cards, Mobile: draggable */}
        <div className="container mx-auto px-4">
          {isMobile ? (
            /* Mobile: Draggable carousel */
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{
                  x: `${-currentIndex * cardWidth}px`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                drag="x"
                dragElastic={0.1}
                dragConstraints={{
                  left: -(maxIndex * cardWidth),
                  right: 0
                }}
                onDragEnd={(_, info) => {
                  const threshold = cardWidth * 0.3;
                  const delta = info.offset.x;

                  if (delta < -threshold && currentIndex < maxIndex) {
                    setCurrentIndex(currentIndex + 1);
                  } else if (delta > threshold && currentIndex > 0) {
                    setCurrentIndex(currentIndex - 1);
                  }
                }}
                style={{ cursor: 'grab' }}
                whileDrag={{ cursor: 'grabbing' }}
              >
                {SPECIAL_OFFERS.map((offer, index) => (
                  <motion.div
                    key={offer.id}
                    className="flex flex-col items-center group cursor-pointer flex-shrink-0"
                    style={{ width: `${cardWidth}px` }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {/* Mobile card content - same as desktop but in draggable container */}
                    <MobileCard offer={offer} index={index} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile dots indicator */}
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex
                      ? 'bg-yellow-400'
                      : 'bg-gray-500 hover:bg-gray-400'
                      }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Desktop: All 5 cards in one line */
            <div className="flex justify-center items-center gap-3 lg:gap-4 xl:gap-6">
              {SPECIAL_OFFERS.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  className="flex flex-col items-center group cursor-pointer flex-shrink-0"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: index * 0.2,
                      ease: "easeOut"
                    }
                  }}
                  viewport={{ once: true }}
                >
                  <DesktopCard offer={offer} index={index} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;