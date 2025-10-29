import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import type { FeaturedProduct } from './types';

interface ProductCardProps {
  product: FeaturedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Calculate discount percentage
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white rounded-2xl border border-gray-200 hover:border-[#629D23]/30 hover:shadow-2xl transition-all duration-300 overflow-hidden will-change-transform"
      style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#629D23]/0 via-[#629D23]/0 to-[#629D23]/0 group-hover:from-[#629D23]/10 group-hover:via-transparent group-hover:to-[#629D23]/10 transition-all duration-500 pointer-events-none" />

      {/* Discount Badge - Top Right with animation */}
      {discountPercent > 0 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="absolute top-3 right-3 z-10"
        >
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            -{discountPercent}%
          </div>
        </motion.div>
      )}

      {/* Stock Badge - Top Left */}
      {product.inStock && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            In Stock
          </div>
        </div>
      )}

      {/* Product Image with optimized hover effect */}
      <div className="relative h-56 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* Glow effect behind image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#629D23]/5 via-transparent to-[#629D23]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <img
          src={product.imageSrc}
          alt={product.title}
          className="relative h-full w-full object-contain drop-shadow-xl z-10 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="relative p-5 bg-white">
        {/* Origin Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {product.origin}
          </span>
          <span className="inline-flex items-center text-xs text-[#629D23] bg-[#629D23]/10 px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 min-h-[48px] group-hover:text-[#629D23] transition-colors duration-300">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2 mb-4 min-h-[32px]">
          {product.description}
        </p>

        {/* View Details Button */}
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('app:product:view', { detail: product }));
            }
          }}
          className="w-full mt-4 bg-[#629D23] hover:bg-[#527d1d] text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Eye size={18} />
          <span>View Details</span>
        </button>
      </div>

      {/* Bottom shine effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#629D23] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.article>
  );
}