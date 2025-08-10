import React from 'react';
import { motion } from 'framer-motion';
import { ORIENT_SECTION } from './constants';

const OrientSection: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <section className={`${className}`}>
      {/* Dark blue background similar to the reference image */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-16 lg:py-24">
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
                className="text-lg lg:text-xl text-blue-100 leading-relaxed"
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
                className="space-y-4 text-blue-200"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                </div>

                {/* Decorative glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl blur-xl -z-10" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OrientSection;