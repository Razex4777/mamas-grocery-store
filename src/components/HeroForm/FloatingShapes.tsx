import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { FloatingShapesProps } from './types';

const FloatingShapes: React.FC<FloatingShapesProps> = ({ className = '' }) => {
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Smooth mouse tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize mouse position to -1 to 1 range
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {/* Floating Circle 1 - Top Left */}
      <motion.div
        className="absolute top-20 left-20 w-16 h-16 border border-white border-opacity-20 rounded-full"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
          opacity: [0.2, 0.4, 0.2]
        }}
        style={{
          x: springX.get() * -15,
          y: springY.get() * -10
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Rotating Circle 2 - Top Right */}
      <motion.div
        className="absolute top-32 right-32 w-12 h-12 border border-white border-opacity-30 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        style={{
          x: springX.get() * -20,
          y: springY.get() * -15
        }}
        transition={{
          rotate: {
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      {/* Floating Square - Middle Left */}
      <motion.div
        className="absolute top-1/2 left-32 w-8 h-8 border border-white border-opacity-25 transform rotate-45"
        animate={{
          y: [-15, 15, -15],
          opacity: [0.3, 0.6, 0.3]
        }}
        style={{
          x: springX.get() * -12,
          y: springY.get() * -8
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Drifting Circle 3 - Bottom Left */}
      <motion.div
        className="absolute bottom-40 left-40 w-20 h-20 border border-white border-opacity-15 rounded-full"
        animate={{
          x: [-20, 20, -20],
          y: [-10, 10, -10]
        }}
        style={{
          x: springX.get() * -18,
          y: springY.get() * -12
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Pulsing Triangle - Bottom Right */}
      <motion.div
        className="absolute bottom-32 right-40 w-0 h-0 border-l-6 border-r-6 border-b-10 border-l-transparent border-r-transparent border-b-white border-opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        style={{
          x: springX.get() * -25,
          y: springY.get() * -18
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Rotating Square - Center Right */}
      <motion.div
        className="absolute top-1/3 right-20 w-10 h-10 border border-white border-opacity-20"
        animate={{
          rotate: -360,
          y: [-8, 8, -8]
        }}
        style={{
          x: springX.get() * -22,
          y: springY.get() * -14
        }}
        transition={{
          rotate: {
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          },
          y: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      {/* Small Floating Dots */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-3 h-3 bg-white bg-opacity-30 rounded-full"
        animate={{
          y: [-12, 12, -12],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-white bg-opacity-25 rounded-full"
        animate={{
          x: [-8, 8, -8],
          y: [-6, 6, -6]
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Large Rotating Circle - Background */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white border-opacity-5 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.1, 0.6, 0.1],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 blur-sm"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [-20, 20, -20],
          y: [-15, 15, -15]
        }}
        style={{
          x: springX.get() * -30,
          y: springY.get() * -20
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 blur-sm"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.6, 0.25],
          x: [15, -15, 15],
          y: [10, -10, 10]
        }}
        style={{
          x: springX.get() * -16,
          y: springY.get() * -12
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

export default FloatingShapes;