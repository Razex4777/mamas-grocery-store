import type { FeaturedProduct } from './types';

// Note: Product data now comes from Supabase database
// This file is kept for backward compatibility but should not be used
// Use fetchProducts() from lib/products.ts instead

// Emit deprecation warning on module load
if (typeof console !== 'undefined') {
  console.warn(
    '[DEPRECATED] FEATURED_PRODUCTS from constants.ts is deprecated and returns an empty array. ' +
    'Please use fetchProducts() from lib/products.ts instead for product data.'
  );
}

export const FEATURED_PRODUCTS: FeaturedProduct[] = [];

