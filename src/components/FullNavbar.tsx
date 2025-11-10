import { Facebook, Menu, X, MapPin, Mail, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos Produits', href: '/products' },
  { label: 'Contactez-nous', href: '/contact' }
];

const FullNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = 120;
        const y = typeof window !== 'undefined' ? (window.scrollY || window.pageYOffset || 0) : 0;
        const p = Math.max(0, Math.min(1, y / max));
        setScrollProgress(p);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const isScrolled = scrollProgress > 0.02;
  
  // Use state-based mobile detection
  
  // Desktop vs Mobile responsive values
  const headerHeight = Math.round(lerp(isMobile ? 80 : 112, isMobile ? 64 : 72, scrollProgress));
  const redHeight = Math.round(lerp(isMobile ? 32 : 40, 0, scrollProgress));
  const logoWidth = Math.round(lerp(isMobile ? 200 : 350, isMobile ? 160 : 260, scrollProgress));
  const notch = Math.round(lerp(isMobile ? 30 : 50, isMobile ? 24 : 38, scrollProgress));
  const timeLeft = Math.max(0, logoWidth - (isMobile ? 15 : 20));
  const paddingLeft = logoWidth + (isMobile ? 20 : 30);

  // Expose dynamic navbar height as a CSS variable so downstream sections
  // (e.g., hero) can align directly below the fixed header and size
  // themselves to the remaining viewport height. Desktop-first, but safe on mobile.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--navbar-height', `${headerHeight}px`);
    }
  }, [headerHeight]);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* 
        MAIN CONTAINER: Responsive height
      */}
      <div
        className={`relative transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-full ${
          isScrolled ? 'shadow-2xl shadow-black/50' : ''
        }`}
        style={{ height: headerHeight }}
      >

        {/* LAYER 1: Black Background */}
        <div
          className={`absolute inset-0 z-0 transition-all duration-500 ${
            isScrolled ? 'bg-black/60 backdrop-blur-xl ring-1 ring-white/10' : 'bg-black'
          }`}
        ></div>

        {/* LAYER 2: Green Background - Responsive */}
        <div
          className="absolute top-0 left-0 right-0 bg-green-600 z-10 transition-all duration-500"
          style={{ height: redHeight, opacity: 1 - scrollProgress }}
        ></div>

        {/* LAYER 3: White Logo Block - Responsive with Shine Animation */}
        <div
          className="bg-white flex items-center px-3 sm:px-6 lg:px-10 absolute z-30 cursor-pointer group hover:shadow-lg transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden"
          style={{
            clipPath: `polygon(0 0, calc(100% - ${notch}px) 0, 100% 100%, 0 100%)`,
            width: `${logoWidth}px`,
            height: `${headerHeight}px`,
            top: 0,
            left: 0,
            transition: 'clip-path 500ms cubic-bezier(0.22,1,0.36,1), width 500ms cubic-bezier(0.22,1,0.36,1), height 500ms cubic-bezier(0.22,1,0.36,1)'
          }}
        >
          {/* Shine Animation Overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(-40deg, transparent 0%, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%, transparent 100%)',
              backgroundSize: '200px 100%',
              animation: 'shine 5s infinite',
              backgroundPosition: '-200px 0'
            }}
          />
          <div className="flex items-center justify-center w-full h-full">
            <img 
              src="/logos/mamas-grocery-2.png" 
              alt="Company Logo" 
              className="w-auto object-contain transform transition-transform duration-500 group-hover:scale-105"
              style={{ height: `${Math.round(lerp(isMobile ? 70 : 140, isMobile ? 55 : 90, scrollProgress))}px` }}
            />
          </div>
        </div>

        {/* LAYER 4: Content */}
        <div className="absolute inset-0 z-20 text-white">

          {/* Top Bar Content Container */}
          <div
            className="relative w-full transition-all duration-500 overflow-hidden"
            style={{
              height: `${redHeight}px`,
              opacity: 1 - scrollProgress,
              pointerEvents: scrollProgress > 0.6 ? 'none' : 'auto'
            }}
          >
            {/* Contact details positioned near the right edge of the white block */}
            <div className="absolute top-0 h-full flex items-center" style={{ left: `${timeLeft}px` }}>
              <div className="hidden md:flex items-center gap-6 text-xs lg:text-sm">
                <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition"><MapPin size={14} /><span className="whitespace-nowrap">New Brunswick · Maritimes, Canada</span></div>
                <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition"><Mail size={14} /><span className="whitespace-nowrap">notremarchecaroline@gmail.com</span></div>
                <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition"><Phone size={14} /><span className="whitespace-nowrap">+1 (506) 544-5692</span></div>
              </div>
              {/* Mobile: show just phone */}
              <div className="md:hidden flex items-center gap-2 text-xs">
                <Phone size={14} />
                <span>+1 (506) 544-5692</span>
              </div>
            </div>

            {/* Social media icons on the far right */}
            <div className="absolute top-0 right-4 lg:right-8 h-full flex items-center space-x-2 lg:space-x-3">
              <span className="font-medium text-sm lg:text-base hidden md:inline">Suivez-nous:</span>
              <a 
                href="https://www.facebook.com/Alsmadimoncton?locale=fr_FR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-5 h-5 lg:w-6 lg:h-6 bg-white text-red-600 rounded-sm flex items-center justify-center text-sm font-bold hover:bg-red-600 hover:text-white transform hover:scale-110 transition-all duration-300"
              >
                <Facebook size={12} />
              </a>
            </div>
          </div>

          {/* Main Navigation Bar Content - starts below the red bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center transition-all duration-500" style={{ top: `${redHeight}px` }}>
            {/* This container has padding on the left to avoid the logo block */}
            <div
              className="flex-1 flex items-center justify-between h-full pr-8"
              style={{ paddingLeft: `${paddingLeft}px` }}
            >
              {/* Desktop nav links */}
              <nav className="hidden lg:flex items-center space-x-8 text-base">
                {navLinks.map((link, i) => {
                  const isRoute = link.href.startsWith('/');
                  const commonClasses = "relative text-white hover:text-red-600 transition-all duration-300 font-medium group py-2";
                  
                  return isRoute ? (
                    <Link
                      key={i}
                      to={link.href}
                      className={commonClasses}
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                      <span className="absolute inset-0 bg-red-600/10 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                    </Link>
                  ) : (
                    <a
                      key={i}
                      href={link.href}
                      className={commonClasses}
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                      <span className="absolute inset-0 bg-red-600/10 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                    </a>
                  );
                })}
              </nav>

              {/* Desktop actions */}
              <div className="hidden lg:flex items-center space-x-6">
                <button className="bg-red-600 text-white px-6 py-3 font-bold text-base tracking-wide hover:bg-red-700 transform hover:scale-105 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                  <span className="relative z-10">VISITEZ MAINTENANT</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>

              {/* Mobile hamburger */}
              {/* Mobile hamburger - positioned outside logo area */}
              <div className="lg:hidden flex items-center ml-auto pr-2">
                <button
                  aria-label="Open menu"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`p-2 rounded-md active:scale-95 transition ${scrollProgress > 0.3 ? 'text-white hover:bg-white/10' : 'text-white hover:bg-black/10'}`}
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay / Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 animate-fade-in" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-white text-gray-900 shadow-2xl p-6 overflow-y-auto animate-slide-in-left">
            <div className="flex items-center justify-between mb-6">
              <img src="/logos/mamas-grocery-2.png" alt="Logo" className="h-8 w-auto" />
              <button aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-md hover:bg-black/5">
                <X size={22} />
              </button>
            </div>
            <nav className="space-y-1">
              {navLinks.map((link, i) => {
                const isRoute = link.href.startsWith('/');
                const commonClasses = "block px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100";
                
                return isRoute ? (
                  <Link
                    key={i}
                    to={link.href}
                    className={commonClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={i}
                    href={link.href}
                    className={commonClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="mt-6 border-t pt-6 space-y-4">
              <button className="w-full bg-red-600 text-white px-6 py-3 font-bold text-base tracking-wide hover:bg-red-700 transition rounded-md">
                VISITEZ MAINTENANT
              </button>
              <div className="flex items-center gap-2 text-gray-600">
                <a 
                  href="https://www.facebook.com/Alsmadimoncton?locale=fr_FR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-red-600 transition-colors"
                >
                  <Facebook size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default FullNavbar;