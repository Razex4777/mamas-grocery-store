import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  from?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  once?: boolean;
}

const offsets = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  scale: { scale: 0.9 },
  fade: {},
};

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  from = 'up',
  delay = 0,
  once = true,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              transition: { type: 'spring', damping: 16, stiffness: 220, delay },
            });
            if (once && ref.current) observer.unobserve(ref.current);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, delay, once]);

  const initial = { opacity: 0, ...offsets[from] } as any;

  return (
    <motion.div ref={ref} className={className} initial={initial} animate={controls}>
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;


