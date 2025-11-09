import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FeatureTabs from '../components/ourproduct-components/FeatureTabs';
import AnimatedMarqueeHero from '../components/ourproduct-components/AnimatedMarqueeHero';
import NewsletterSection from '../components/ourproduct-components/NewsletterSection';
import BrandMarquee from '../components/ourproduct-components/BrandMarquee';
import AboutUsSection from '../components/ourproduct-components/AboutUsSection';
import RegionalProducts from '../components/ourproduct-components/RegionalProducts';

export default function OurProductsPage() {

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


  return (
    <>
      {/* Feature Tabs */}
      <FeatureTabs />

      {/* Animated Marquee Hero Banner */}
      <AnimatedMarqueeHero />

      {/* Regional Products Section */}
      <RegionalProducts />

      {/* Weekend Discount Banner */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
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


      {/* Brand Marquee - GSAP Animation */}
      <BrandMarquee />

      {/* Newsletter Section */}
      <NewsletterSection />
    </>
  );
}
