import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, BadgeCheck, Leaf, Package, Info, Star, MapPin, Tag } from 'lucide-react';
import type { FeaturedProduct } from './types';

interface ViewProductDrawerProps {
  product: FeaturedProduct | null;
  open: boolean;
  onClose: () => void;
}

export default function ViewProductDrawer({ product, open, onClose }: ViewProductDrawerProps) {
  return (
    <AnimatePresence>
      {open && product && (
        <div className="fixed inset-0 z-[2000]">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="absolute left-0 top-0 h-full w-full sm:w-[560px] bg-white shadow-2xl overflow-y-auto"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            {/* Hero Header */}
            <div className="relative overflow-hidden">
              <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald-200/60 blur-3xl" />
              <div className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-amber-200/60 blur-3xl" />
              <div className="relative px-6 pt-6 pb-4 bg-gradient-to-br from-emerald-50 to-white">
                <div className="flex items-start gap-4">
                  <img src={product.imageSrc} alt={product.title} className="h-20 w-20 object-contain rounded-xl ring-1 ring-black/10 bg-white" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-extrabold tracking-tight text-gray-900">{product.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-2 py-1"><MapPin size={12} /> {product.origin}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 px-2 py-1"><Tag size={12} /> {product.category}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 px-2 py-1"><Star size={12} /> Premium</span>
                    </div>
                  </div>
                  <button onClick={onClose} className="rounded-full p-2 hover:bg-black/5">
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Story block */}
              <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold">{product.title}</span> est fabriqué à partir d'ingrédients soigneusement sélectionnés pour garantir
                  une qualité supérieure. Parfait pour les professionnels exigeants et la vente en gros.
                </p>
              </div>

              {/* Why you'll love it */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck className="text-emerald-600" size={18} />
                  <h4 className="text-base font-bold">Pourquoi vous allez l'adorer</h4>
                </div>
                <ul className="grid grid-cols-1 gap-2 text-sm">
                  {[
                    'Faible en matières grasses',
                    "Emballage HPP pour préserver fraîcheur et saveur",
                    'Délicieux goût fumé',
                    'Parfait pour le déjeuner ou les collations',
                    'Certifié 100% Halal',
                    'Préparé au Canada',
                  ].map((b, i) => (
                    <li key={i} className="inline-flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 text-emerald-600" size={18} />
                      <span className="text-gray-800">{b}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Benefits chips */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="text-emerald-600" size={18} />
                  <h4 className="text-base font-bold">Bénéfices produit</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Fraîcheur garantie', 'Ingrédients de qualité', 'Stock régulier', 'Traçabilité complète'].map((t) => (
                    <span key={t} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      {t}
                    </span>
                  ))}
                </div>
              </section>

              {/* Ingredients + Nutrition */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={16} className="text-gray-700" />
                    <h5 className="text-sm font-semibold">Ingrédients</h5>
                  </div>
                  <p className="text-sm text-gray-700">Ingrédients sélectionnés de haute qualité. Détails disponibles sur demande.</p>
                </div>
                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info size={16} className="text-gray-700" />
                    <h5 className="text-sm font-semibold">Valeur nutritive</h5>
                  </div>
                  <p className="text-sm text-gray-700">Tableau nutritionnel conforme aux normes canadiennes.</p>
                </div>
              </section>

            </div>

          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}


