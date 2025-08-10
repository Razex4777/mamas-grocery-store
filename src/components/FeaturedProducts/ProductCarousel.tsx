import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { FEATURED_PRODUCTS } from './constants';

export default function ProductCarousel() {
  return (
    <div className="relative">
      {/* Static Grid Layout - No sliding */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {FEATURED_PRODUCTS.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
