import { useState } from 'react';
import { subscribeToNewsletter } from '../../lib/newsletter';
import { useToast } from '../Toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubscribing || !email) return;

    setIsSubscribing(true);
    const result = await subscribeToNewsletter(email);
    
    if (result.success) {
      toast.success(result.message);
      setEmail(''); // Clear the input
    } else {
      toast.error(result.message);
    }
    
    setIsSubscribing(false);
  };

  return (
    <section 
      className="relative py-8 md:py-16 overflow-hidden"
      data-aos="fade-up"
      data-aos-duration="1200"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: "url('https://wowtheme7.com/tailwind/marketpro/images/newsletter-bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Dark Navy Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e2139] via-[#2a2d4a] to-[#1e2139] z-0" />
          
          {/* Decorative Diagonal Stripes */}
          <div className="absolute inset-0 z-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)',
            }} />
          </div>

          <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-8 items-center p-6 md:p-12 lg:p-16">
            {/* Left Content */}
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-tight">
                Don't Miss Out on<br />
                Grocery Deals
              </h2>
              
              <p className="text-base md:text-xl lg:text-2xl font-heading font-semibold text-white/90 tracking-wide uppercase">
                Sign Up For The Update Newsletter
              </p>

              <form onSubmit={handleSubmit} className="relative mt-4 md:mt-8">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address..."
                    disabled={isSubscribing}
                    required
                    className="w-full py-3 md:py-5 px-4 md:px-6 pr-28 md:pr-40 rounded-full text-sm md:text-base text-gray-800 font-sans placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-heading font-semibold px-4 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
              </form>

              <p className="text-white/60 text-sm font-sans">
                🔒 Your email is safe with us. We respect your privacy.
              </p>
            </div>

            {/* Right Image */}
            <div className="hidden xl:flex items-center justify-center relative">
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 blur-3xl rounded-full" />
                
                <img
                  src="https://wowtheme7.com/tailwind/marketpro/images/newsletter-img.png"
                  alt="Fresh Grocery Basket"
                  className="relative z-10 w-full max-w-lg drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Bottom Decorative Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500" />
        </div>
      </div>
    </section>
  );
}
