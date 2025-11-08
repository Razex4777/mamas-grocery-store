import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Package } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductCard from '../components/ourproduct-components/FeaturedProducts/ProductCard';
import FeatureTabs from '../components/ourproduct-components/FeatureTabs';
import type { FeaturedProduct } from '../components/ourproduct-components/FeaturedProducts/types';
import AnimatedMarqueeHero from '../components/ourproduct-components/AnimatedMarqueeHero';
import NewsletterSection from '../components/ourproduct-components/NewsletterSection';
import BrandMarquee from '../components/ourproduct-components/BrandMarquee';
import AboutUsSection from '../components/ourproduct-components/AboutUsSection';
import { fetchProducts, fetchNewArrivals } from '../lib/products';
import type { Product } from '../lib/database.types';

// Helper function to convert Product to FeaturedProduct
const convertToFeaturedProduct = (product: Product): FeaturedProduct => ({
  id: product.id,
  title: product.title,
  category: product.category_id || 'Uncategorized',
  priceDisplay: '', // No pricing for showcase
  price: 0,
  wholesalePrice: '',
  minOrderQty: 0,
  imageSrc: product.image_url,
  description: product.description,
  inStock: product.in_stock,
  origin: product.origin,
  featured: product.featured,
  newArrival: product.new_arrival,
});

