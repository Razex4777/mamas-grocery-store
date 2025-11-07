import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useToast } from '../../../components/Toast';
import { 
  fetchContactMessages, 
  updateContactMessage, 
  deleteContactMessage, 
  getContactStats 
} from '../../../lib/contact';
import type { ContactMessage } from '../../../lib/database.types';
import { Mail, Phone, Calendar, Eye, Trash2, Archive, CheckCircle, MessageSquare } from 'lucide-react';
import Lottie from 'lottie-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0, replied: 0, archived: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read' | 'replied' | 'archived'>('all');
  const toast = useToast();

  // Lottie animations state
  const [animationsAvailable, setAnimationsAvailable] = useState(false);
  const [animations] = useState<{[key: string]: any}>({
    // Animations would be imported locally here in production
    // For now, we'll use null and render static fallbacks
    email: null,
    success: null,
  });

  useEffect(() => {
    loadData();
    
    // In production, you would import JSON files locally:
    // import emailAnimation from '../../../assets/animations/email.json';
    // import successAnimation from '../../../assets/animations/success.json';
    // setAnimations({ email: emailAnimation, success: successAnimation });
    // setAnimationsAvailable(true);
    
    // For now, animations are unavailable - we'll use static fallbacks
    setAnimationsAvailable(false);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [messagesData, statsData] = await Promise.all([
        fetchContactMessages(),
        getContactStats(),
      ]);
      setMessages(messagesData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'read' | 'replied' | 'archived') => {
    const result = await updateContactMessage(id, { status });
    if (result.success) {
      toast.success(result.message);
      loadData();
    } else {
      toast.error(result.message);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete message from ${email}?`)) {
      return;
    }

    const result = await deleteContactMessage(id);
    if (result.success) {
      toast.success(result.message);
      setSelectedMessage(null);
      loadData();
    } else {
      toast.error(result.message);
    }
  };

  const filteredMessages = filterStatus === 'all' 
    ? messages 
    : messages.filter(m => m.status === filterStatus);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'read': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'replied': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'archived': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header with Animation */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border border-violet-500/20 p-6">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-800/50 rounded-xl p-2 backdrop-blur-sm border border-violet-500/20 flex items-center justify-center">
                {animationsAvailable && animations.email ? (
                  <Lottie animationData={animations.email} loop={true} />
                ) : (
                  <Mail className="w-8 h-8 text-violet-400" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Contact Messages
                </h1>
                <p className="text-slate-400 text-sm mt-1">Manage customer inquiries and communications</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-slate-400">Live</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard
            icon={<MessageSquare className="w-5 h-5" />}
            title="Total Messages"
            value={stats.total}
            color="from-violet-500 to-purple-500"
            animation={animations.success}
          />
          <StatCard
            icon={<Mail className="w-5 h-5" />}
            title="Unread"
            value={stats.unread}
            color="from-blue-500 to-cyan-500"
          />
          <StatCard
            icon={<Eye className="w-5 h-5" />}
            title="Read"
            value={stats.read}
            color="from-purple-500 to-pink-500"
          />
          <StatCard
            icon={<CheckCircle className="w-5 h-5" />}
            title="Replied"
            value={stats.replied}
            color="from-emerald-500 to-teal-500"
          />
          <StatCard
            icon={<Archive className="w-5 h-5" />}
            title="Archived"
            value={stats.archived}
            color="from-slate-500 to-gray-500"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-slate-900/50 p-2 rounded-xl border border-slate-800/50">
          {['all', 'unread', 'read', 'replied', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Messages Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-3 max-h-[700px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-8 text-center">
                <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No messages found</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`w-full text-left bg-slate-900/50 border rounded-xl p-4 transition-all hover:border-violet-500/50 hover:bg-slate-900/80 ${
                    selectedMessage?.id === message.id
                      ? 'border-violet-500 bg-slate-900/80 shadow-lg shadow-violet-500/10'
                      : 'border-slate-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white truncate flex-1">{message.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 truncate mb-2">{message.subject}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {formatDate(message.created_at)}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border-b border-slate-800/50 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.name}</h2>
                      <p className="text-lg text-violet-400 mb-3">{selectedMessage.subject}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-violet-400" />
                      <a href={`mailto:${selectedMessage.email}`} className="text-slate-300 hover:text-violet-400 transition-colors">
                        {selectedMessage.email}
                      </a>
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-violet-400" />
                        <a href={`tel:${selectedMessage.phone}`} className="text-slate-300 hover:text-violet-400 transition-colors">
                          {selectedMessage.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedMessage.created_at)}
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-6">
                  <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    {selectedMessage.status !== 'read' && (
                      <button
                        onClick={() => handleStatusChange(selectedMessage.id, 'read')}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-all border border-purple-500/30"
                      >
                        <Eye className="w-4 h-4" />
                        Mark as Read
                      </button>
                    )}
                    {selectedMessage.status !== 'replied' && (
                      <button
                        onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-all border border-emerald-500/30"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark as Replied
                      </button>
                    )}
                    {selectedMessage.status !== 'archived' && (
                      <button
                        onClick={() => handleStatusChange(selectedMessage.id, 'archived')}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-500/20 hover:bg-slate-500/30 text-slate-400 rounded-lg transition-all border border-slate-500/30"
                      >
                        <Archive className="w-4 h-4" />
                        Archive
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selectedMessage.id, selectedMessage.email)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all border border-red-500/30 ml-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-12 text-center">
                <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: string;
  animation?: any;
}

function StatCard({ icon, title, value, color, animation }: StatCardProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setShowAnimation(true)}
      onMouseLeave={() => setShowAnimation(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl blur-xl`} />
      <div className="relative bg-slate-900/50 border border-slate-800/50 rounded-xl p-4 backdrop-blur-xl group-hover:border-slate-700/50 transition-all duration-300 group-hover:shadow-lg">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3 transform group-hover:scale-110 transition-all duration-300`}>
          {showAnimation && animation ? (
            <Lottie animationData={animation} loop={false} className="w-full h-full" />
          ) : (
            icon
          )}
        </div>
        <p className="text-slate-400 text-xs mb-1">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
