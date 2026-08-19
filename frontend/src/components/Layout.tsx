import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Bell, 
  ChevronDown, 
  HeartPulse, 
  LayoutDashboard, 
  Sparkles, 
  Stethoscope, 
  UserCircle2, 
  LogOut,
  Menu, 
  X,
  UserCheck,
  Loader2
} from 'lucide-react';
import { Logo } from './Logo';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { supabase } from '../supabase';

export function Layout() {
  const { user, logout } = useAuth();
  const { showNotification } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Notifications State & Relative Time Helper
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notifLoading, setNotifLoading] = useState<boolean>(true);
  const [notifError, setNotifError] = useState<string | null>(null);

  const getRelativeTime = (dateString: string): string => {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 30) return 'Just now';
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 30) return `${diffInDays}d ago`;

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  // Fetch and Subscribe to Realtime Notifications
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setNotifLoading(false);
      setNotifError(null);
      return;
    }
    
    let isMounted = true;
    setNotifLoading(true);
    setNotifError(null);

    const fetchNotifs = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications' as any)
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50);
          
        if (error) throw error;
        
        if (isMounted && data) {
          setNotifications(data);
          setNotifError(null);
        }
      } catch (err: any) {
        console.error('Failed to fetch notifications:', err);
        if (isMounted) {
          setNotifError('Unable to load notifications.');
        }
      } finally {
        if (isMounted) setNotifLoading(false);
      }
    };
    
    fetchNotifs();
    
    // Subscribe to realtime Postgres changes filtered by authenticated user_id
    const channel = supabase
      .channel(`user-notifications-${user.id}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'notifications', 
          filter: `user_id=eq.${user.id}` 
        }, 
        (payload) => {
          if (!isMounted) return;
          if (payload.eventType === 'INSERT' && payload.new) {
            const newNotif = payload.new;
            setNotifications(prev => {
              if (prev.some(n => n.id === newNotif.id)) return prev;
              return [newNotif, ...prev];
            });
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            const updated = payload.new;
            setNotifications(prev => prev.map(n => n.id === updated.id ? { ...n, ...updated } : n));
          } else if (payload.eventType === 'DELETE' && payload.old) {
            const deletedId = payload.old.id;
            setNotifications(prev => prev.filter(n => n.id !== deletedId));
          }
        }
      )
      .subscribe((status) => {
        if (status === 'CHANNEL_ERROR') {
          console.warn('Realtime notifications channel error, attempting refetch.');
          fetchNotifs();
        }
      });
      
    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setNotifications([]);
    logout();
    showNotification("Logged out successfully", "success");
    navigate("/");
  };

  const markAsRead = async (id: string, currentRead: boolean) => {
    if (currentRead || !user) return;
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    try {
      await supabase
        .from('notifications' as any)
        .update({ read: true })
        .eq('id', id)
        .eq('user_id', user.id);
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markAllRead = async () => {
    if (!user || unreadCount === 0) return;
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await supabase
        .from('notifications' as any)
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);
      showNotification("All notifications marked as read", "success");
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  const deleteNotification = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    setNotifications(prev => prev.filter(n => n.id !== id));
    try {
      await supabase
        .from('notifications' as any)
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  // Base navigation
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Prediction Studio', href: '/dashboard/predict', icon: HeartPulse },
    { name: 'Patient History', href: '/dashboard/history', icon: Activity },
    { name: 'Data Insights', href: '/dashboard/insights', icon: Sparkles },
  ];

  // Add Admin Dashboard option if user is admin
  if (user?.role === 'admin') {
    navigation.push({ name: 'Admin Control', href: '/dashboard/admin', icon: UserCheck });
  }

  const activePageName = navigation.find(n => n.href === location.pathname)?.name || 'Health Portal';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col">
      
      {/* Top Mobile Navbar */}
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="drop-shadow-sm">
            <Logo className="h-9 w-9" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-base block">CardioGuard AI</span>
            <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Explainable Heart Disease Risk Predictor</span>
          </div>
        </div>
        <button 
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 backdrop-blur sticky top-0 h-screen select-none">
          <div className="flex items-center gap-3">
            <div className="drop-shadow-sm animate-float">
              <Logo className="h-10 w-10" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">CardioGuard AI</p>
              <p className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider leading-tight">Explainable Heart Disease Risk Predictor</p>
            </div>
          </div>

          <nav className="mt-8 space-y-1.5 flex-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all relative ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-100 dark:shadow-none' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Quick Disclaimer / Promo Card */}
          <div className="mt-6 rounded-3xl border border-blue-100 dark:border-slate-800 bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white relative overflow-hidden shadow-md">
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-2 translate-y-4">
              <Stethoscope className="h-32 w-32" />
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-100">
              <Sparkles className="h-3.5 w-3.5" />
              SHAP Explainability
            </div>
            <p className="mt-3 text-sm font-medium leading-relaxed">
              Analyze cardiovascular risk metrics with real-time feature importance & statistical modeling.
            </p>
          </div>
        </aside>

        {/* Mobile Sidebar overlay (Drawer) */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black z-[100] lg:hidden"
              />
              
              {/* Panel */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-slate-900 p-6 z-[110] shadow-2xl flex flex-col lg:hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="drop-shadow-sm">
                      <Logo className="h-9 w-9" />
                    </div>
                    <span className="font-bold tracking-tight">CardioGuard</span>
                  </div>
                  <button 
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="mt-8 space-y-1 flex-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                          isActive 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 mt-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <Stethoscope className="h-4 w-4" />
                    Healthcare Portal
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    CardioGuard provides clinical decision support powered by supervised machine learning.
                  </p>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 min-w-0">
          
          {/* Top Header */}
          <header className="mb-6 flex items-center justify-between gap-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-6 py-4 shadow-sm backdrop-blur relative z-50">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">PATIENT DASHBOARD</p>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-0.5">{activePageName}</h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Theme Toggle Button removed */}

              {/* Notifications Toggle */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 p-2.5 text-slate-600 dark:text-slate-400 transition hover:bg-slate-50 dark:hover:bg-slate-800 relative cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white shadow-sm ring-2 ring-white dark:ring-slate-900 animate-pulse">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xl z-50 text-left"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white">Notifications</span>
                          {unreadCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllRead}
                            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      <div className="space-y-2.5 max-h-72 overflow-y-auto no-scrollbar pr-0.5">
                        {notifLoading && (
                          <div className="text-center py-6 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-blue-600" /> Loading notifications...
                          </div>
                        )}

                        {notifError && !notifLoading && (
                          <div className="text-center py-4 text-xs text-rose-500 font-medium">
                            {notifError}
                          </div>
                        )}

                        {!notifLoading && !notifError && notifications.length === 0 && (
                          <div className="text-center py-6 text-xs text-slate-500 dark:text-slate-400">
                            No new notifications
                          </div>
                        )}

                        {!notifLoading && !notifError && notifications.map(n => (
                          <div 
                            key={n.id}
                            onClick={() => markAsRead(n.id, n.read)}
                            className={`p-3 rounded-xl border transition relative group cursor-pointer ${
                              n.read 
                                ? 'bg-slate-50/70 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400' 
                                : 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white shadow-sm'
                            }`}
                          >
                            <button
                              onClick={(e) => deleteNotification(n.id, e)}
                              title="Delete notification"
                              className="absolute top-2.5 right-2.5 p-1 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                            
                            {!n.read && (
                              <span className="absolute top-3.5 right-8 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
                            )}

                            {n.title && (
                              <p className={`text-xs font-bold leading-snug mb-1 pr-6 ${!n.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                {n.title}
                              </p>
                            )}
                            
                            <p className="text-xs font-medium leading-relaxed pr-6 opacity-90">
                              {n.message}
                            </p>
                            
                            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-2 block">
                              {getRelativeTime(n.created_at)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <div 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
                >
                  <UserCircle2 className="h-8 w-8 text-slate-500 dark:text-slate-400" />
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold max-w-[100px] truncate">{user?.name || 'User'}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{user?.role === 'admin' ? 'Administrator' : user?.role === 'doctor' ? 'Doctor' : 'Patient'}</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${profileOpen ? 'transform rotate-180' : ''}`} />
                </div>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xl z-50"
                    >
                      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-2 text-left">
                        <p className="font-bold text-sm">{user?.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                          {user?.role === 'admin' ? 'Administrator' : user?.role === 'doctor' ? 'Doctor' : 'Patient'}
                        </span>
                      </div>
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </header>

          {/* Child Outlet */}
          <div className="flex-1 min-h-0">
            <Outlet />
          </div>
          
          <footer className="mt-8 text-center text-xs text-slate-400 py-4 border-t border-slate-200/50 dark:border-slate-800/50">
            © {new Date().getFullYear()} CardioGuard Clinical Predictive Analytics. Powered by supervised machine learning models. For scientific screening guidance and educational purposes only.
          </footer>
        </main>
      </div>
    </div>
  );
}
