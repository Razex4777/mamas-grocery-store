import React from 'react';
import { motion } from 'framer-motion';
import type { AboutUsBlockProps } from './types';
import { ABOUT_CONTENT, FEATURE_BOXES } from './constants';

const AboutUsBlock: React.FC<AboutUsBlockProps> = ({ className = '' }) => {
  return (
    <section className={`py-20 bg-gray-50 relative overflow-hidden ${className}`}>
      <div className="flex items-center">
        
        {/* Left Column - Image touching left viewport limit */}
        <motion.div
          className="relative w-1/2 lg:w-1/2" // No margins, touches left edge
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Triangle shape on right side, straight on left */}
              <div 
                className="relative w-full h-96 lg:h-[500px] overflow-hidden"
                style={{
                  clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)'
                }}
              >
                {/* Single Image Layer */}
                <motion.img
                  src={ABOUT_CONTENT.imageSrc}
                  alt={ABOUT_CONTENT.imageAlt}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  whileInView={{ 
                    scale: 1,
                    transition: { duration: 1, ease: "easeOut" }
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  viewport={{ once: true }}
                />
              </div>


            </div>
          </motion.div>

        {/* Right Column - Text Content */}
        <motion.div
          className="w-1/2 lg:w-1/2 px-8 lg:px-16 space-y-8" // Proper spacing from image
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
            }}
            viewport={{ once: true }}
          >
            {/* Subtitle with Decorative Icons */}
            <motion.div 
              className="flex items-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 0.3, duration: 0.6 }
              }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
              <h3 className="text-orange-500 font-bold text-lg uppercase tracking-wider">
                {ABOUT_CONTENT.subtitle}
              </h3>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 0.4, duration: 0.6 }
              }}
              viewport={{ once: true }}
            >
              {ABOUT_CONTENT.title}
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-gray-600 text-lg leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 0.5, duration: 0.6 }
              }}
              viewport={{ once: true }}
            >
              {ABOUT_CONTENT.description}
            </motion.p>

            {/* Feature Boxes - Side by Side with Vertical Separator */}
            <motion.div 
              className="flex items-start gap-8 pt-8"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 0.6, duration: 0.6 }
              }}
              viewport={{ once: true }}
            >
              {FEATURE_BOXES.map((feature, index) => (
                <React.Fragment key={feature.id}>
                  <motion.div 
                    className="flex-1 space-y-4"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                  
                  {/* Vertical Separator Line */}
                  {index === 0 && (
                    <div className="w-px bg-gray-300 self-stretch mx-4" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsBlock;