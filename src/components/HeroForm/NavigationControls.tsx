import React from 'react';
import { motion } from 'framer-motion';
import type { NavigationControlsProps } from './types';

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentSlide,
  totalSlides,
  onSlideSelect
}) => {
  return (
    <>
      {/* Vertical Pagination Indicators (hidden on small screens) */}
      <div className="hidden md:block absolute left-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-4">
          {Array.from({ length: totalSlides }, (_, index) => (
            <motion.button
              key={index}
              className={`relative w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 overflow-hidden group ${
                currentSlide === index
                  ? 'bg-white text-black shadow-lg shadow-white/30'
                  : 'bg-transparent hover:bg-white hover:bg-opacity-20'
              }`}
              onClick={() => onSlideSelect(index)}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ 
                scale: 1.15,
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)"
              }}
              whileTap={{ scale: 0.9 }}
              animate={currentSlide === index ? {
                boxShadow: [
                  "0 0 0px rgba(255, 255, 255, 0.4)",
                  "0 0 20px rgba(255, 255, 255, 0.6)",
                  "0 0 0px rgba(255, 255, 255, 0.4)"
                ]
              } : {}}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Ripple effect */}
              {currentSlide === index && (
                <motion.div
                  className="absolute inset-0 border-2 border-white rounded-full"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ 
                    scale: [1, 1.5, 2],
                    opacity: [1, 0.5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
              
              {/* Progress ring for active slide */}
              {currentSlide === index && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0deg, white 0deg, transparent 360deg)`,
                    mask: 'radial-gradient(circle, transparent 70%, black 70%)'
                  }}
                  animate={{
                    background: [
                      'conic-gradient(from 0deg, transparent 0deg, white 0deg, transparent 360deg)',
                      'conic-gradient(from 0deg, transparent 0deg, white 360deg, transparent 360deg)'
                    ]
                  }}
                  transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                />
              )}
              
              <span className="relative z-10">{index + 1}</span>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Prev/Next Controls removed for cleaner mobile */}
    </>
  );
};

export default NavigationControls;