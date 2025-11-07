import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { requireAdmin, clearClientSession } from '../../lib/auth';

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Overview', href: '/administrator/overview', iconSrc: '/icons/admin-nav/dashboard_overview_analytics.svg' },
  { name: 'Categories', href: '/administrator/categories', iconSrc: '/icons/admin-nav/folder_categories_organize.svg' },
  { name: 'Products', href: '/administrator/products', iconSrc: '/icons/admin-nav/box_package_products.svg' },
  { name: 'Messages', href: '/administrator/messages', iconSrc: '/icons/admin-nav/message_contact_inbox.svg' },
  { name: 'Newsletter', href: '/administrator/newsletter', iconSrc: '/icons/admin-nav/envelope_newsletter_email.svg' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Server-side validation of admin session
    const validateSession = async () => {
      setIsValidating(true);
      
      const { authorized } = await requireAdmin();
      
      if (!authorized) {
        clearClientSession();
        navigate('/');
        return;
      }
      
      setIsAuthorized(true);
      setIsValidating(false);
    };
    
    validateSession();
  }, [navigate]);

  const handleLogout = () => {
    clearClientSession();
    navigate('/');
  };

  // Show loading state during validation
  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Validating session...</p>
        </div>
      </div>
    );
  }

  // Only render admin layout if authorized
  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full w-56 bg-slate-900/50 border-r border-slate-800/50 backdrop-blur-2xl z-40">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-4 py-5 border-b border-slate-800/50">
            <div className="flex items-center gap-2.5">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="relative w-8 h-8 bg-slate-900/50 backdrop-blur-sm rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 p-1.5 border border-emerald-500/30">
                  <img src="/icons/dashboard/admin_shield_security.svg" alt="Admin Shield" className="w-full h-full" />
                </div>
              </div>
              <div>
                <h1 className="text-white font-semibold text-sm tracking-tight">Admin Panel</h1>
                <p className="text-[10px] text-slate-400 tracking-wide">CONTROL CENTER</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-xl" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-r-full shadow-lg shadow-emerald-500/50" />
                    </>
                  )}
                  <img
                    src={item.iconSrc}
                    alt={item.name}
                    className={`w-4 h-4 relative z-10 transition-all duration-300 ${
                      isActive ? 'brightness-125' : 'group-hover:scale-110'
                    }`}
                  />
                  <span className="relative z-10 text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-slate-800/50">
            <button
              onClick={handleLogout}
              className="w-full group flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 relative overflow-hidden"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-56 min-h-screen pb-20 lg:pb-0 px-4 md:px-6 lg:px-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 z-40">
        <div className="flex items-center justify-around px-2 py-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive 
                    ? 'text-emerald-400' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <img
                  src={item.iconSrc}
                  alt={item.name}
                  className={`w-5 h-5 ${isActive ? 'scale-110 brightness-125' : ''} transition-transform`}
                />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-4 py-2 text-slate-400 hover:text-red-400 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
