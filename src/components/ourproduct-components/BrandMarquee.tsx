import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const brands = [
  { name: 'Produits Frais', icon: '/marquee/fresh-produce.png' },
  { name: 'Aliments Biologiques', icon: '/marquee/organic-foods.png' },
  { name: 'Produits Laitiers', icon: '/marquee/dairy-products.png' },
  { name: 'Boulangerie Fraîche', icon: '/marquee/bakery-fresh.png' },
  { name: 'Viande & Produits de la Mer', icon: '/marquee/meat-seafood.png' },
  { name: 'Boissons', icon: '/marquee/beverages.png' },
  { name: 'Snacks & Chips', icon: '/marquee/snacks-chips.png' },
  { name: 'Santé & Bien-être', icon: '/marquee/health-wellness.png' },
  { name: 'Produits Surgelés', icon: '/marquee/frozen-foods.png' },
  { name: 'Produits de Base du Garde-manger', icon: '/marquee/pantry-staples.png' },
];

export default function BrandMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const marqueeTrack = wrapperRef.current.querySelector('.marquee-track');
    if (!marqueeTrack) return;

    // Clone the content for seamless loop
    const clone = marqueeTrack.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    wrapperRef.current.appendChild(clone);

    // Get all tracks after cloning
    const allTracks = wrapperRef.current.querySelectorAll('.marquee-track');
    
    // GSAP infinite seamless marquee animation
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'none' }
    });

    // Animate both tracks together for seamless loop
    allTracks.forEach((track) => {
      tl.to(track, {
        xPercent: -100,
        duration: 40,
      }, 0);
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-gradient-to-r from-[#629D23] via-[#6fb32a] to-[#629D23] py-6 md:py-10 border-y-4 border-white/20 shadow-2xl">
      {/* Gradient Fade Overlays for Seamless Infinity Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#629D23] via-[#629D23]/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#629D23] via-[#629D23]/80 to-transparent z-10 pointer-events-none"></div>

      {/* Decorative Shimmer Lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

      {/* Animated Background Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
          backgroundSize: '200% 200%'
        }}></div>
      </div>

      {/* Marquee Container */}
      <div ref={wrapperRef} className="marquee-wrapper flex whitespace-nowrap">
        {/* Marquee Track - Will be cloned by JS for seamless loop */}
        <div className="marquee-track flex items-center gap-6 md:gap-12 px-4 md:px-6 flex-shrink-0 will-change-transform">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-3 md:gap-4 px-5 md:px-8 py-3 md:py-4 bg-white/15 backdrop-blur-md rounded-full border-2 border-white/40 hover:bg-white/25 hover:scale-110 hover:shadow-xl transition-all duration-300 group shadow-lg"
            >
              <div className="relative">
                <img 
                  src={brand.icon} 
                  alt={brand.name}
                  className="w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-base md:text-xl font-bold text-white whitespace-nowrap tracking-wide italic font-heading drop-shadow-md">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Background Dot Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </div>
  );
}
