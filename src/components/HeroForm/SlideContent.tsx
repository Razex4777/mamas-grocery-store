import React from 'react';
import { motion } from 'framer-motion';
import type { SlideContentProps } from './types';

const SlideContent: React.FC<SlideContentProps> = ({
  slide,
  isActive,
  imageLoaded = true
}) => {
  if (!isActive) return null;

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: "easeInOut"
      }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center h-full max-w-7xl mx-auto"
    >
      {/* Left Column - Text Content */}
      <motion.div
        className="text-white space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left px-4 sm:px-0"
        variants={prefersReducedMotion ? {} : {
          hidden: {},
          visible: {
            transition: {
              delayChildren: 0.1,
              staggerChildren: 0.1
            }
          }
        }}
        initial={prefersReducedMotion ? {} : "hidden"}
        animate={prefersReducedMotion ? {} : "visible"}
      >
        {/* Subtitle */}
        <motion.p
          className="text-sm lg:text-base font-light tracking-wide uppercase opacity-90"
          variants={prefersReducedMotion ? {} : {
            hidden: { y: 30, opacity: 0 },
            visible: {
              y: 0,
              opacity: 0.9,
              transition: { duration: 0.5, ease: "easeOut" }
            }
          }}
        >
          {slide.subtitle}
        </motion.p>

        {/* Main Headline - Two Line Design */}
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tight leading-tight cursor-default group"
          variants={prefersReducedMotion ? {} : {
            hidden: { y: 50, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
          whileHover={prefersReducedMotion ? {} : {
            scale: 1.02,
            textShadow: "0 0 20px rgba(255, 255, 255, 0.5)"
          }}
        >
          <div className="flex flex-col">
            <span className="relative inline-block">
              {"PRODUIT".split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  whileHover={prefersReducedMotion ? {} : {
                    y: -5,
                    color: "#f97316",
                    textShadow: "0 0 10px rgba(249, 115, 22, 0.8)"
                  }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="relative inline-block">
              {slide.headline.replace('PRODUIT ', '').split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  whileHover={prefersReducedMotion ? {} : {
                    y: -5,
                    color: "#f97316",
                    textShadow: "0 0 10px rgba(249, 115, 22, 0.8)"
                  }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </div>
        </motion.h1>

        {/* CTA Button - Fixed Animation */}
        <motion.button
          className="group relative inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold uppercase tracking-wide overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.8, // Appears after title animation
              ease: "easeOut"
            }
          }}
          onClick={() => {
            // Placeholder for catalog navigation
            console.log('Navigate to catalog');
          }}
          aria-label="View catalog"
          whileHover={prefersReducedMotion ? {} : {
            scale: 1.05,
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)"
          }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            VOIR LE CATALOGUE
          </span>
          <motion.svg
            className="relative z-10 w-5 h-5 group-hover:text-white transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </motion.svg>
        </motion.button>
      </motion.div>

      {/* Right Column - Image (Hidden on Mobile/Tablet) */}
      <motion.div
        className="hidden lg:block"
        initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, x: 100, scale: 0.9 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: "easeOut",
            delay: prefersReducedMotion ? 0 : 0.2
          }
        }}
        exit={{
          opacity: 0,
          x: -100,
          scale: 0.9,
          transition: { duration: 0.4, ease: "easeIn" }
        }}
      >
        <div className="relative perspective-1000">
          {imageLoaded ? (
            <motion.div
              className="relative transform-gpu"
              style={{
                transformStyle: "preserve-3d",
                willChange: 'transform'
              }}
              animate={{
                rotateY: [-2, 2, -2],
                rotateX: [-1, 1, -1],
                z: [0, 20, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Main Image with 3D Parallax */}
              <motion.img
                src={slide.imageSrc}
                alt={slide.imageAlt}
                className="w-full h-auto max-w-lg mx-auto object-contain drop-shadow-2xl"
                loading="lazy"
                style={{
                  willChange: 'transform',
                  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))'
                }}
                animate={{
                  y: [-10, 10, -10],
                  rotateZ: [-1, 1, -1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />

              {/* 3D Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-60 blur-sm"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(50px)"
                }}
                animate={{
                  y: [-15, 15, -15],
                  x: [-8, 8, -8],
                  rotateY: [0, 360],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.div
                className="absolute -bottom-4 -left-4 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-50 blur-sm"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(30px)"
                }}
                animate={{
                  y: [10, -10, 10],
                  x: [5, -5, 5],
                  rotateX: [0, 360],
                  scale: [1, 1.4, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />

              {/* Background Depth Layer */}
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-orange-500/5 rounded-full scale-150 -z-10"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(-20px)"
                }}
                animate={{
                  scale: [1.2, 1.6, 1.2],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ) : (
            <div className="w-full h-96 max-w-lg mx-auto rounded-lg shadow-2xl bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="text-white text-center">
                <motion.div
                  className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-sm">Chargement...</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SlideContent;