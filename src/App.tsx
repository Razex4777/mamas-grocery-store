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
    </div>
  );
}

export default App;