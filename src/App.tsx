import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import FullNavbar from './components/FullNavbar';
import Footer from './components/Footer';
import ContactTabs from './components/ContactTabs';
import ProductShowcasePage from './pages/ProductShowcasePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ContactPage from './pages/ContactPage';
import OurProductsPage from './pages/OurProductsPage';
import OverviewPage from './pages/administrator/overview';
import CategoriesPage from './pages/administrator/categories';
import ProductsPage from './pages/administrator/products';
import MessagesPage from './pages/administrator/messages';
import NewsletterPage from './pages/administrator/newsletter';
import { updateHeartbeat } from './lib/heartbeat';
import { expireOldNewArrivals } from './lib/products';
import { ToastProvider } from './components/Toast';
import { FavoritesProvider } from './lib/favorites';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/administrator');

  // Update heartbeat on app load to keep Supabase project active
  // Also expire old new arrivals automatically
  useEffect(() => {
    updateHeartbeat();
    expireOldNewArrivals();
    
    // Update heartbeat every 6 hours
    // Also check for expired new arrivals every 6 hours
    const interval = setInterval(() => {
      updateHeartbeat();
      expireOldNewArrivals();
    }, 6 * 60 * 60 * 1000); // 6 hours in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <FavoritesProvider>
      <ToastProvider>
      <div className="min-h-screen overflow-x-hidden">
      {/* Show FullNavbar except on admin pages */}
      <div style={{ paddingTop: isAdminPage ? '0' : 'var(--navbar-height, 112px)' }}>
        {!isAdminPage && <FullNavbar />}
        
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <OurProductsPage />
              </motion.div>
            } />
            <Route path="/products" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ProductShowcasePage />
              </motion.div>
            } />
            <Route path="/product/:id" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ProductDetailsPage />
              </motion.div>
            } />
            <Route path="/contact" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ContactPage />
              </motion.div>
            } />
            <Route path="/administrator/overview" element={<OverviewPage />} />
            <Route path="/administrator/categories" element={<CategoriesPage />} />
            <Route path="/administrator/products" element={<ProductsPage />} />
            <Route path="/administrator/messages" element={<MessagesPage />} />
            <Route path="/administrator/newsletter" element={<NewsletterPage />} />
          </Routes>
        </AnimatePresence>

        {/* Contact Tabs shown on all pages except admin */}
        {!isAdminPage && <ContactTabs />}
        
        {/* Footer shown on all pages except admin */}
        {!isAdminPage && <Footer />}
      </div>
    </div>
      </ToastProvider>
    </FavoritesProvider>
  );
}

export default App;