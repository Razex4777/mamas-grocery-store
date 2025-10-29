export interface FeaturedProduct {
  id: string;
  title: string;
  category: string;
  priceDisplay: string; // Keep formatted pricing as provided, e.g., "5,49 $"
  price: number; // Numeric price for calculations
  originalPrice?: number; // Original price before discount (optional)
  wholesalePrice: string; // Wholesale price for bulk orders
  minOrderQty: number; // Minimum order quantity for wholesale
  imageSrc: string; // Public path to the product image
  description: string; // Short product description
  inStock: boolean; // Stock availability
  origin: string; // Country/region of origin
}


