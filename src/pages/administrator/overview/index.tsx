import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { fetchCategories } from '../../../lib/categories';
import { fetchAllProducts } from '../../../lib/products';
import { getLatestHeartbeat, formatHeartbeatDate, daysSinceLastActivity, type ActivityHeartbeat } from '../../../lib/heartbeat';
import Lottie from 'lottie-react';

export default function OverviewPage() {
  const [stats, setStats] = useState({
    totalCategories: 0,
    activeCategories: 0,
    totalProducts: 0,
    activeProducts: 0,
  });
  const [heartbeat, setHeartbeat] = useState<ActivityHeartbeat | null>(null);
  
  // Only essential Lottie animations
  const [animations, setAnimations] = useState<{[key: string]: any}>({
    dashboard: null,
    heartbeat: null,
    success: null,
  });

  useEffect(() => {
    const loadStats = async () => {
      const categories = await fetchCategories();
      const products = await fetchAllProducts();
      const latestHeartbeat = await getLatestHeartbeat();
      
      setStats({
        totalCategories: categories.length,
        activeCategories: categories.filter(c => c.is_active).length,
        totalProducts: products.length,
        activeProducts: products.filter(p => p.in_stock).length,
      });
      setHeartbeat(latestHeartbeat);
    };
    loadStats();
    
    // Load only essential animations
    const animationUrls = {
      dashboard: "https://assets-v2.lottiefiles.com/a/87b27f4a-1169-11ee-a21c-1b864f6d33d7/1J1WrjFqCh.json",
      heartbeat: "https://assets-v2.lottiefiles.com/a/d39f59c4-117c-11ee-ab98-57c927219c4f/sgRdTC4CZS.json",
      success: "https://assets-v2.lottiefiles.com/a/7bd68a56-3992-11f0-8b0f-378bdf9408cf/9cS3GZAtaA.json",
    };

    Object.entries(animationUrls).forEach(([key, url]) => {
      fetch(url)
        .then(res => res.json())
        .then(data => setAnimations(prev => ({ ...prev, [key]: data })))
        .catch(err => console.error(`Failed to load ${key} animation:`, err));
    });
    
    // Refresh heartbeat every minute
    const interval = setInterval(async () => {
      const latestHeartbeat = await getLatestHeartbeat();
      setHeartbeat(latestHeartbeat);
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const stockPercent = stats.totalProducts > 0 ? Math.round((stats.activeProducts / stats.totalProducts) * 100) : 0;

  return (
    <AdminLayout>
      <div className="p-3 sm:p-4 md:p-6">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 p-4 md:p-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-sky-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-slate-800/50 p-2 backdrop-blur-sm border border-emerald-500/20 flex-shrink-0">
                <img src="/icons/dashboard/sparkles_magic.svg" alt="Dashboard" className="w-full h-full" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent truncate">
                  Tableau de Bord Analytique
                </h1>
                <p className="text-slate-400 text-[10px] md:text-xs mt-0.5 truncate">Métriques de performance en temps réel</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] md:text-xs text-slate-400 hidden sm:inline">En direct</span>
              </div>
              {animations.dashboard && (
                <div className="w-12 h-12 md:w-20 md:h-20 opacity-80 hidden sm:block">
                  <Lottie animationData={animations.dashboard} loop={true} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid with Animated Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
          <StatCard
            iconSrc="/icons/dashboard/category_folder_organization.svg"
            title="Catégories"
            value={stats.totalCategories}
            subtitle="Total d'articles"
            color="emerald"
            animationData={animations.success}
          />
          <StatCard
            iconSrc="/icons/dashboard/dashboard_analytics_chart_graph.svg"
            title="Actives"
            value={stats.activeCategories}
            subtitle="Publiées"
            color="teal"
            animationData={animations.success}
          />
          <StatCard
            iconSrc="/icons/dashboard/shopping_cart_products.svg"
            title="Produits"
            value={stats.totalProducts}
            subtitle="Total d'articles"
            color="cyan"
            animationData={animations.success}
          />
          <StatCard
            iconSrc="/icons/dashboard/trending_up_growth_arrow.svg"
            title="En Stock"
            value={stats.activeProducts}
            subtitle="Disponibles"
            color="sky"
            animationData={animations.success}
          />
        </div>

        {/* Professional Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4 my-4 md:my-6">
          {/* Categories Breakdown */}
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl shadow-lg shadow-purple-500/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-500/40 to-purple-600/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-semibold text-sm md:text-base truncate">Répartition des Catégories</h3>
                  <p className="text-slate-400 text-[10px] md:text-xs truncate">Total des catégories disponibles</p>
                </div>
              </div>
              <div className="px-2.5 md:px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] md:text-xs text-purple-300 font-medium self-start sm:self-center whitespace-nowrap">
                Chaque catégorie en direct
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 md:gap-10">
              {/* Donut Chart */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#categoriesGradient)"
                    strokeWidth="18"
                    strokeDasharray="251.2 251.2"
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="categoriesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(168 85 247)" />
                      <stop offset="100%" stopColor="rgb(14 165 233)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalCategories}</p>
                    <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">Catégories</p>
                  </div>
                </div>
              </div>

              {/* Legend - All Active */}
              <div className="w-full sm:flex-1 space-y-2.5 md:space-y-4">
                <div className="flex items-center justify-between bg-slate-800/30 border border-slate-700/40 rounded-lg md:rounded-xl p-2.5 md:p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-7 4h4m-9 5h14" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] md:text-xs text-slate-400 truncate">Collections Totales</p>
                      <p className="text-xs md:text-sm font-semibold text-white">{stats.totalCategories}</p>
                    </div>
                  </div>
                  <span className="text-[10px] md:text-xs text-slate-500 hidden sm:inline">Mis à jour en direct</span>
                </div>
                <div className="flex items-center justify-between bg-slate-800/20 border border-slate-700/30 rounded-lg md:rounded-xl p-2.5 md:p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs text-slate-400">Statut</p>
                      <p className="text-xs md:text-sm font-semibold text-emerald-400">Toutes Actives</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Stock Breakdown */}
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl shadow-lg shadow-cyan-500/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-500/40 to-sky-600/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-semibold text-sm md:text-base truncate">Statut du Stock de Produits</h3>
                  <p className="text-slate-400 text-[10px] md:text-xs truncate">Répartition de l'inventaire</p>
                </div>
              </div>
              <div className="px-2.5 md:px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] md:text-xs text-cyan-300 font-medium self-start sm:self-center whitespace-nowrap">
                {stockPercent}% En Stock
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 md:gap-8">
              {/* Donut Chart */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgb(30 41 59)"
                    strokeWidth="18"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#productsGradient)"
                    strokeWidth="18"
                    strokeDasharray={`${stats.totalProducts > 0 ? (stats.activeProducts / stats.totalProducts * 251.2) : 0} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="productsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(34 211 238)" />
                      <stop offset="100%" stopColor="rgb(59 130 246)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalProducts}</p>
                    <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">Produits</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="w-full sm:flex-1 space-y-2 md:space-y-3">
                <div className="flex items-center justify-between py-2.5 md:py-3 px-2.5 md:px-3 bg-slate-800/30 rounded-lg md:rounded-xl border border-cyan-500/20">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] md:text-xs text-slate-400 truncate">En Stock</p>
                      <p className="text-xs md:text-sm font-semibold text-white truncate">{stats.activeProducts} articles</p>
                    </div>
                  </div>
                  <span className="text-[10px] md:text-xs text-cyan-300 font-medium">{stockPercent}%</span>
                </div>
                <div className="flex items-center justify-between py-2.5 md:py-3 px-2.5 md:px-3 bg-slate-800/20 rounded-lg md:rounded-xl border border-slate-700/20">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-700/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] md:text-xs text-slate-400 truncate">Rupture de Stock</p>
                      <p className="text-xs md:text-sm font-semibold text-slate-300 truncate">{stats.totalProducts - stats.activeProducts} articles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heartbeat + Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
          {/* Supabase Heartbeat */}
          <div className="group relative bg-slate-900/50 border border-slate-800/50 rounded-xl p-4 md:p-5 backdrop-blur-xl hover:border-slate-700/50 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20 p-2 flex-shrink-0">
                  {animations.heartbeat ? (
                    <Lottie animationData={animations.heartbeat} loop={true} className="w-full h-full" />
                  ) : (
                    <img src="/icons/dashboard/heart_pulse_heartbeat.svg" alt="Heartbeat" className="w-full h-full" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-semibold text-sm md:text-base truncate">Battement de Coeur du Système</h3>
                  <p className="text-slate-400 text-[10px] md:text-xs truncate">Surveillance de santé du projet</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 self-start sm:self-center">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                <span className="text-[10px] md:text-xs text-green-400 font-medium">ACTIF</span>
              </div>
            </div>
            
            {heartbeat && (
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <div className="bg-slate-800/30 rounded-lg p-2 md:p-3 border border-slate-700/30">
                  <p className="text-slate-400 text-[9px] md:text-[10px] mb-1 truncate">Dernière Activité</p>
                  <p className="text-white font-bold text-xs md:text-sm truncate">{daysSinceLastActivity(heartbeat.last_activity) === 0 ? 'Aujourd\'hui' : `Il y a ${daysSinceLastActivity(heartbeat.last_activity)}j`}</p>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-2 md:p-3 border border-slate-700/30">
                  <p className="text-slate-400 text-[9px] md:text-[10px] mb-1 truncate">Date</p>
                  <p className="text-white font-bold text-xs md:text-sm truncate">{formatHeartbeatDate(heartbeat.activity_date).split(' ')[0]}</p>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-2 md:p-3 border border-slate-700/30">
                  <p className="text-slate-400 text-[9px] md:text-[10px] mb-1 truncate">Mises à jour</p>
                  <p className="text-white font-bold text-xs md:text-sm truncate">{heartbeat.activity_count}</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-4 md:p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <img src="/icons/dashboard/lightning_bolt_speed.svg" alt="Quick Actions" className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <h3 className="text-white font-semibold text-sm md:text-base">Actions Rapides</h3>
            </div>
            <div className="space-y-2">
              <QuickAction 
                text="Gérer les Catégories" 
                href="/administrator/categories"
                iconSrc="/icons/admin-nav/folder_categories_organize.svg"
              />
              <QuickAction 
                text="Gérer les Produits" 
                href="/administrator/products"
                iconSrc="/icons/admin-nav/box_package_products.svg"
              />
              <QuickAction 
                text="Abonnés à la Newsletter" 
                href="/administrator/newsletter"
                iconSrc="/icons/admin-nav/envelope_newsletter_email.svg"
              />
              <QuickAction 
                text="Voir la Boutique" 
                href="/products"
                iconSrc="/icons/dashboard/shopping_cart_products.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

interface StatCardProps {
  iconSrc: string;
  title: string;
  value: React.ReactNode | string;
  subtitle?: string;
  color: 'emerald' | 'teal' | 'cyan' | 'sky';
  trend?: string | number;
  trendUp?: boolean;
  animationData?: unknown;
}

function StatCard({ iconSrc, title, value, subtitle, color, trend, trendUp, animationData }: StatCardProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  
  const colors = {
    emerald: { bg: 'from-emerald-500 to-emerald-600', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
    teal: { bg: 'from-teal-500 to-teal-600', text: 'text-teal-400', glow: 'shadow-teal-500/20' },
    cyan: { bg: 'from-cyan-500 to-cyan-600', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
    sky: { bg: 'from-sky-500 to-sky-600', text: 'text-sky-400', glow: 'shadow-sky-500/20' },
  };

  const colorScheme = colors[color as keyof typeof colors];

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setShowAnimation(true)}
      onMouseLeave={() => setShowAnimation(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl blur-xl`} />
      <div className="relative bg-slate-900/50 border border-slate-800/50 rounded-lg md:rounded-xl p-3 md:p-4 backdrop-blur-xl group-hover:border-slate-700/50 transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]">
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br ${colorScheme.bg} flex items-center justify-center shadow-lg ${colorScheme.glow} transform group-hover:scale-110 transition-all duration-300 p-1.5 md:p-2 flex-shrink-0`}>
            {showAnimation && animationData ? (
              <Lottie animationData={animationData} loop={false} className="w-full h-full" />
            ) : (
              <img src={iconSrc} alt={title} className="w-full h-full" />
            )}
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full ${trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
              {trendUp ? <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3" /> : <TrendingDown className="w-2.5 h-2.5 md:w-3 md:h-3" />}
              <span className="font-medium">{trend}</span>
            </div>
          )}
        </div>
        <p className="text-slate-400 text-[10px] md:text-xs mb-1 font-medium truncate">{title}</p>
        <div className="flex items-baseline gap-1.5 md:gap-2">
          <p className="text-white text-xl md:text-2xl font-bold">{value}</p>
          <span className="text-[9px] md:text-[10px] text-slate-500 truncate">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ text, href, iconSrc }: { text: string; href: string; iconSrc: string }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between px-2.5 md:px-3 py-2 md:py-2.5 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 hover:border-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200"
    >
      <div className="flex items-center gap-2 md:gap-2.5 min-w-0">
        <div className="text-slate-500 group-hover:text-emerald-400 transition-colors duration-200 w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0">
          <img src={iconSrc} alt={text} className="w-full h-full" />
        </div>
        <span className="text-[11px] md:text-xs font-medium truncate">{text}</span>
      </div>
      <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
    </a>
  );
}
