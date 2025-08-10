import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  isOpen: boolean;
  index: number;
  question: string;
  answer: string;
  onToggle: () => void;
};

const AccordionItem: React.FC<Props> = ({ isOpen, index, question, answer, onToggle }) => {
  return (
    <div
      className={`group rounded-xl border border-black/10 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10 overflow-hidden ${
        isOpen ? 'ring-2 ring-emerald-400/70 bg-white/80' : ''
      }`}
    >
      <button
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
            {index + 1}
          </span>
          <span className="text-base sm:text-lg font-semibold text-gray-900">
            {question}
          </span>
        </div>

        {/* Animated + to - icon */}
        <motion.span
          className="relative h-8 w-8 shrink-0 rounded-full bg-white/10 grid place-items-center"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <span className="absolute block h-0.5 w-4 bg-gray-900" />
          <motion.span
            className="absolute block h-4 w-0.5 bg-gray-900"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="px-5 sm:px-6 pb-5 text-gray-700"
          >
            <p className="leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;


