import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  fetchNewsletterSubscriptions, 
  deleteNewsletterSubscription,
  getNewsletterStats 
} from '../../../lib/newsletter';
import type { NewsletterSubscription } from '../../../lib/database.types';
import { useToast } from '../../../components/Toast';

export default function NewsletterManagementPage() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [subs, statistics] = await Promise.all([
        fetchNewsletterSubscriptions(),
        getNewsletterStats(),
      ]);
      setSubscriptions(subs);
      setStats(statistics);
    } catch (error) {
      console.error('Failed to load newsletter data:', error);
      toast.error('Failed to load newsletter data');
      setSubscriptions([]);
      setStats({ total: 0, active: 0, inactive: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete subscription for ${email}?`)) {
      return;
    }

    setDeletingId(id);
    const result = await deleteNewsletterSubscription(id);
    
    if (result.success) {
      toast.success(result.message);
      loadData(); // Reload data
    } else {
      toast.error(result.message);
    }
    
    setDeletingId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <img src="/icons/dashboard/envelope_mail_letter_professional_clean.svg" alt="Newsletter" className="w-12 h-12" />
              Abonnés à la Newsletter
            </h1>
            <p className="text-slate-400 mt-2">Gérer votre liste d'abonnement à la newsletter</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Subscribers */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total des Abonnés</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
              </div>
              <img src="/icons/dashboard/envelope_mail_letter_professional_clean.svg" alt="Total" className="w-14 h-14" />
            </div>
          </div>

          {/* Active Subscribers */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Actif</p>
                <p className="text-3xl font-bold text-emerald-400 mt-2">{stats.active}</p>
              </div>
              <img src="/icons/dashboard/checkmark_circle_badge_verified_professional.svg" alt="Active" className="w-14 h-14" />
            </div>
          </div>

          {/* Inactive Subscribers */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Inactif</p>
                <p className="text-3xl font-bold text-slate-400 mt-2">{stats.inactive}</p>
              </div>
              <img src="/icons/dashboard/user_crossed_inactive_disabled_professional.svg" alt="Inactive" className="w-14 h-14" />
            </div>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-xl font-semibold text-white">Tous les Abonnés</h2>
            <p className="text-slate-400 text-sm mt-1">
              {subscriptions.length} abonné(s) trouvé(s)
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 mt-4">Chargement des abonnés...</p>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="p-12 text-center">
              <img src="/icons/dashboard/envelope_mail_letter_professional_clean.svg" alt="Newsletter" className="w-16 h-16 opacity-50 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">Aucun abonné pour le moment</p>
              <p className="text-slate-500 text-sm mt-2">
                Les abonnés apparaîtront ici une fois que les utilisateurs s'inscriront à votre newsletter
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900/50 text-left">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Abonné le
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src="/icons/dashboard/envelope_mail_letter_professional_clean.svg" alt="Email" className="w-10 h-10" />
                          <span className="text-white font-medium">{sub.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {sub.is_active ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            Actif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-700 text-slate-400 text-sm font-medium">
                            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                            Inactif
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {formatDate(sub.subscribed_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(sub.id, sub.email)}
                          disabled={deletingId === sub.id}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <img src="/icons/dashboard/trash_bin_delete_remove_professional.svg" alt="Delete" className="w-4 h-4" />
                          {deletingId === sub.id ? 'Suppression...' : 'Supprimer'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
