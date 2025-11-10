"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Local grocery images from hero marquee
const GROCERY_IMAGES = [
  "/hero_form/hero_marquee/1.jpeg",
  "/hero_form/hero_marquee/2.jpeg",
  "/hero_form/hero_marquee/3.jpeg",
  "/hero_form/hero_marquee/4.jpeg",
  "/hero_form/hero_marquee/5.jpeg",
  "/hero_form/hero_marquee/6.jpeg",
  "/hero_form/hero_marquee/7.jpeg",
  "/hero_form/hero_marquee/8.jpeg",
  "/hero_form/hero_marquee/9.jpeg",
  "/hero_form/hero_marquee/10.jpeg",
];

// Reusable Button component
const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="group mt-4 md:mt-8 px-5 py-2.5 md:px-8 md:py-4 rounded-full bg-[#629D23] text-white text-sm md:text-base font-semibold shadow-lg transition-all hover:bg-[#527d1d] focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:ring-opacity-75 flex items-center gap-2"
  >
    {children}
    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
  </motion.button>
);

export default function AnimatedMarqueeHero() {
  // Animation variants for the text content
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  // Duplicate images for a seamless loop
  const duplicatedImages = [...GROCERY_IMAGES, ...GROCERY_IMAGES];

  const handleShopNow = () => {
    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/grocery-bg.png)',
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2332]/75 to-[#2d3e50]/60"></div>
      
      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-8 md:py-16 lg:py-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Tagline */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="mb-4 inline-block rounded-full border-2 border-[#629D23] bg-white/90 px-4 py-1.5 text-xs md:text-sm font-medium text-[#629D23] backdrop-blur-sm shadow-sm"
          >
            🌿 Qualité Fraîche Chaque Jour
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-4 md:mb-6"
          >
            {["Votre", "Magasin", "d'Épicerie", "de", "Quartier"].map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block mr-2 md:mr-3 lg:mr-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            transition={{ delay: 0.5 }}
            className="mt-2 md:mt-4 max-w-2xl text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed px-2 md:px-0"
          >
            Produits fraîs de la ferme, viandes de qualité et produits essentiels livrés à votre porte. 
            Découvrez la commodité des achats d'épicerie en ligne avec Mama's Grocery.
          </motion.p>

          {/* Call to Action Button */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            transition={{ delay: 0.6 }}
          >
            <ActionButton onClick={handleShopNow}>Explorer les Produits</ActionButton>
          </motion.div>
        </div>
      </div>

      {/* Animated Image Marquee - Below Content */}
      <div className="relative w-full h-32 md:h-48 lg:h-64 overflow-hidden">
        <motion.div
          className="flex gap-2 md:gap-4 lg:gap-6 absolute"
          animate={{
            x: ["-50%", "0%"],
            transition: {
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-32 md:h-48 lg:h-64 flex-shrink-0"
              style={{
                rotate: `${(index % 2 === 0 ? -3 : 3)}deg`,
              }}
            >
              <img
                src={src}
                alt={`Grocery product ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#629D23]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
    </section>
  );
}
