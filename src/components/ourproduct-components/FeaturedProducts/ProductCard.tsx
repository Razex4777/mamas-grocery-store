import { motion } from 'framer-motion';
import { Eye, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../../lib/favorites';

import type { FeaturedProduct } from './types';

interface ProductCardProps {
  product: FeaturedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white rounded-2xl border border-gray-200 hover:border-[#629D23]/30 hover:shadow-2xl transition-all duration-300 overflow-hidden will-change-transform"
      style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#629D23]/0 via-[#629D23]/0 to-[#629D23]/0 group-hover:from-[#629D23]/10 group-hover:via-transparent group-hover:to-[#629D23]/10 transition-all duration-500 pointer-events-none" />

      {/* Favorite button - top right, appears on hover */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg"
        title={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart 
          className={`h-5 w-5 transition-colors ${
            isFavorite(product.id) 
              ? 'text-red-500 fill-red-500' 
              : 'text-gray-600'
          }`}
        />
      </button>

      {/* Product Image with optimized hover effect */}
      <div className="relative h-44 md:h-56 flex items-center justify-center p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* Badges - no overlap */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.newArrival && (
            <div className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full ring-1 ring-blue-600/20 w-fit">
              New Arrival
            </div>
          )}
          {product.featured && !isFavorite(product.id) && (
            <div className="bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-extrabold px-2 py-1 rounded-full ring-1 ring-amber-500/20 w-fit">
              Featured
            </div>
          )}
        </div>
        
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
      <div className="relative p-4 md:p-5 bg-white">
        {/* Origin and Stock Status */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{product.origin}</span>
          <span className={product.inStock ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 line-clamp-2 min-h-[40px] md:min-h-[48px] group-hover:text-[#629D23] transition-colors duration-300">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-[10px] md:text-xs text-gray-600 line-clamp-2 mb-3 md:mb-4 min-h-[28px] md:min-h-[32px]">
          {product.description}
        </p>

        {/* View Details Button */}
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full mt-3 md:mt-4 bg-[#629D23] hover:bg-[#527d1d] text-white text-xs md:text-sm font-medium py-2 md:py-2.5 px-3 md:px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5 md:gap-2"
        >
          <Eye size={16} className="md:w-[18px] md:h-[18px]" />
          <span>View Details</span>
        </button>
      </div>

      {/* Bottom shine effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#629D23] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.article>
  );
}