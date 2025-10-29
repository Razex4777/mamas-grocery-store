import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { FAQsProps } from './types';
import AccordionItem from './AccordionItem';
import { FAQ_ITEMS } from './constants';

// Background image (no overlays/effects)
const FAQS_BG = '/faqs/faqs_bg.png';

const FAQs: React.FC<FAQsProps> = ({ className = '' }) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const active = useMemo(() => FAQ_ITEMS.find((f) => f.id === openId) ?? FAQ_ITEMS[0], [openId]);

  return (
    <section
      className={`relative w-full py-16 lg:py-24 ${className}`}
      style={{
        backgroundImage: `url(${FAQS_BG})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // Keep section height visually stable on desktop
        minHeight: '720px',
      }}
    >
      {/* Soft color overlay for readability */}
      <div className="absolute inset-0 bg-white/70" aria-hidden />

      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Title Block */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm tracking-[0.18em] font-semibold text-emerald-700">
            QUESTIONS FRÉQUEMMENT POSÉES
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Besoin d'aide ?
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full" />
        </div>

        {/* Two-column layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left column - dynamic visual */}
          <div className="order-1 lg:order-none">
            <motion.div
              key={active?.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-2xl shadow-black/10 ring-1 ring-black/5 bg-white"
            >
              <img
                src={active?.imageSrc}
                alt="FAQ visuel"
                className="absolute inset-0 h-full w-full object-contain p-6 md:p-10 lg:p-12"
              />
            </motion.div>
          </div>

          {/* Right column - accordion */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem
                key={item.id}
                index={idx}
                isOpen={openId === item.id}
                question={item.question}
                answer={item.answer}
                onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;