export default function OurProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load products from Supabase
  useEffect(() => {
    const loadData = async () => {
      const [allProducts, arrivals] = await Promise.all([
        fetchProducts(),
        fetchNewArrivals(),
      ]);
      
      setProducts(allProducts);
      setNewArrivals(arrivals);
    };
    
    loadData();
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      disable: false, // Enable on all devices
      startEvent: 'DOMContentLoaded',
      offset: 50, // Reduced offset for better mobile triggering
    });
    
    // Refresh AOS on mount to ensure mobile elements are detected
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  // Auto-scroll for New Arrivals
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const autoScroll = setInterval(() => {
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const currentScroll = scrollContainer.scrollLeft;

      if (currentScroll >= maxScroll) {
        // Reset to beginning
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll to next item
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <>
      {/* Feature Tabs */}
      <FeatureTabs />

      {/* Animated Marquee Hero Banner */}
      <AnimatedMarqueeHero />

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 py-4 md:py-8">
          {/* New Arrivals Section */}
          <div 
            className="mb-6 md:mb-12"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <div className="inline-flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl blur-sm opacity-75"></div>
                    <div className="relative bg-gradient-to-r from-red-600 to-red-700 px-4 md:px-6 py-1.5 md:py-2 rounded-2xl shadow-lg">
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-white tracking-wide">New Arrivals</h2>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-600 ml-2 font-sans">Check out our latest products</p>
              </div>
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                    }
                  }}
                  className="p-2 rounded-full bg-white border border-gray-200 hover:bg-green-700 hover:text-white hover:border-green-700 transition-all shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                  }}
                  className="p-2 rounded-full bg-white border border-gray-200 hover:bg-green-700 hover:text-white hover:border-green-700 transition-all shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Products */}
            <div className="relative">
              <div
                ref={scrollRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {newArrivals.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-64 md:w-72">
                    <ProductCard product={convertToFeaturedProduct(product)} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekend Discount Banner */}
          <div 
            className="mb-6 md:mb-12"
            data-aos="zoom-in"
            data-aos-duration="1200"
          >
            <div 
              className="relative rounded-2xl overflow-hidden shadow-xl"
              style={{
                backgroundImage: 'url(/products/weekend-discount-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2d5016]/95 via-[#2d5016]/85 to-[#405c21]/60"></div>
              
              <div className="relative p-6 md:p-8 lg:p-12 flex items-center justify-between">
                <div className="flex-1 max-w-2xl">
                  <span className="inline-block text-red-600 text-xs md:text-sm font-heading font-semibold mb-2 tracking-wider">Weekend Discount</span>
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-2 md:mb-4 leading-tight">
                    Healthy vegetable that you deserve to eat fresh
                  </h2>
                  <p className="text-gray-300 text-xs md:text-sm">
                    We have prepared special discounts for you on grocery products.<br />
                    Don't miss these opportunities...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section with Marquee Animation */}
      <AboutUsSection />

      {/* Main Content Continues */}
      <div id="products" className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div 
            className="mb-8"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-green-500 rounded-2xl blur-sm opacity-75"></div>
                <div className="relative bg-gradient-to-r from-green-700 via-green-600 to-green-500 px-4 md:px-6 py-1.5 md:py-2 rounded-2xl shadow-lg">
                  <h1 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white tracking-wide">Our Products</h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-700 rounded-full"></div>
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-600 ml-2 font-sans">Discover our selection of premium products for wholesale.</p>
          </div>

          {/* Quick Stats Bar */}
          <div 
            className="bg-white rounded-lg shadow-sm p-3 md:p-4 mb-6 md:mb-8 border border-gray-100"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="flex items-center justify-between gap-3 md:gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-base md:text-lg font-heading font-bold text-green-700">{products.length}</span>
                <span className="text-xs font-sans text-gray-600">
                  Premium Products
                </span>
              </div>
              
              <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
              
              <div className="flex items-center gap-2">
                <span className="text-base md:text-lg font-heading font-bold text-green-700">100%</span>
                <span className="text-[10px] md:text-xs font-sans text-gray-600">Fresh Quality</span>
              </div>
              
              <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
              
              <div className="flex items-center gap-2">
                <span className="text-base md:text-lg font-heading font-bold text-green-700">24h</span>
                <span className="text-[10px] md:text-xs font-sans text-gray-600">Fast Delivery</span>
              </div>
              
              <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
              
              <div className="flex items-center gap-2">
                <span className="text-base md:text-lg font-heading font-bold text-green-700">5.0</span>
                <span className="text-[10px] md:text-xs font-sans text-gray-600">Customer Rating</span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={index < 8 ? index * 30 : 0}
                >
                  <ProductCard product={convertToFeaturedProduct(product)} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
                <p className="text-gray-400 text-sm mt-2">Essayez une autre recherche ou catégorie</p>
              </div>
            )}
          </div>

          {/* View More Button */}
          <div className="mt-8 md:mt-12 flex items-center justify-center">
            <button 
              onClick={() => navigate('/products')}
              className="group relative flex items-center gap-1 overflow-hidden rounded-full border-2 border-green-700 bg-transparent px-6 md:px-10 py-3 md:py-4 text-sm md:text-base font-semibold text-green-700 cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-xl active:scale-95 shadow-lg hover:shadow-2xl"
            >
              {/* Left arrow */}
              <ArrowRight 
                className="absolute w-4 h-4 md:w-5 md:h-5 left-[-25%] stroke-green-700 fill-none z-[9] group-hover:left-4 md:group-hover:left-6 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
              />

              {/* Text */}
              <span className="relative z-[1] -translate-x-2 md:-translate-x-3 group-hover:translate-x-3 md:group-hover:translate-x-4 transition-all duration-[800ms] ease-out text-sm md:text-lg font-heading font-semibold tracking-wide">
                View More Products
              </span>

              {/* Expanding Circle Background */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-green-700 to-green-800 rounded-full opacity-0 group-hover:w-[400px] md:group-hover:w-[500px] group-hover:h-[400px] md:group-hover:h-[500px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>

              {/* Right arrow */}
              <ArrowRight 
                className="absolute w-4 h-4 md:w-5 md:h-5 right-4 md:right-6 stroke-green-700 fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
              />
            </button>
          </div>

          {/* Promotional Banners */}
          <div 
            className="mt-8 md:mt-16"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div 
                className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                style={{
                  backgroundImage: 'url(/products/promo-banner-1-bg.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/95 to-orange-100/85"></div>
                
                <div className="relative p-6 md:p-12 lg:p-16 flex items-center justify-between min-h-[200px] md:min-h-[280px]">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-800 mb-2 md:mb-4 leading-tight">
                      Premium <span className="text-green-700">Quality</span><br />
                      Products
                    </h3>
                    <p className="text-sm md:text-lg font-sans text-gray-600 leading-relaxed">
                      Carefully selected wholesale products<br />
                      meeting the highest quality standards
                    </p>
                  </div>
                </div>
              </div>
              <div 
                className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                style={{
                  backgroundImage: 'url(/products/promo-banner-2-bg.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/95 to-green-100/85"></div>
                
                <div className="relative p-6 md:p-12 lg:p-16 flex items-center justify-between min-h-[200px] md:min-h-[280px]">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-800 mb-2 md:mb-4 leading-tight">
                      Premium <span className="text-green-700">Quality</span><br />
                      Products
                    </h3>
                    <p className="text-sm md:text-lg font-sans text-gray-600 leading-relaxed">
                      Carefully selected wholesale products<br />
                      meeting the highest quality standards
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Brand Marquee - GSAP Animation */}
      <BrandMarquee />

      {/* Newsletter Section */}
      <NewsletterSection />
    </>
  );
}
