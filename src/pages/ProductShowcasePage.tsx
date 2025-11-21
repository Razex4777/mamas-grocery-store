import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Eye, Package, Sparkles, Zap, ArrowRight, X, Search, Filter, Check, ShoppingCart, MessageCircle, Heart, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { fetchProducts } from '../lib/products';
import { fetchCategories, subscribeToCategoryChanges } from '../lib/categories';
import type { Category, Product } from '../lib/database.types';
import NewsletterSection from '../components/ourproduct-components/NewsletterSection';
import { useFavorites } from '../lib/favorites';

const ORIGINS = ['All', 'Morocco', 'Algeria', 'Tunisia', 'Orient', 'Africa', 'Europe'];
const ORIGIN_LABELS: Record<string, string> = {
  All: 'Toutes les origines',
  Morocco: 'Maroc',
  Algeria: 'Algérie',
  Tunisia: 'Tunisie',
  Orient: 'Orient',
  Africa: 'Afrique',
  Europe: 'Europe',
};
const SORT_OPTIONS = [
  { value: 'default', label: 'Tri par défaut' },
  { value: 'name-asc', label: 'Nom : A à Z' },
  { value: 'name-desc', label: 'Nom : Z à A' },
  { value: 'newest', label: 'Plus récent en premier' },
];
const AVAILABILITY_LABELS: Record<'All' | 'In Stock' | 'Out of Stock', string> = {
  All: 'Tout',
  'In Stock': 'En stock',
  'Out of Stock': 'Rupture de stock',
};

const getOriginLabel = (origin: string) => ORIGIN_LABELS[origin] ?? origin;

// Helper function to get flag icon path
const getOriginIcon = (origin: string): string | null => {
  const iconMap: Record<string, string> = {
    'Morocco': '/flags/morocco_flag_icon.svg',
    'Algeria': '/flags/algeria_flag_icon.svg',
    'Tunisia': '/flags/tunisia_flag_icon.svg',
    'Orient': '/flags/orient_middle_east_flag_icon.svg',
    'Africa': '/flags/africa_icon.svg',
    'Europe': '/flags/europe_flag_icon.svg',
  };
  return iconMap[origin] || null;
};

