import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Trash2, 
  Search, 
  AlertCircle,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Skeleton } from '../components/Skeleton';
import { supabase } from '../supabase';

interface Practitioner {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'admin';
  createdAt: string;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [users, setUsers] = useState<Practitioner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modals
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  useEffect(() => {
    // Safety check: redirect non-admins
    if (user && user.role !== 'admin') {
      showNotification("Unauthorized access: Administrators only", "error");
      navigate('/dashboard');
      return;
    }

    const loadUsers = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (error) throw error;
        
        const mappedUsers = data.map((u: any) => ({
          id: u.id,
          name: u.full_name || 'Unknown',
          email: u.email,
          role: u.role,
          createdAt: u.created_at,
        }));
        setUsers(mappedUsers);
      } catch (err: any) {
        console.error(err);
        showNotification("Failed to load clinical practitioner database", "error");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [user, navigate, showNotification]);

  const handleDeleteUser = async (id: string) => {
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (error) throw error;
      
      showNotification("User profile deleted successfully", "success");
      setUsers(prev => prev.filter(u => u.id !== id));
      setDeleteConfirmId(null);
    } catch (err: any) {
      const errText = err.message || 'Failed to delete user account';
      showNotification(errText, "error");
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Compute metrics
  const totalStaff = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const doctorCount = users.filter(u => u.role === 'doctor').length;

  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <ShieldAlert className="h-12 w-12 text-rose-500 animate-pulse" />
        <h3 className="font-extrabold text-lg">Access Restrained</h3>
        <p className="text-xs text-slate-400 max-w-xs">
          This portal requires administrative privileges. Contact your clinical supervisor to promote your credential level.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">ADMIN CONTROL PANEL</p>
          <h2 className="text-xl font-extrabold tracking-tight dark:text-white mt-1">Practitioner Access Directory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Audit clinician accounts, credentials, and access keys</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-6 sm:grid-cols-3">
        
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Clinicians</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold tracking-tight dark:text-white">{loading ? <Skeleton className="h-8 w-12" /> : totalStaff}</span>
            <span className="text-[10px] font-bold text-slate-400">Authorized staff</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Administrators</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold tracking-tight dark:text-white">{loading ? <Skeleton className="h-8 w-12" /> : adminCount}</span>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">System managers</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Medical Practitioners</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold tracking-tight dark:text-white">{loading ? <Skeleton className="h-8 w-12" /> : doctorCount}</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Clinical doctors</span>
          </div>
        </div>

      </div>

      {/* Filter panel */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center shadow-sm">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-9 pr-4 py-2.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
            placeholder="Search practitioner by name or email..."
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-955/20 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Clinician Profile</th>
                <th className="px-6 py-4">System Role</th>
                <th className="px-6 py-4">Registration Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-medium">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-4"><Skeleton className="h-5 w-32" /><Skeleton className="h-4 w-24 mt-1" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-xl" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-8 w-8 rounded-xl" /></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-xs text-slate-400">
                    No clinician accounts matching query parameters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isSelf = u.id === user.id;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-all">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">{u.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          u.role === 'admin' 
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400' 
                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {isSelf ? (
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Lock className="h-3.5 w-3.5" /> Active Session
                          </span>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(u.id)}
                            className="rounded-xl border border-slate-200 dark:border-slate-800 p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                            title="Delete Practitioner Account"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete User Confirmation Popup */}
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl max-w-sm w-full text-center space-y-4"
            >
              <div className="inline-flex rounded-full bg-rose-50 dark:bg-rose-950/20 p-3 text-rose-500 mb-2">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-md">Revoke Access Key?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                This action immediately deletes the clinician's credentials and blocks access to the CardioGuard AI portal.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(deleteConfirmId)}
                  className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white py-2.5 text-xs font-semibold shadow transition cursor-pointer"
                >
                  Revoke Credentials
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
