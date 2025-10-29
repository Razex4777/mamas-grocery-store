import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface CartItem {
  id: string;
  title: string;
  price: string;
  qty: number;
  imageSrc: string;
}

interface CartSheetProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
}

export default function CartSheet({ open, onClose, items }: CartSheetProps) {
  const total = items.reduce((sum, item) => sum + item.qty * parseFloat(item.price.replace(',', '.')), 0);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[2100]">
          <motion.div className="absolute inset-0 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/90 backdrop-blur px-5 py-4">
              <h3 className="text-lg font-bold">Votre Panier</h3>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100"><X size={18} /></button>
            </div>

            <div className="p-5 space-y-4">
              {items.length === 0 ? (
                <p className="text-sm text-gray-600">Votre panier est vide.</p>
              ) : (
                items.map((i) => (
                  <div key={i.id} className="flex items-center gap-3 border rounded-lg p-3">
                    <img src={i.imageSrc} alt={i.title} className="h-14 w-14 object-contain" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{i.title}</p>
                      <p className="text-xs text-gray-600">{i.qty} × {i.price}</p>
                    </div>
                    <span className="text-sm font-semibold">{(i.qty * parseFloat(i.price.replace(',', '.'))).toFixed(2)} $</span>
                  </div>
                ))
              )}

              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <span className="text-sm text-gray-600">Total estimé</span>
                <span className="text-lg font-bold">{total.toFixed(2)} $</span>
              </div>

              <button className="mt-2 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700">Valider la commande</button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}





