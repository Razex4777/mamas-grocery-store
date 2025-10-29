import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    preTitle: 'Get up to 30% off on your first $150 purchase',
    title: "Don't miss our amazing grocery deals",
    description: "We have prepared special discounts for you on grocery products. Don't miss these opportunities...",
    image: '/banner-placeholder.svg', // Replace with /banner-01.webp after copying from ekomart
    bgClass: 'bg-gradient-to-r from-[#1a2332] to-[#2d3e50]',
  },
  {
    id: 2,
    preTitle: 'Get up to 10% off on your first $250 purchase',
    title: 'Check out our incredible deals today',
    description: "We have prepared special discounts for you on grocery products. Don't miss these opportunities...",
    image: '/banner-placeholder.svg', // Replace with /banner-02.webp after copying from ekomart
    bgClass: 'bg-gradient-to-r from-[#2d3e50] to-[#1a2332]',
  },
];

export default function ProductBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Banner Container */}
      <div className={`relative min-h-[400px] md:min-h-[500px] transition-all duration-700 ${slide.bgClass}`}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        
        {/* Decorative floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-500/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex items-center min-h-[400px] md:min-h-[500px]">
            <div className="max-w-2xl py-12">
              {/* Pre-title */}
              <span className="inline-block px-4 py-2 bg-yellow-400 text-gray-900 text-sm font-medium rounded-full mb-6 animate-fade-in">
                {slide.preTitle}
              </span>

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-200 mb-8 max-w-xl animate-slide-up delay-200">
                {slide.description}
              </p>

              {/* CTA Button */}
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#629D23] hover:bg-[#5a8a1f] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 disabled:opacity-50 z-20"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 disabled:opacity-50 z-20"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentSlide(index);
                  setTimeout(() => setIsTransitioning(false), 700);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
