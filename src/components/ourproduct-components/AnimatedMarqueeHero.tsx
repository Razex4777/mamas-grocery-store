"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Sample grocery images - replace with your actual product images
const GROCERY_IMAGES = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=500&fit=crop",
];

// Reusable Button component
const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="group mt-8 px-8 py-4 rounded-full bg-[#629D23] text-white font-semibold shadow-lg transition-all hover:bg-[#527d1d] focus:outline-none focus:ring-2 focus:ring-[#629D23] focus:ring-opacity-75 flex items-center gap-2"
  >
    {children}
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Tagline */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="mb-6 inline-block rounded-full border-2 border-[#629D23] bg-white/90 px-6 py-2 text-sm font-medium text-[#629D23] backdrop-blur-sm shadow-sm"
          >
            🌿 Fresh Quality Every Day
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
          >
            {["Your", "Neighborhood", "Grocery", "Store"].map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block mr-3 md:mr-4"
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
            className="mt-4 max-w-2xl text-base md:text-lg text-gray-200 leading-relaxed"
          >
            Farm-fresh produce, quality meats, and everyday essentials delivered to your door. 
            Experience the convenience of online grocery shopping with Mama's Grocery.
          </motion.p>

          {/* Call to Action Button */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            transition={{ delay: 0.6 }}
          >
            <ActionButton onClick={handleShopNow}>Explore Products</ActionButton>
          </motion.div>
        </div>
      </div>

      {/* Animated Image Marquee - Below Content */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden">
        <motion.div
          className="flex gap-4 md:gap-6 absolute"
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
              className="relative aspect-[3/4] h-48 md:h-64 flex-shrink-0"
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