export default function ProductShowcasePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Support multiple categories
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([]); // For multi-select in modal
  const [selectedOrigin, setSelectedOrigin] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState<'All' | 'In Stock' | 'Out of Stock'>('All');
  const [highlightFeatured, setHighlightFeatured] = useState(false);
  const [highlightNewArrival, setHighlightNewArrival] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Max products to show per page

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to load data:', error);
        // Optionally set error state or show notification
      }
    };

    loadData();
    const channel = subscribeToCategoryChanges(setCategories);
    return () => { channel.unsubscribe(); };
  }, []);

  // Handle URL parameters for category filtering (e.g., from footer links)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [location.search]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Add Escape key handler for category modal
  useEffect(() => {
    if (!showCategoryModal) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCategoryModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showCategoryModal]);
  
  const getProductCount = (categoryId: string | null) => {
    if (categoryId === null) return products.length;
    return products.filter(p => p.category_id === categoryId).length;
  };
  
  // Reset filters handler
  const resetFilters = () => {
    setSelectedCategories([]);
    setTempSelectedCategories([]);
    setSelectedOrigin('All');
    setSearchTerm('');
    setStockFilter('All');
    setHighlightFeatured(false);
    setHighlightNewArrival(false);
    setShowFavoritesOnly(false);
  };

  // Handle opening modal - initialize temp selection
  const handleOpenModal = () => {
    setTempSelectedCategories(selectedCategories);
    setShowCategoryModal(true);
  };

  // Handle applying category filter - NOW SUPPORTS MULTIPLE!
  const handleApplyCategoryFilter = () => {
    setSelectedCategories(tempSelectedCategories);
    setShowCategoryModal(false);
  };

  // Handle clearing category filter in modal
  const handleClearCategoryFilter = () => {
    setTempSelectedCategories([]);
  };

  // Toggle category selection in modal
  const toggleCategorySelection = (categoryId: string | null) => {
    if (categoryId === null) {
      setTempSelectedCategories([]);
    } else {
      setTempSelectedCategories(prev => 
        prev.includes(categoryId) 
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    }
  };

  const filteredProducts = products.filter(product => {
      const productCategory = categories.find(c => c.id === product.category_id);
      const matchesCategory = selectedCategories.length === 0 || (product.category_id && selectedCategories.includes(product.category_id));
      const matchesOrigin = selectedOrigin === 'All' || (productCategory?.origin === selectedOrigin);
      const matchesSearch =
        searchTerm.trim() === '' ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStock =
        stockFilter === 'All' || (stockFilter === 'In Stock' ? product.in_stock : !product.in_stock);
      const matchesFeatured = !highlightFeatured || product.featured;
      const matchesNew = !highlightNewArrival || product.new_arrival;
      const matchesFavorites = !showFavoritesOnly || favorites.includes(product.id);
      return (
        matchesCategory &&
        matchesOrigin &&
        matchesSearch &&
        matchesStock &&
        matchesFeatured &&
        matchesNew &&
        matchesFavorites
      );
  }).sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.title.localeCompare(b.title);
        case 'name-desc': return b.title.localeCompare(a.title);
        case 'newest': {
          const timeA = new Date(a.created_at).getTime();
          const timeB = new Date(b.created_at).getTime();
          const safeTimeA = isNaN(timeA) ? 0 : timeA;
          const safeTimeB = isNaN(timeB) ? 0 : timeB;
          return safeTimeB - safeTimeA;
        }
        default: return 0;
      }
    });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedOrigin, searchTerm, stockFilter, highlightFeatured, highlightNewArrival, showFavoritesOnly, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const renderFilterSections = () => (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5 text-green-600" /> Filtres
        </h3>
        {(selectedCategories.length > 0 || selectedOrigin !== 'All' || searchTerm || stockFilter !== 'All' || highlightFeatured || highlightNewArrival || showFavoritesOnly) && (
          <button
            onClick={resetFilters}
            className="text-xs text-gray-600 hover:text-green-700 underline"
          >
            Tout réinitialiser
          </button>
        )}
      </div>

      <div>
        <button
          onClick={handleOpenModal}
          className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Package className="w-5 h-5" />
          {selectedCategories.length > 0
            ? selectedCategories.length === 1
              ? categories.find(c => c.id === selectedCategories[0])?.name || 'Parcourir les catégories'
              : `${selectedCategories.length} catégories sélectionnées`
            : 'Parcourir les catégories'}
          {selectedCategories.length > 0 && (
            <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
          )}
        </button>
        {selectedCategories.length > 0 && (
          <p className="text-xs text-gray-600 mt-2 text-center">
            {selectedCategories.length === 1 ? 'Filtré par catégorie' : `Filtrage par ${selectedCategories.length} catégories`} • <button onClick={() => { setSelectedCategories([]); setTempSelectedCategories([]); }} className="text-green-700 hover:underline">Effacer</button>
          </p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Origine</h3>
        <div className="space-y-2">
          {ORIGINS.map(origin => {
            const iconPath = getOriginIcon(origin);
            return (
              <button 
                key={origin} 
                onClick={() => setSelectedOrigin(origin)} 
                className={`w-full px-4 py-3 text-sm font-medium rounded-lg transition-all flex items-center gap-3 ${selectedOrigin === origin ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-700 border hover:bg-gray-100 hover:border-green-500'}`}
              >
                {iconPath && (
                  <img src={iconPath} alt={`${origin} flag`} className="w-5 h-5 object-contain" />
                )}
                <span className="flex-1 text-left">{getOriginLabel(origin)}</span>
                {selectedOrigin === origin && (
                  <span className="w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Disponibilité</h3>
        <div className="grid grid-cols-3 gap-2">
          {(['All', 'In Stock', 'Out of Stock'] as const).map(option => (
            <button
              key={option}
              onClick={() => setStockFilter(option)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all border ${
                stockFilter === option
                  ? 'bg-green-600 text-white border-green-600 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-green-500 hover:bg-gray-50'
              }`}
            >
              {AVAILABILITY_LABELS[option]}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Mises en avant</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setHighlightFeatured(prev => !prev)}
            className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-full border transition-all ${
              highlightFeatured ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-white text-gray-700 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
            }`}
          >
            {highlightFeatured && <Check className="w-4 h-4" />}
            En vedette
          </button>
          <button
            onClick={() => setHighlightNewArrival(prev => !prev)}
            className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-full border transition-all ${
              highlightNewArrival ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            {highlightNewArrival && <Check className="w-4 h-4" />}
            Nouvelle arrivée
          </button>
          <button
            onClick={() => setShowFavoritesOnly(prev => !prev)}
            className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-full border transition-all ${
              showFavoritesOnly ? 'bg-red-100 text-red-800 border-red-300' : 'bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-red-800' : ''}`} />
            Favoris {favorites.length > 0 && `(${favorites.length})`}
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Tri</h3>
        <div className="space-y-2">
          {SORT_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`w-full px-4 py-3 text-sm font-medium rounded-lg transition-all text-left ${sortBy === option.value ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-700 border hover:bg-gray-100 hover:border-green-500'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <div 
        className="min-h-screen text-gray-800 relative"
        style={{
          backgroundImage: 'url(/backgrounds/product-page-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Top Green Gradient Fade */}
        <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-500/40 to-transparent z-0 pointer-events-none" />
        
        {/* Bottom Green Gradient Fade */}
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-600/40 to-transparent z-0 pointer-events-none" />
        {/* Hero / Promo Welcomer */}
        <section className="relative overflow-hidden" data-aos="fade-down">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div 
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: 'url(/images/promo-banner-bg-v3.png)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/50 via-amber-500/30 to-orange-500/40 mix-blend-multiply" />
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm">
                <Zap className="h-4 w-4" />
                Qualité de Confiance
              </span>

              {/* Main Heading */}
              <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                Produits Frais
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Bienvenue chez Mama's Grocery Store. Votre source de confiance pour des produits de qualité supérieure et un service exceptionnel. Découvrez notre sélection soigneusement élaborée.
              </p>


              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const productsSection = document.getElementById('products');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-white/90 transition-all hover:scale-105 shadow-lg cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Explorer les Produits
                </button>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/15 backdrop-blur-sm transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  Parlez-nous
                </a>
              </div>
            </div>

            {/* Hero Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 max-w-5xl">
              <div className="rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/15 backdrop-blur-sm hover:bg-white/15 transition-all">
                <div className="text-xl sm:text-2xl font-semibold tracking-tight">{categories.length}</div>
                <div className="text-xs sm:text-sm text-white/90">Catégories dynamiques</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/15 backdrop-blur-sm hover:bg-white/15 transition-all">
                <div className="text-xl sm:text-2xl font-semibold tracking-tight">{products.length}</div>
                <div className="text-xs sm:text-sm text-white/90">Produits premium</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/15 backdrop-blur-sm hover:bg-white/15 transition-all">
                <div className="text-xl sm:text-2xl font-semibold tracking-tight">24h</div>
                <div className="text-xs sm:text-sm text-white/90">Temps de réponse</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/15 backdrop-blur-sm hover:bg-white/15 transition-all">
                <div className="text-xl sm:text-2xl font-semibold tracking-tight">A+</div>
                <div className="text-xs sm:text-sm text-white/90">Qualité des produits</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/15 backdrop-blur-sm hover:bg-white/15 transition-all">
                <div className="text-xl sm:text-2xl font-semibold tracking-tight">{products.filter(p => p.new_arrival).length}</div>
                <div className="text-xs sm:text-sm text-white/90">Nouvelles arrivées</div>
              </div>
            </div>
          </div>

          {/* Green Gradient Fade-out at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-600/60 via-emerald-500/30 to-transparent pointer-events-none" />
        </section>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-12 max-w-[1920px]">
          {/* Main Content Area */}
          <main id="products" className="rounded-3xl shadow-xl border border-white/20 ring-1 ring-gray-200/50 p-6 md:p-10" style={{ background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }} data-aos="fade-up">
            {/* Header Section */}
            <div className="text-center md:text-left md:flex md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
                  Produits Frais
                </h1>
                <p className="text-base text-gray-600 max-w-2xl mx-auto md:mx-0">
                  Parcourez notre catalogue pensé comme un showroom numérique : qualité premium et sélection raffinée.
                </p>
              </div>
              <Link to="/contact" className="hidden md:flex items-center gap-2 mt-4 md:mt-0 px-6 py-3 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-900 transition-colors">
                Contactez-nous
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Ambient Stats */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 mb-10">
              <span className="flex items-center gap-2"><Package size={16} /> {categories.length} catégories dynamiques</span>
              <span className="flex items-center gap-2"><Sparkles size={16} /> {products.length} produits premium</span>
              <span className="flex items-center gap-2"><Zap size={16} /> Expérience de showroom numérique</span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <aside className="lg:col-span-1 hidden lg:block">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-24 space-y-6" data-aos="fade-right">
                  {renderFilterSections()}
                </div>
              </aside>

              {/* Products List */}
              <div className="lg:col-span-3">
                {/* Search and Active Filters */}
                <div className="space-y-4 mb-6" data-aos="fade-up">
                  {/* Search + Mobile Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Recherchez des produits par nom ou description..."
                        className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                          aria-label="Effacer la recherche"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => setShowMobileFilters(true)}
                      className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:border-green-600 hover:text-green-700 hover:bg-green-50 transition-all lg:hidden"
                      aria-label="Ouvrir les filtres"
                    >
                      <SlidersHorizontal className="w-5 h-5" />
                      Filtres
                      {(selectedCategories.length > 0 || selectedOrigin !== 'All' || stockFilter !== 'All' || highlightFeatured || highlightNewArrival || showFavoritesOnly) && (
                        <span className="text-xs font-bold text-emerald-700">•</span>
                      )}
                    </button>
                  </div>

                  {/* Active Filter Chips */}
                  {(selectedCategories.length > 0 || selectedOrigin !== 'All' || searchTerm || stockFilter !== 'All' || highlightFeatured || highlightNewArrival || showFavoritesOnly) && (
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex flex-wrap gap-2">
                        {searchTerm && (
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                            Recherche : <span className="font-semibold">{searchTerm}</span>
                            <button onClick={() => setSearchTerm('')} className="hover:text-red-600" aria-label="Supprimer la recherche"><X className="w-3.5 h-3.5" /></button>
                          </span>
                        )}
                        {selectedCategories.map(catId => (
                          <span key={catId} className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Catégorie : <span className="font-semibold">{categories.find(c => c.id === catId)?.name || 'Sélectionnée'}</span>
                            <button onClick={() => setSelectedCategories(prev => prev.filter(id => id !== catId))} className="hover:text-red-600" aria-label="Supprimer la catégorie"><X className="w-3.5 h-3.5" /></button>
                          </span>
                        ))}
                        {selectedOrigin !== 'All' && (
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full bg-green-50 text-green-700 border border-green-200">
                            Origine : <span className="font-semibold">{getOriginLabel(selectedOrigin)}</span>
                            <button onClick={() => setSelectedOrigin('All')} className="hover:text-red-600" aria-label="Supprimer l'origine"><X className="w-3.5 h-3.5" /></button>
                          </span>
                        )}
                        {stockFilter !== 'All' && (
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            Disponibilité : <span className="font-semibold">{AVAILABILITY_LABELS[stockFilter]}</span>
                            <button onClick={() => setStockFilter('All')} className="hover:text-red-600" aria-label="Supprimer la disponibilité"><X className="w-3.5 h-3.5" /></button>
                          </span>
                        )}
                        {highlightFeatured && (
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full bg-yellow-50 text-yellow-800 border border-yellow-200">
                            En vedette
                            <button onClick={() => setHighlightFeatured(false)} className="hover:text-red-600" aria-label="Supprimer le filtre vedette"><X className="w-3.5 h-3.5" /></button>
                          </span>
                        )}
                        {highlightNewArrival && (
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                            Nouvelle arrivée
                            <button onClick={() => setHighlightNewArrival(false)} className="hover:text-red-600" aria-label="Supprimer le filtre nouvelles arrivées"><X className="w-3.5 h-3.5" /></button>
                          </span>
                        )}
                        {showFavoritesOnly && (
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full bg-red-50 text-red-700 border border-red-200">
                            <Heart className="w-3.5 h-3.5 fill-red-700" />
                            Favoris uniquement
                            <button onClick={() => setShowFavoritesOnly(false)} className="hover:text-red-600" aria-label="Supprimer le filtre favoris"><X className="w-3.5 h-3.5" /></button>
                          </span>
                        )}
                      </div>
                      <button
                        onClick={resetFilters}
                        className="text-xs font-semibold text-gray-600 hover:text-green-700 underline"
                      >
                        Réinitialiser tous les filtres
                      </button>
                    </div>
                  )}

                  {/* Product Count */}
                  <div className="flex items-center justify-between">
                    <p className="text-base font-medium text-gray-600">
                      Affichage <span className="font-bold text-gray-900">{startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}</span> sur <span className="font-bold text-gray-900">{filteredProducts.length}</span> produit(s)
                    </p>
                    {totalPages > 1 && (
                      <p className="text-sm text-gray-500">
                        Page {currentPage} sur {totalPages}
                      </p>
                    )}
                  </div>
                </div>

                {/* Products */}
                {paginatedProducts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {paginatedProducts.map((product, index) => (
                        <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-lg border border-white/20 ring-1 ring-gray-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                      >
                        <div className="relative flex items-center justify-center p-4 sm:p-6 h-48 sm:h-56 bg-gradient-to-br from-gray-50/50 to-white/30">
                          {/* Badges with glass effect - no overlap */}
                          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                            {product.new_arrival && (
                              <div className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full ring-1 ring-blue-600/20 w-fit">
                                Nouvelle arrivée
                              </div>
                            )}
                            {product.featured && (
                              <div className="bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-extrabold px-2 py-1 rounded-full ring-1 ring-amber-500/20 w-fit">
                                En vedette
                              </div>
                            )}
                          </div>
                          
                          {/* Favorite button - top right, appears on hover */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(product.id);
                            }}
                            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg"
                            title={isFavorite(product.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                          >
                            <Heart 
                              className={`h-5 w-5 transition-colors ${
                                isFavorite(product.id) 
                                  ? 'text-red-500 fill-red-500' 
                                  : 'text-gray-600'
                              }`}
                            />
                          </button>
                          
                          <img src={product.image_url} alt={product.title} className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        </div>
                        <div className="p-4 sm:p-5 flex flex-col flex-grow bg-white/60 backdrop-blur-sm">
                          <div className="flex items-center justify-between text-[11px] sm:text-xs mb-2">
                            <span className="text-gray-600">{categories.find(c => c.id === product.category_id)?.origin || 'N/A'}</span>
                            <span className={product.in_stock ? 'inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-100/80 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] ring-1 ring-emerald-600/20' : 'inline-flex items-center gap-1 text-red-700 font-semibold bg-red-100/80 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] ring-1 ring-red-600/20'}>
                              {product.in_stock ? 'En stock' : 'Rupture de stock'}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 text-base md:text-lg leading-snug flex-grow group-hover:text-emerald-600 transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">
                            {product.description}
                          </p>
                          <button onClick={() => navigate(`/product/${product.id}`)} className="w-full mt-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-sm font-bold py-2 sm:py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ring-1 ring-emerald-600/20">
                            <Eye size={16} />
                            Voir les détails
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2" data-aos="fade-up">
                      {/* Previous Button */}
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:border-green-700 hover:text-green-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-700 disabled:hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <ChevronLeft size={20} />
                        <span className="hidden md:inline">Précédente</span>
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          // Show first page, last page, current page, and pages around current
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg ${
                                  currentPage === page
                                    ? 'bg-gradient-to-br from-green-700 to-green-600 text-white scale-110 ring-2 ring-green-700 ring-offset-2'
                                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-green-700 hover:text-green-700 hover:bg-green-50'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="text-gray-400 px-2">•••</span>;
                          }
                          return null;
                        })}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:border-green-700 hover:text-green-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-700 disabled:hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <span className="hidden md:inline">Suivante</span>
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                  </>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-12 text-center" data-aos="fade-up">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun produit trouvé</h3>
                    <p className="text-sm text-gray-600">Essayez d'ajuster vos filtres pour trouver ce que vous recherchez.</p>
                    <button onClick={() => { setSelectedCategories([]); setSelectedOrigin('All'); }} className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm">
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Mobile Filters Drawer */}
        {showMobileFilters && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setShowMobileFilters(false)} />
            <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white shadow-2xl p-6 space-y-6 animate-in slide-in-from-bottom-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Filtres intelligents</h3>
                  <p className="text-sm text-gray-500">Affinez votre recherche en quelques taps</p>
                </div>
                <button onClick={() => setShowMobileFilters(false)} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto space-y-6 pr-1">
                {renderFilterSections()}
              </div>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Appliquer les filtres
              </button>
            </div>
          </>
        )}

        {/* Professional Category Modal */}
        {showCategoryModal && (
          <>
            {/* Backdrop with animation */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in-0 duration-300"
              onClick={() => setShowCategoryModal(false)}
            />
            
            {/* Modal Panel with slide-up animation */}
            <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 w-auto md:max-w-4xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 fade-in-0 zoom-in-95 duration-300">
              {/* Header - Fixed */}
              <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 px-6 md:px-8 py-5 border-b border-gray-700 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">Parcourir les catégories</h2>
                    <p className="text-gray-300 text-xs md:text-sm mt-1">Sélectionnez une catégorie pour filtrer les produits</p>
                  </div>
                  <button
                    onClick={() => setShowCategoryModal(false)}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 px-4 md:px-6 py-5">
                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* All Products */}
                  <button
                    type="button"
                    onClick={() => toggleCategorySelection(null)}
                    className={`group relative flex flex-col items-center gap-2.5 p-4 rounded-xl transition-all duration-200 ${
                      tempSelectedCategories.length === 0
                        ? 'bg-green-50 border-2 border-green-600 shadow-md' 
                        : 'bg-gray-50 border border-gray-200 hover:border-green-500 hover:shadow-md'
                    }`}
                  >
                    {/* Circular Image */}
                    <div className={`relative w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                      tempSelectedCategories.length === 0
                        ? 'border-green-600 ring-4 ring-green-100' 
                        : 'border-gray-300 group-hover:border-green-500'
                    }`}>
                      <div className={`w-full h-full flex items-center justify-center ${
                        tempSelectedCategories.length === 0 ? 'bg-green-600' : 'bg-white group-hover:bg-green-50'
                      }`}>
                        <Package className={`w-7 h-7 ${
                          tempSelectedCategories.length === 0 ? 'text-white' : 'text-gray-700 group-hover:text-green-600'
                        }`} />
                      </div>
                      {tempSelectedCategories.length === 0 && (
                        <div className="absolute inset-0 bg-green-600/90 flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="text-center">
                      <p className={`text-sm font-semibold ${
                        tempSelectedCategories.length === 0 ? 'text-green-700' : 'text-gray-900 group-hover:text-green-700'
                      }`}>
                        Tous les produits
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {getProductCount(null)} articles
                      </p>
                    </div>
                  </button>

                  {/* Dynamic Categories from Supabase */}
                  {categories.map((category) => {
                    const isSelected = tempSelectedCategories.includes(category.id);
                    
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => toggleCategorySelection(category.id)}
                        className={`group relative flex flex-col items-center gap-2.5 p-4 rounded-xl transition-all duration-200 ${
                          isSelected
                            ? 'bg-green-50 border-2 border-green-600 shadow-md' 
                            : 'bg-gray-50 border border-gray-200 hover:border-green-500 hover:shadow-md'
                        }`}
                      >
                        {/* Circular Image */}
                        <div className={`relative w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                          isSelected 
                            ? 'border-green-600 ring-4 ring-green-100' 
                            : 'border-gray-300 group-hover:border-green-500'
                        }`}>
                          {category.image_url ? (
                            <img 
                              src={category.image_url} 
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center ${
                              isSelected ? 'bg-green-600' : 'bg-gradient-to-br from-gray-200 to-gray-300 group-hover:from-green-100 group-hover:to-green-200'
                            }`}>
                              <span className={`text-xl font-bold ${
                                isSelected ? 'text-white' : 'text-gray-700 group-hover:text-green-700'
                              }`}>
                                {category.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          
                          {/* Checkmark Overlay */}
                          {isSelected && (
                            <div className="absolute inset-0 bg-green-600/90 flex items-center justify-center">
                              <Check className="w-6 h-6 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>

                        {/* Text */}
                        <div className="text-center">
                          <div className={`text-sm font-semibold line-clamp-2 min-h-[2.5rem] flex flex-col items-center justify-center ${
                            isSelected ? 'text-green-700' : 'text-gray-900 group-hover:text-green-700'
                          }`}>
                            <span>{category.name}</span>
                            {category.origin && (
                              <span className="text-[10px] font-normal opacity-75">
                                ({getOriginLabel(category.origin)})
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {getProductCount(category.id)} articles
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Stats Footer */}
                <div className="mt-6 pt-5 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-6 md:gap-8 text-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <Package className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold text-gray-900">{categories.length}</div>
                        <div className="text-xs text-gray-500">Categories</div>
                      </div>
                    </div>
                    <div className="w-px h-10 bg-gray-200"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold text-gray-900">{products.length}</div>
                        <div className="text-xs text-gray-500">Products</div>
                      </div>
                    </div>
                    <div className="w-px h-10 bg-gray-200"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold text-gray-900">100%</div>
                        <div className="text-xs text-gray-500">Quality</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer - Fixed at Bottom */}
              <div className="border-t border-gray-200 px-4 md:px-6 py-4 bg-gray-50 flex items-center justify-between gap-3 flex-shrink-0">
                <div className="text-sm text-gray-600">
                  {tempSelectedCategories.length > 0 ? (
                    <span className="font-semibold text-green-700">{tempSelectedCategories.length} selected</span>
                  ) : (
                    <span>Select categories to filter</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClearCategoryFilter}
                    className="px-4 md:px-5 py-2 md:py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-colors text-sm"
                  >
                    Effacer
                  </button>
                  <button
                    onClick={handleApplyCategoryFilter}
                    className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors shadow-md hover:shadow-lg text-sm flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Appliquer le filtre
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
