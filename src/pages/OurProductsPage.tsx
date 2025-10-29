import { useState, useRef, useEffect } from 'react';
import { Menu, Search, ChevronLeft, ChevronRight, Eye, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductCard from '../components/ourproduct-components/FeaturedProducts/ProductCard';
import ViewProductDrawer from '../components/ourproduct-components/FeaturedProducts/ViewProductDrawer';
import FeatureTabs from '../components/ourproduct-components/FeatureTabs';
import AnimatedMarqueeHero from '../components/ourproduct-components/AnimatedMarqueeHero';
import NewsletterSection from '../components/ourproduct-components/NewsletterSection';
import BrandMarquee from '../components/ourproduct-components/BrandMarquee';
import Footer from '../components/Footer';
import { FEATURED_PRODUCTS } from '../components/ourproduct-components/FeaturedProducts/constants';
import type { FeaturedProduct } from '../components/ourproduct-components/FeaturedProducts/types';

const CATEGORIES = [
  'All Categories',
  'Breakfast & Dairy',
  'Meats & Seafood',
  'Breads & Bakery',
  'Chips & Snacks',
  'Medical Healthcare',
  'Biscuits & Snacks',
  'Frozen Foods',
  'Grocery & Staples'
];

export default function OurProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerProduct, setDrawerProduct] = useState<FeaturedProduct | null>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      disable: 'phone', // Disable on mobile for performance
    });
  }, []);

  // Close category menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  // Global event listeners for product view
  useEffect(() => {
    const onView = (e: any) => {
      const p: FeaturedProduct = e.detail;
      setDrawerProduct(p);
      setDrawerOpen(true);
    };
    window.addEventListener('app:product:view', onView as EventListener);
    return () => {
      window.removeEventListener('app:product:view', onView as EventListener);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm, 'in category:', selectedCategory);
  };


  return (
    <>
      {/* Feature Tabs */}
      <FeatureTabs />

      {/* Animated Marquee Hero Banner */}
      <AnimatedMarqueeHero />

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          {/* Search Bar Section */}
          <div 
            className="mb-8 bg-[#6B9E3E] rounded-lg p-4 shadow-md"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSearch} className="flex items-center gap-0 bg-white rounded-lg overflow-hidden">
                {/* Category Dropdown */}
                <div className="relative" ref={categoryRef}>
                  <button
                    type="button"
                    onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                    className="flex items-center gap-2 px-4 py-3 bg-white border-r border-gray-200 hover:bg-gray-50 transition-colors min-w-[160px]"
                  >
                    <Menu className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {selectedCategory}
                    </span>
                  </button>
                  
                  {/* Category Dropdown Menu */}
                  {showCategoryMenu && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
                      {CATEGORIES.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowCategoryMenu(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-[#629D23] hover:bg-[#527d1d] text-white px-6 py-3 transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span className="font-medium">Search</span>
                </button>
              </form>
            </div>
          </div>

          {/* New Arrivals Section */}
          <div 
            className="mb-12"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur-sm opacity-75"></div>
                    <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 rounded-2xl shadow-lg">
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-wide">New Arrivals</h2>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
                <p className="text-gray-600 ml-2 font-sans">Check out our latest products</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                    }
                  }}
                  className="p-2 rounded-full bg-white border border-gray-200 hover:bg-[#629D23] hover:text-white hover:border-[#629D23] transition-all shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                  }}
                  className="p-2 rounded-full bg-white border border-gray-200 hover:bg-[#629D23] hover:text-white hover:border-[#629D23] transition-all shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Products */}
            <div className="relative">
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {FEATURED_PRODUCTS.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-72">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekend Discount Banner */}
          <div 
            className="mb-12"
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
              
              <div className="relative p-8 md:p-12 flex items-center justify-between">
                <div className="flex-1 max-w-2xl">
                  <span className="inline-block text-orange-400 text-sm font-heading font-semibold mb-2 tracking-wider">Weekend Discount</span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                    Healthy vegetable that you deserve to eat fresh
                  </h2>
                  <p className="text-gray-300 text-sm">
                    We have prepared special discounts for you on grocery products.<br />
                    Don't miss these opportunities...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="mb-8"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-2xl blur-sm opacity-75"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-6 py-2 rounded-2xl shadow-lg">
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-wide">Our Products</h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-teal-300 rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-600 ml-2 font-sans">Discover our selection of premium products for wholesale.</p>
          </div>

          {/* Quick Stats Bar */}
          <div 
            className="bg-white rounded-lg shadow-sm p-4 mb-8 border border-gray-100"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-lg font-heading font-bold text-[#629D23]">{FEATURED_PRODUCTS.length}+</span>
                <span className="text-xs font-sans text-gray-600">Premium Products</span>
              </div>
              
              <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg font-heading font-bold text-[#629D23]">100%</span>
                <span className="text-xs font-sans text-gray-600">Fresh Quality</span>
              </div>
              
              <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg font-heading font-bold text-[#629D23]">24h</span>
                <span className="text-xs font-sans text-gray-600">Fast Delivery</span>
              </div>
              
              <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg font-heading font-bold text-[#629D23]">5.0</span>
                <span className="text-xs font-sans text-gray-600">Customer Rating</span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product, index) => (
              <div
                key={product.id}
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={index * 50}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="mt-12 flex items-center justify-center">
            <button className="group relative flex items-center gap-1 overflow-hidden rounded-full border-2 border-[#629D23] bg-transparent px-10 py-4 text-base font-semibold text-[#629D23] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-xl active:scale-95 shadow-lg hover:shadow-2xl">
              {/* Left arrow */}
              <ArrowRight 
                className="absolute w-5 h-5 left-[-25%] stroke-[#629D23] fill-none z-[9] group-hover:left-6 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
              />

              {/* Text */}
              <span className="relative z-[1] -translate-x-3 group-hover:translate-x-4 transition-all duration-[800ms] ease-out text-lg font-heading font-semibold tracking-wide">
                View More Products
              </span>

              {/* Expanding Circle Background */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-[#629D23] to-[#527d1d] rounded-full opacity-0 group-hover:w-[500px] group-hover:h-[500px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>

              {/* Right arrow */}
              <ArrowRight 
                className="absolute w-5 h-5 right-6 stroke-[#629D23] fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
              />
            </button>
          </div>

          {/* Promotional Banners */}
          <div 
            className="mt-16 mb-12"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                
                <div className="relative p-12 md:p-16 flex items-center justify-between min-h-[280px]">
                  <div className="flex-1">
                    <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-4 leading-tight">
                      Get Everyday Fresh<br />
                      <span className="text-[#629D23]">Organic</span> Vegetable
                    </h3>
                    <p className="text-lg font-sans text-gray-600 mb-3">Only</p>
                    <p className="text-5xl md:text-6xl font-bold text-[#629D23]">$15.00</p>
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
                
                <div className="relative p-12 md:p-16 flex items-center justify-between min-h-[280px]">
                  <div className="flex-1">
                    <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-4 leading-tight">
                      Get Everyday Fresh<br />
                      <span className="text-[#629D23]">Organic</span> Vegetable
                    </h3>
                    <p className="text-lg font-sans text-gray-600 mb-3">Only</p>
                    <p className="text-5xl md:text-6xl font-bold text-[#629D23]">$15.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Best Sells Section */}
          <div 
            className="mt-16"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl blur-sm opacity-75"></div>
                <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 px-6 py-2 rounded-2xl shadow-lg">
                  <h2 className="text-3xl font-heading font-bold text-white tracking-wide">Daily Best Sells</h2>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <div className="w-8 h-0.5 bg-purple-500 rounded-full"></div>
                  <div className="w-4 h-0.5 bg-pink-400 rounded-full"></div>
                </div>
                <div className="flex gap-1">
                  <div className="w-4 h-0.5 bg-pink-400 rounded-full"></div>
                  <div className="w-8 h-0.5 bg-rose-400 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Product Cards Grid - 2x2 */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {FEATURED_PRODUCTS.slice(0, 4).map((product, index) => (
                  <div 
                    key={product.id} 
                    className="relative bg-white rounded-2xl border border-gray-200 hover:border-[#629D23]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
                    data-aos="flip-left"
                    data-aos-duration="1000"
                    data-aos-delay={index * 100}
                  >
                    {/* Sale Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                        Sale 50%
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className="relative h-48 flex items-center justify-center p-4 bg-gray-50">
                      <img
                        src={product.imageSrc}
                        alt={product.title}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium">4.8</span>
                        <span className="text-xs text-gray-500">(17k)</span>
                      </div>

                      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.title}
                      </h3>

                      <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                        <span>📍</span> {product.origin}
                      </p>

                      <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                        {product.description}
                      </p>

                      <button
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('app:product:view', { detail: product }));
                          }
                        }}
                        className="w-full bg-[#629D23] hover:bg-[#527d1d] text-white text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Snacks Banner */}
              <div 
                className="lg:col-span-1"
                data-aos="zoom-in-left"
                data-aos-duration="1200"
              >
                <div 
                  className="relative rounded-2xl overflow-hidden h-full min-h-[400px] flex flex-col justify-between p-8"
                  style={{
                    backgroundImage: 'url(/products/special-snacks-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100/90 via-purple-100/85 to-pink-200/90"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                      Special Snacks
                    </h3>

                    {/* Countdown Timer Chips */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">21</div>
                        <div className="text-xs text-gray-600">Days</div>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">8</div>
                        <div className="text-xs text-gray-600">Hours</div>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">38</div>
                        <div className="text-xs text-gray-600">Min</div>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">27</div>
                        <div className="text-xs text-gray-600">Sec</div>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                      Shop Now →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Product Drawer */}
      <ViewProductDrawer product={drawerProduct} open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Brand Marquee - GSAP Animation */}
      <BrandMarquee />

      {/* Footer */}
      <Footer />
    </>
  );
}
