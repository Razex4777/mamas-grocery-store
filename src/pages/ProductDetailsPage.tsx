import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Package, Images, Award,
  ChevronLeft, ChevronRight, MessageSquare,
  Heart, CheckCircle, Barcode, Eye, Sparkles
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lottie from 'lottie-react';
import { fetchProductById, fetchProducts, incrementProductViewCount } from '../lib/products';
import type { Product } from '../lib/database.types';
import ProductCard from '../components/ourproduct-components/FeaturedProducts/ProductCard';
import { useToast } from '../components/Toast';
import { COMPANY_INFO } from '../components/Footer/constants';
import { useFavorites } from '../lib/favorites';

// Helper function to get flag icon path
const getOriginIcon = (origin: string): string | null => {
  const iconMap: Record<string, string> = {
    'Morocco': '/flags/morocco_flag_icon.svg',
    'Algeria': '/flags/algeria_flag_icon.svg',
    'Tunisia': '/flags/tunisia_flag_icon.svg',
    'Orient': '/flags/orient_middle_east_flag_icon.svg',
  };
  return iconMap[origin] || null;
};

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const mainImageWrapRef = useRef<HTMLDivElement | null>(null);
  const viewCountIncrementedRef = useRef(false);
  const { success } = useToast();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    const loadProduct = async () => {
      if (!id) {
        navigate('/products');
        return;
      }

      const productData = await fetchProductById(id);
      if (!productData) {
        navigate('/products');
        return;
      }

      setProduct(productData);
      
      // Increment view count only once (prevents double increment in React StrictMode)
      if (!viewCountIncrementedRef.current) {
        incrementProductViewCount(id);
        viewCountIncrementedRef.current = true;
      }
      
      // Load suggested products from same category
      const allProducts = await fetchProducts();
      const suggested = allProducts
        .filter(p => p.category_id === productData.category_id && p.id !== productData.id)
        .slice(0, 4);
      setSuggestedProducts(suggested);
      
      setLoading(false);
    };

    loadProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const images = [product.image_url, ...(product.images || [])].filter(Boolean);

  return (
    <>
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-gray-900">Home</button>
            <span>›</span>
            <button onClick={() => navigate('/products')} className="hover:text-gray-900">Products</button>
            <span>›</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-gray-200 bg-white/80 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[12px] font-medium text-blue-700">
              {getOriginIcon(product.origin) && (
                <img src={getOriginIcon(product.origin)!} alt={`${product.origin} flag`} className="w-[18px] h-[18px] object-contain" />
              )}
              {product.origin}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] font-semibold"
              style={{
                borderColor: product.in_stock ? 'rgba(98,157,35,0.25)' : 'rgba(220,38,38,0.25)',
                color: product.in_stock ? '#3e6f18' : '#991b1b',
                background: product.in_stock ? 'rgba(98,157,35,0.08)' : 'rgba(220,38,38,0.08)'
              }}
            >
              {product.in_stock ? <CheckCircle className="h-[14px] w-[14px]" /> : <Package className="h-[14px] w-[14px]" />}
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.sku && (
              <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[12px] font-medium text-gray-700">
                <Barcode className="h-[14px] w-[14px]" />
                SKU: {product.sku}
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[12px] font-medium text-purple-700">
              <Eye className="h-[14px] w-[14px]" />
              <span>{(product.viewer_count || 0).toLocaleString()}</span> views
            </span>
            {product.new_arrival && (
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-600 px-2.5 py-1 text-[12px] font-bold text-white shadow-sm">
                <Sparkles className="h-[14px] w-[14px]" />
                New Arrival
              </span>
            )}
            {product.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-500 px-2.5 py-1 text-[12px] font-extrabold text-white shadow-sm">
                <Award className="h-[14px] w-[14px]" />
                Featured
              </span>
            )}
          </div>
        </div>
      </div>

      <section className="py-12 pb-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Product Gallery */}
            <div className="lg:col-span-7 space-y-4" data-aos="fade-up">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-2 md:p-3">
                {/* Gallery header */}
                <div className="flex items-center justify-between px-1 pb-2">
                  <div className="inline-flex items-center gap-2 text-[12px] font-medium text-gray-600">
                    <Images className="h-4 w-4" />
                    Gallery · <span>{selectedImage + 1}/{images.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-gray-600">{selectedImage + 1} / {images.length}</span>
                  </div>
                </div>

                {/* Main image */}
                <div
                  ref={mainImageWrapRef}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                  style={{ perspective: '1200px' }}
                >
                  <img
                    src={images[selectedImage]}
                    alt={product.title}
                    className="h-[360px] w-full object-contain transition-transform duration-300 ease-out md:h-[480px]"
                  />

                  {/* Image navigation arrows */}
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-800 shadow-lg backdrop-blur opacity-0 transition-all hover:bg-white hover:scale-110 group-hover:opacity-100 focus-visible:opacity-100"
                    onClick={() => setSelectedImage((i) => (i > 0 ? i - 1 : images.length - 1))}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-800 shadow-lg backdrop-blur opacity-0 transition-all hover:bg-white hover:scale-110 group-hover:opacity-100 focus-visible:opacity-100"
                    onClick={() => setSelectedImage((i) => (i < images.length - 1 ? i + 1 : 0))}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Image badge */}
                  <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50/90 px-2 py-1 text-[11px] font-semibold text-green-700 backdrop-blur shadow-sm">
                    <Award className="h-3.5 w-3.5" />
                    Premium Quality
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="mt-3 grid grid-cols-5 gap-2" role="tablist" aria-label="Product images">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`group relative overflow-hidden rounded-lg border-2 bg-white p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 ${selectedImage === idx ? 'border-red-500' : 'border-gray-200'}`}
                      role="tab"
                      aria-selected={selectedImage === idx}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img src={img} alt="" className="h-20 w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    </button>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 ease-out"
                    style={{ width: `${((selectedImage + 1) / images.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <aside className="lg:col-span-5">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6 sticky top-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-5 w-1 rounded-full bg-red-600" />
                      <h1 className="text-[40px] leading-tight tracking-tight font-semibold text-gray-900">{product.title}</h1>
                    </div>
                    <p className="mt-1 text-[15px] text-gray-600">{product.description}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[12px] font-medium text-blue-700">
                        {getOriginIcon(product.origin) && (
                          <img src={getOriginIcon(product.origin)!} alt={`${product.origin} flag`} className="w-[18px] h-[18px] object-contain" />
                        )}
                        {product.origin}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] font-semibold"
                        style={{
                          borderColor: product.in_stock ? 'rgba(98,157,35,0.25)' : 'rgba(220,38,38,0.25)',
                          color: product.in_stock ? '#3e6f18' : '#991b1b',
                          background: product.in_stock ? 'rgba(98,157,35,0.08)' : 'rgba(220,38,38,0.08)'
                        }}
                      >
                        {product.in_stock ? <CheckCircle className="h-[14px] w-[14px]" /> : <Package className="h-[14px] w-[14px]" />}
                        {product.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                      {product.sku && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[12px] font-medium text-gray-700">
                          <Barcode className="h-[14px] w-[14px]" />
                          SKU: {product.sku}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Trust chips */}
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <div className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50/70 px-3 py-2 text-[12px] font-medium text-orange-700">
                    <img src="/icons/features/fast_delivery_truck_icon.svg" alt="Fast Delivery" className="h-5 w-5" />
                    Fast Delivery
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50/70 px-3 py-2 text-[12px] font-medium text-green-700">
                    <img src="/icons/features/quality_checked_shield_with_checkmark.svg" alt="Quality Checked" className="h-5 w-5" />
                    Quality Checked
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-3 py-2 text-[12px] font-medium text-blue-700">
                    <img src="/icons/features/authentic_sourcing_globe_icon.svg" alt="Authentic Sourcing" className="h-5 w-5" />
                    Authentic Sourcing
                  </div>
                </div>

                {/* Price / Info */}
                <div className="mt-5 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Lottie
                        animationData={null}
                        path="https://assets-v2.lottiefiles.com/a/4369945c-1189-11ee-91c3-13782da42b93/Wz055eYDMD.json"
                        loop={true}
                        autoplay={true}
                        style={{ width: 70, height: 70 }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-gray-900">Wholesale pricing</p>
                      <p className="text-[13px] text-gray-600">Available on request • MOQ varies</p>
                      <p className="text-[11px] text-gray-500">Tell us your volumes and route windows</p>
                    </div>
                  </div>
                </div>

                {/* Primary CTA block */}
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      onClick={() => navigate('/contact')}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-red-600 px-4 py-3 text-[14px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:w-auto"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Talk to our wholesale team
                    </button>
                    <div className="flex w-full gap-2 sm:w-auto">
                      <a
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-gray-800 hover:bg-gray-50 transition-all hover:scale-105 sm:flex-none"
                      >
                        <img src="/icons/contact/phone_call_icon_for_wholesale_contact.svg" alt="Call" className="h-5 w-5" />
                        Call
                      </a>
                      <a
                        href={`mailto:${COMPANY_INFO.email}?subject=Wholesale%20Inquiry%20-%20${encodeURIComponent(product.title)}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-gray-800 hover:bg-gray-50 transition-all hover:scale-105 sm:flex-none"
                      >
                        <img src="/icons/contact/email_envelope_icon_for_contact.svg" alt="Email" className="h-5 w-5" />
                        Email
                      </a>
                    </div>
                  </div>
                  <p className="mt-2 text-[12px] text-gray-500">
                    Serving New Brunswick and the Maritimes with reliable cold‑chain logistics.
                  </p>
                </div>

                {/* Quick actions */}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => { 
                      toggleFavorite(product.id); 
                      success(isFavorite(product.id) ? 'Removed from favorites' : 'Added to favorites!'); 
                    }}
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-[13px] font-semibold text-gray-800 hover:bg-gray-50 transition-all hover:scale-105"
                    title={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'text-red-500 fill-red-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-[13px] font-semibold text-gray-800 hover:bg-gray-50 transition-all hover:scale-105"
                  >
                    <ShareIcon />
                    Share
                  </button>
                </div>

                {/* Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-[20px] tracking-tight font-semibold text-gray-900">Why kitchens choose this</h2>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-3 transition-all hover:shadow-md hover:-translate-y-0.5">
                          <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.05), rgba(255,255,255,0))' }} />
                          <div className="relative z-10 flex items-start gap-3">
                            <div className="rounded-full bg-green-100 p-1.5 text-green-700 transition-transform group-hover:scale-110">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-[14px] font-semibold text-gray-900">{benefit}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Detailed Description */}
                <div className="mt-6">
                  <h2 className="text-[20px] tracking-tight font-semibold text-gray-900">Product details</h2>
                  <div className="mt-2">
                    <p className="text-[14px] text-gray-700">{product.description}</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Suggested Products */}
            {suggestedProducts.length > 0 && (
              <div className="lg:col-span-12 mt-12" data-aos="fade-up">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[24px] tracking-tight font-semibold text-gray-900">You may also like</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {suggestedProducts.map((suggestedProduct) => (
                    <ProductCard
                      key={suggestedProduct.id}
                      product={{
                        id: suggestedProduct.id,
                        title: suggestedProduct.title,
                        category: suggestedProduct.category_id || 'Uncategorized',
                        priceDisplay: '',
                        price: 0,
                        wholesalePrice: '',
                        minOrderQty: 0,
                        imageSrc: suggestedProduct.image_url,
                        description: suggestedProduct.description,
                        inStock: suggestedProduct.in_stock,
                        origin: suggestedProduct.origin,
                        featured: suggestedProduct.featured,
                        newArrival: suggestedProduct.new_arrival,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Share Modal */}
      {shareModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShareModalOpen(false)}
        >
          <div 
            className="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-gray-900">Share this product</h3>
              <button 
                onClick={() => setShareModalOpen(false)}
                className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              <button 
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                  setShareModalOpen(false);
                }}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-medium text-gray-700">Facebook</span>
              </button>
              <button 
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product?.title || '')}`, '_blank');
                  setShareModalOpen(false);
                }}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-medium text-gray-700">Twitter</span>
              </button>
              <button 
                onClick={() => {
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
                  setShareModalOpen(false);
                }}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-medium text-gray-700">LinkedIn</span>
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  success('Link copied to clipboard!');
                  setShareModalOpen(false);
                }}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <span className="text-[11px] font-medium text-gray-700">Copy</span>
              </button>
            </div>
            <div className="mt-4">
              <input 
                type="text" 
                readOnly 
                value={window.location.href}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Share icon component
function ShareIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98" />
      <path d="M15.41 6.51L8.59 10.49" />
    </svg>
  );
}
