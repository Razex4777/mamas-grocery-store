import { useState } from 'react';
import { X, Lock, User, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../Toast';
import { authenticateAdmin, setClientSession } from '../../lib/auth';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Authenticate using centralized auth function
      const result = await authenticateAdmin(username, password);

      if (!result.success) {
        setError(result.message);
      } else {
        // Set client session on successful authentication
        setClientSession(username);
        toast.success('Bienvenue, administrateur!');
        navigate('/administrator/overview');
        onClose();
      }
    } catch (err) {
      setError("Échec de l'authentification. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-lg"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative w-full max-w-sm bg-slate-900/95 backdrop-blur-2xl rounded-xl border border-slate-700/50 shadow-2xl shadow-emerald-500/10 animate-slideUp"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 hover:scale-110"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="p-6 pb-5">
          <div className="flex items-center justify-center mb-5">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Accès Administrateur
          </h2>
          <p className="text-slate-400 text-center mt-1.5 text-xs">
            Authentification sécurisée requise
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="px-6 pb-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5 flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5">
              Nom d'utilisateur
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center">
                <User className="absolute left-2.5 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors duration-200" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800/80 transition-all duration-200"
                  placeholder="Entrez le nom d'utilisateur"
                  required
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5">
              Mot de passe
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center">
                <Lock className="absolute left-2.5 w-4 h-4 text-slate-500 group-focus-within:text-teal-400 transition-colors duration-200" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:bg-slate-800/80 transition-all duration-200"
                  placeholder="Entrez le mot de passe"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-200" />
            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authentification...</span>
                </>
              ) : (
                <>
                  <Lock size={14} />
                  <span>Accéder au tableau de bord</span>
                </>
              )}
            </span>
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
