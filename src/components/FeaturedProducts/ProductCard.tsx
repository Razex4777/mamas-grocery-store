import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Package, MapPin } from 'lucide-react';
import type { FeaturedProduct } from './types';

interface ProductCardProps {
  product: FeaturedProduct;
}

const THEME_COLORS = [
  { primary: '#FF6B6B', secondary: '#4ECDC4', gradient: 'from-red-500/20 to-teal-500/20' },
  { primary: '#4ECDC4', secondary: '#45B7D1', gradient: 'from-teal-500/20 to-blue-500/20' },
  { primary: '#96CEB4', secondary: '#FECA57', gradient: 'from-green-500/20 to-yellow-500/20' },
  { primary: '#FECA57', secondary: '#FF9FF3', gradient: 'from-yellow-500/20 to-pink-500/20' },
  { primary: '#FF9FF3', secondary: '#54A0FF', gradient: 'from-pink-500/20 to-blue-500/20' },
];

export default function ProductCard({ product }: ProductCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const theme = useMemo(() => {
    const index = Math.abs([...product.id].reduce((acc, c) => acc + c.charCodeAt(0), 0)) % THEME_COLORS.length;
    return THEME_COLORS[index];
  }, [product.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const savingsPercent = useMemo(() => {
    const retail = parseFloat(product.priceDisplay.replace(/[^0-9,]/g, '').replace(',', '.'));
    const wholesale = parseFloat(product.wholesalePrice.replace(/[^0-9,]/g, '').replace(',', '.'));
    return Math.round(((retail - wholesale) / retail) * 100);
  }, [product.priceDisplay, product.wholesalePrice]);

  return (
    <motion.article
      ref={cardRef}
      className="group relative h-full cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      {/* Main card container */}
      <div className="relative h-full min-h-[620px] rounded-3xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden flex flex-col">
        
        {/* Animated gradient border on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
          <div 
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, ${theme.primary}20, ${theme.secondary}20, ${theme.primary}20)`,
            }}
          />
          <div className="absolute inset-[2px] rounded-3xl bg-white" />
        </div>

        {/* Spotlight effect */}
        <div 
          className="absolute pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-xl z-10"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${theme.primary}60 0%, transparent 70%)`,
          }}
        />

        {/* Stock status badge */}
        <div className="absolute top-4 left-4 z-20">
          <motion.div
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
              product.inStock 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {product.inStock ? 'En Stock' : 'Rupture'}
          </motion.div>
        </div>

        {/* Savings badge */}
        {savingsPercent > 0 && (
          <div className="absolute top-4 right-4 z-20">
            <motion.div
              className="px-2 py-1 rounded-full text-xs font-bold bg-orange-500 text-white shadow-lg"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: 'easeInOut' 
              }}
            >
              -{savingsPercent}%
            </motion.div>
          </div>
        )}

        {/* Product image section */}
        <div className="relative z-10 h-[200px] flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <motion.div
            className="relative"
            animate={{ 
              y: [0, -6, 0],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          >
            {/* Glow effect behind image */}
            <div 
              className="absolute inset-0 rounded-2xl blur-xl opacity-20"
              style={{ backgroundColor: theme.primary }}
            />
            <img
              src={product.imageSrc}
              alt={product.title}
              className="relative h-32 w-32 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Product information */}
        <div className="relative z-10 flex-1 p-6 flex flex-col gap-4">
          {/* Title and origin */}
          <div className="min-h-[72px]">
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
              {product.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={14} />
              <span>{product.origin}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {product.category}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 min-h-[56px]">
            {product.description}
          </p>

          {/* Wholesale info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 min-h-[116px]">
            <div className="flex items-center gap-2 mb-2">
              <Package size={16} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Vente en Gros</span>
            </div>
              <div className="grid grid-cols-2 gap-y-1 text-sm">
                <span className="text-gray-600">Prix gros:</span>
                <span className="font-bold text-blue-600 whitespace-nowrap text-right">{product.wholesalePrice}</span>
                <span className="text-gray-600">Qté minimum:</span>
                <span className="font-semibold text-gray-900 whitespace-nowrap text-right">{product.minOrderQty} unités</span>
              </div>
          </div>

          {/* Action buttons */}
          <div className="mt-auto space-y-3 pb-1">
            {/* View Product button */}
            <motion.button
              className="w-full px-4 py-2 rounded-xl font-medium text-white bg-green-600 hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('app:product:view', { detail: product }));
                }
              }}
            >
              <Eye size={18} />
              <span>Voir le Produit</span>
            </motion.button>

            {/* Add to cart button (always visible) */}
            <motion.button
              className={`w-full relative overflow-hidden rounded-xl px-4 py-3 font-semibold text-white shadow-lg transition-all bg-green-600 hover:bg-green-700`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('app:cart:add', { detail: product }));
                }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              <div className="relative flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                <span>Ajouter au Panier</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}