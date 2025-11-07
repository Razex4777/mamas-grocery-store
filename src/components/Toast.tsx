import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  position: ToastPosition;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, position?: ToastPosition) => void;
  success: (message: string, position?: ToastPosition) => void;
  error: (message: string, position?: ToastPosition) => void;
  warning: (message: string, position?: ToastPosition) => void;
  info: (message: string, position?: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdCounter = useRef(0);
  const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const showToast = useCallback((message: string, type: ToastType = 'info', position: ToastPosition = 'bottom-right') => {
    const id = ++toastIdCounter.current;
    setToasts(prev => [...prev, { id, message, type, position }]);
    
    const timeoutId = setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
      timeoutRefs.current.delete(id);
    }, 5000);
    
    timeoutRefs.current.set(id, timeoutId);
  }, []);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };
  }, []);

  const success = useCallback((message: string, position: ToastPosition = 'bottom-right') => {
    showToast(message, 'success', position);
  }, [showToast]);

  const error = useCallback((message: string, position: ToastPosition = 'bottom-right') => {
    showToast(message, 'error', position);
  }, [showToast]);

  const warning = useCallback((message: string, position: ToastPosition = 'bottom-right') => {
    showToast(message, 'warning', position);
  }, [showToast]);

  const info = useCallback((message: string, position: ToastPosition = 'bottom-right') => {
    showToast(message, 'info', position);
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
        <ToastContainer 
          key={position} 
          toasts={toasts.filter(t => t.position === position)} 
          position={position as ToastPosition} 
        />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastContainerProps {
  toasts: Toast[];
  position: ToastPosition;
}

const ToastContainer = ({ toasts, position }: ToastContainerProps) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getInitialX = () => {
    return position.includes('right') ? 50 : -50;
  };

  return (
    <div className={`fixed ${getPositionClasses()} w-full max-w-sm px-4 sm:px-0 space-y-2 z-[9999] pointer-events-none`}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: getInitialX(), scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: getInitialX(), scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto"
          >
            <ToastComponent {...toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const colorMap: Record<string, string> = {
  'text-emerald-500': 'bg-emerald-500',
  'text-red-500': 'bg-red-500',
  'text-amber-500': 'bg-amber-500',
  'text-blue-500': 'bg-blue-500',
};

const ToastComponent = ({ message, type }: Toast) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 5000; // ms
    const interval = 50;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev - decrement;
        return next <= 0 ? 0 : next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-500',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/30',
      iconColor: 'text-red-500',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-500',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-500',
    },
  } as const;

  const { icon: Icon, bgColor, textColor, borderColor, iconColor } = typeConfig[type];
  const progressColor = colorMap[iconColor] ?? 'bg-white/70';

  return (
    <div className={`${bgColor} ${borderColor} border rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden min-w-[320px] max-w-full relative`}>
      <div className="p-4 flex items-center gap-3">
        <div className={`flex-shrink-0 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <p className={`${textColor} font-medium text-sm leading-snug flex-1`}>{message}</p>
      </div>
      <div className="h-1 bg-white/10">
        <div
          className={`${progressColor} h-full transition-[width] duration-75 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
