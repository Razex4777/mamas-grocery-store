<<<<<<< HEAD
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import FullNavbar from './components/FullNavbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import OurProductsPage from './pages/OurProductsPage';

function App() {
  const location = useLocation();
  const isShopPage = location.pathname === '/products';

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Always show FullNavbar */}
      <div style={{ paddingTop: 'var(--navbar-height, 112px)' }}>
        <FullNavbar />
        
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <HomePage />
              </motion.div>
            } />
            <Route path="/products" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <OurProductsPage />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>

        {/* Footer shown on all pages except shop */}
        {!isShopPage && <Footer />}
      </div>
=======
import FullNavbar from './components/FullNavbar';
import HeroForm from './components/HeroForm';
import AboutSection from './components/AboutSection';
import ScrollFloat from './components/animations/ScrollFloat';
import RevealOnScroll from './components/animations/RevealOnScroll';
import FeaturedProducts from './components/FeaturedProducts';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CategoryShowcase from './components/CategoryShowcase';
import FAQs from './components/faqs';

function App() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ paddingTop: 'var(--navbar-height, 112px)' }}
    >
      {/* Fixed navbar */}
      <FullNavbar />
      
      {/* Hero section - full screen */}
      <ScrollFloat y={0} scaleFrom={1.02} scaleTo={1} className="will-change-transform">
        <HeroForm />
      </ScrollFloat>
      
      {/* About section - directly underneath hero */}
      <RevealOnScroll from="up">
        <AboutSection />
      </RevealOnScroll>
      
      {/* Featured Products */}
      <FeaturedProducts />

      {/* Category Showcase - Floating Transition Strip */}
      <CategoryShowcase />

      {/* FAQs */}
      <FAQs />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
>>>>>>> f364477e1bf411dd22665f5070bbf41d1f473208
    </div>
  );
}

export default App;