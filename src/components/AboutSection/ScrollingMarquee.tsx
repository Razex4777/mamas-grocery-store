import React from 'react';
import { motion } from 'framer-motion';
import type { ScrollingMarqueeProps } from './types';
import { MARQUEE_ITEMS } from './constants';

const ScrollingMarquee: React.FC<ScrollingMarqueeProps> = ({ className = '' }) => {
  // Duplicate items for seamless loop
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className={`py-8 bg-gray-900 overflow-hidden ${className}`}>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -100 * MARQUEE_ITEMS.length + '%']
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {duplicatedItems.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              className="inline-flex items-center mx-8 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="text-3xl sm:text-5xl lg:text-8xl font-bold text-white uppercase tracking-wider group-hover:text-orange-500 transition-colors duration-300 relative"
                whileHover={{
                  textShadow: "0 0 20px rgba(249, 115, 22, 0.5)"
                }}
              >
                {item}

                {/* Animated Underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-2 bg-orange-500 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{
                    scaleX: 1,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  style={{ width: '100%' }}
                />
              </motion.span>

              {/* Separator Dot */}
              <motion.div
                className="w-4 h-4 bg-orange-500 rounded-full mx-8 opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Gradient Overlays for Fade Effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default ScrollingMarquee;