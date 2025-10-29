<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import type { ScrollToTopProps } from './types';

const ScrollToTop: React.FC<ScrollToTopProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`fixed bottom-8 right-8 z-50 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-colors duration-300 group ${className}`}
          onClick={scrollToTop}
          initial={{ 
            opacity: 0, 
            scale: 0,
            y: 100
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0,
            y: 100,
            transition: {
              duration: 0.2
            }
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 30px rgba(249, 115, 22, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{
              y: [-2, 2, -2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowUp size={24} className="group-hover:scale-110 transition-transform duration-200" />
          </motion.div>

          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-orange-500"
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
        </motion.button>
      )}
    </AnimatePresence>
  );
};

=======
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import type { ScrollToTopProps } from './types';

const ScrollToTop: React.FC<ScrollToTopProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`fixed bottom-8 right-8 z-50 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-colors duration-300 group ${className}`}
          onClick={scrollToTop}
          initial={{ 
            opacity: 0, 
            scale: 0,
            y: 100
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0,
            y: 100,
            transition: {
              duration: 0.2
            }
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 30px rgba(249, 115, 22, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{
              y: [-2, 2, -2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowUp size={24} className="group-hover:scale-110 transition-transform duration-200" />
          </motion.div>

          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-orange-500"
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
        </motion.button>
      )}
    </AnimatePresence>
  );
};

>>>>>>> f364477e1bf411dd22665f5070bbf41d1f473208
export default ScrollToTop;