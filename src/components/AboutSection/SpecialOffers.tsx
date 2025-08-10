import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { SpecialOffersProps } from './types';
import { SPECIAL_OFFERS, ORIENT_SECTION, AFRICA_SECTION } from './constants';

const SpecialOffers: React.FC<SpecialOffersProps> = ({ className = '' }) => {
  return (
    <section className={`${className}`}>
      {/* Dark background for the entire section */}
      <div className="bg-gray-900 py-16 lg:py-24">
        {/* Circular cards layout */}
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
            {SPECIAL_OFFERS.map((offer, index) => (
              <motion.div
                key={offer.id}
                className="flex flex-col items-center group cursor-pointer"
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
                {/* Circular Flag Image Container */}
                <motion.div
                  className="relative w-64 h-64 lg:w-80 lg:h-80 overflow-hidden rounded-full shadow-2xl"
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
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500 rounded-full" />
                  {/* Hover brightness effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 rounded-full" />

                  {/* Content Layer inside circle */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                    {/* Authentic Products Tag */}
                    <motion.div
                      className="bg-yellow-400 text-black px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                      initial={{ scale: 0, rotate: -10 }}
                      whileInView={{ 
                        scale: 1, 
                        rotate: 0,
                        transition: { delay: index * 0.2 + 0.4, duration: 0.5 }
                      }}
                      whileHover={{ scale: 1.05 }}
                      viewport={{ once: true }}
                    >
                      Produits Authentiques
                    </motion.div>

                    {/* Main Title */}
                    <motion.h3 
                      className="text-lg lg:text-2xl font-bold leading-tight text-center mb-2"
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ 
                        y: 0, 
                        opacity: 1,
                        transition: { delay: index * 0.2 + 0.5, duration: 0.6 }
                      }}
                      viewport={{ once: true }}
                      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                    >
                      {offer.title}
                    </motion.h3>
                    
                    {/* Subtitle */}
                    <motion.p 
                      className="text-sm lg:text-base font-semibold opacity-90 text-center mb-4"
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ 
                        y: 0, 
                        opacity: 0.9,
                        transition: { delay: index * 0.2 + 0.6, duration: 0.6 }
                      }}
                      viewport={{ once: true }}
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                      {offer.price}
                    </motion.p>

                    {/* Discover Button */}
                    <motion.button
                      className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-bold uppercase tracking-wide hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl text-xs"
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ 
                        y: 0, 
                        opacity: 1,
                        transition: { delay: index * 0.2 + 0.7, duration: 0.6 }
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      viewport={{ once: true }}
                    >
                      DÉCOUVRIR
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight size={14} />
                      </motion.div>
                    </motion.button>
                  </div>

                  {/* Hover overlay effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                  />
                </motion.div>

                {/* Product Image Below Circle */}
                <motion.div
                  className="mt-6 w-24 h-24 lg:w-32 lg:h-32"
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Orient Section - Same background as Special Offers */}
      <div className="bg-gray-900 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Text content */}
            <motion.div
              className="text-white space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }}
              viewport={{ once: true }}
            >
              {/* Main heading */}
              <motion.h2 
                className="text-3xl lg:text-5xl font-bold leading-tight"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                {ORIENT_SECTION.title}
                <br />
                {ORIENT_SECTION.titleSecondLine}
              </motion.h2>

              {/* Description text */}
              <motion.p 
                className="text-lg lg:text-xl text-gray-300 leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: 0.4, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                {ORIENT_SECTION.description}
              </motion.p>

              {/* Highlighted tagline */}
              <motion.p 
                className="text-xl lg:text-2xl font-semibold text-yellow-400"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: 0.6, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                {ORIENT_SECTION.tagline}
              </motion.p>

              {/* Additional descriptive text */}
              <motion.div 
                className="space-y-4 text-gray-400"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: 0.8, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                {ORIENT_SECTION.additionalText.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </motion.div>
            </motion.div>

            {/* Right side - Orient map */}
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Map container with subtle glow */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={ORIENT_SECTION.mapImageSrc}
                    alt={ORIENT_SECTION.mapImageAlt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Subtle overlay for better integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                </div>

                {/* Decorative glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl blur-xl -z-10" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Africa Section - Image left, content right */}
      <div className="bg-gray-900 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Africa map */}
            <motion.div
              className="flex justify-center items-center order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Map container with subtle glow */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={AFRICA_SECTION.mapImageSrc}
                    alt={AFRICA_SECTION.mapImageAlt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Subtle overlay for better integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                </div>

                {/* Decorative glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-yellow-400/20 rounded-2xl blur-xl -z-10" />
              </motion.div>
            </motion.div>

            {/* Right side - Text content */}
            <motion.div
              className="text-white space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }}
              viewport={{ once: true }}
            >
              {/* Main heading */}
              <motion.h2 
                className="text-3xl lg:text-5xl font-bold leading-tight"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                {AFRICA_SECTION.title}
                <br />
                {AFRICA_SECTION.titleSecondLine}
              </motion.h2>

              {/* Description text */}
              <motion.p 
                className="text-lg lg:text-xl text-gray-300 leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: 0.4, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                {AFRICA_SECTION.description}
              </motion.p>

              {/* Highlighted tagline */}
              <motion.p 
                className="text-xl lg:text-2xl font-semibold text-green-400"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: 0.6, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                {AFRICA_SECTION.tagline}
              </motion.p>

              {/* Additional descriptive text */}
              <motion.div 
                className="space-y-4 text-gray-400"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: 0.8, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                {AFRICA_SECTION.additionalText.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;