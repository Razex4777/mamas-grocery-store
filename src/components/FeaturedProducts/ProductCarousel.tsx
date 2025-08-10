import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import ProductCard from './ProductCard';
import { FEATURED_PRODUCTS } from './constants';

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setDragX] = useState(0);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-scroll removed - manual control only

  const goToNext = () => {
    const maxIndex = Math.max(0, FEATURED_PRODUCTS.length - itemsPerView);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrev = () => {
    const maxIndex = Math.max(0, FEATURED_PRODUCTS.length - itemsPerView);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const maxIndex = Math.max(0, FEATURED_PRODUCTS.length - itemsPerView);

  return (
    <div className="relative">

      {/* Carousel container */}
      <div className="relative overflow-hidden" ref={containerRef}>
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 z-10" style={{
          background: 'linear-gradient(to right, rgba(149, 252, 180, 0.9), rgba(149, 252, 180, 0.0))'
        }} />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 z-10" style={{
          background: 'linear-gradient(to left, rgba(149, 252, 180, 0.9), rgba(149, 252, 180, 0.0))'
        }} />

        <motion.div
          className="flex gap-6 items-stretch cursor-grab active:cursor-grabbing"
          animate={{
            x: `${-currentIndex * (100 / itemsPerView)}%`,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          style={{
            width: `${(FEATURED_PRODUCTS.length / itemsPerView) * 100}%`,
          }}
          drag="x"
          dragElastic={0.08}
          onDragEnd={(_, info: PanInfo) => {
            const threshold = (containerRef.current?.clientWidth || 1) * 0.15;
            const delta = info.offset.x;
            if (delta < -threshold) {
              goToNext();
            } else if (delta > threshold) {
              goToPrev();
            }
            setDragX(0);
          }}
          onDrag={(_, info) => setDragX(info.offset.x)}
        >
          {FEATURED_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              className="flex-shrink-0 h-full"
              style={{ width: `${100 / FEATURED_PRODUCTS.length}%` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="h-full">
                <ProductCard product={product} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex 
                ? 'bg-blue-500' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
