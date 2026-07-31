import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Activity,
  Users,
  FileCheck,
  Clock,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Stethoscope,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, PieChart, Pie, Cell, Legend } from 'recharts';
import { CardSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useStats } from '../hooks/useStats';
import { supabase } from '../supabase';
import type { PredictionRecord } from '../types';

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export function DashboardPage() {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { data: stats, loading: statsLoading } = useStats();
  const [recentRuns, setRecentRuns] = useState<PredictionRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchRecentRuns = async () => {
      try {
        const { data, error } = await supabase
          .from('predictions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(4);
          
        if (error) throw error;
        
        if (data) {
          const mappedRecords: PredictionRecord[] = data.map((row: any) => ({
            id: row.id,
            patientName: row.patient_name,
            patientId: row.patient_id,
            input: row.input_data,
            prediction: row.prediction,
            probability: row.risk_probability,
            riskLevel: row.risk_level,
            confidence: row.confidence,
            explanation: row.explanation,
            recommendations: row.recommendation,
            createdBy: row.user_id,
            createdAt: row.created_at,
          }));
          setRecentRuns(mappedRecords);
        }
      } catch (err: any) {
        showNotification(err.message || 'Failed to fetch history', 'error');
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchRecentRuns();
  }, [user, showNotification]);

  const loading = statsLoading || historyLoading;

  const pieData = stats?.charts.riskDistribution.map((r) => ({
    name: `${r.risk} Risk`,
    value: r.count,
  })) ?? [];

  const timelineData = stats?.charts.monthlyPredictions ?? [];
  const hasChartData = stats?.hasData ?? false;
  const isNewUser = sessionStorage.getItem('isNewUser') === 'true';

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-blue-500/5 to-transparent dark:from-blue-600/10 pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">HEALTH DASHBOARD</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight dark:text-white mt-1">
              {isNewUser ? 'Welcome, ' : 'Welcome Back, '}{user?.name || 'User'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
              Review your health history, run new cardiovascular risk assessments, and monitor your personal health analytics.
            </p>
          </div>
          <Link
            to="/dashboard/predict"
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white shadow-md transition"
          >
            <Stethoscope className="h-4 w-4" />
            New Assessment
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Predictions</span>
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight dark:text-white mt-4">{stats?.summary.totalPredictions ?? 0}</h3>
              <p className="text-xs text-slate-400 mt-1">Stored assessment records</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">High Risk</span>
                <Heart className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight dark:text-white mt-4">{stats?.summary.highRiskCount ?? 0}</h3>
              <p className="text-xs text-slate-400 mt-1">Requires follow-up</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today</span>
                <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight dark:text-white mt-4">{stats?.summary.predictionsToday ?? 0}</h3>
              <p className="text-xs text-slate-400 mt-1">Assessments in last 24 hours</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unique Patients</span>
                <FileCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight dark:text-white mt-4">{stats?.summary.activeDoctors ?? 0}</h3>
              <p className="text-xs text-slate-400 mt-1">Triaged patients</p>
            </div>
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold">Assessment Timeline</h3>
              <p className="text-xs text-slate-400">Monthly prediction volume</p>
            </div>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-72 w-full">
            {loading ? (
              <div className="h-full w-full bg-slate-50 dark:bg-slate-800 animate-pulse rounded-[24px]" />
            ) : !hasChartData ? (
              <EmptyState message="No prediction data available yet. Run your first assessment to populate this chart." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="predictionColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '16px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="predictions" stroke="#2563eb" strokeWidth={3} fill="url(#predictionColor)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold">Risk Distribution</h3>
            <p className="text-xs text-slate-400">By severity classification</p>
          </div>
          <div className="h-60 w-full mt-4">
            {loading ? (
              <div className="h-32 w-32 mx-auto rounded-full border-8 border-slate-100 dark:border-slate-800 animate-pulse" />
            ) : !hasChartData ? (
              <EmptyState message="No prediction data available yet." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <h3 className="text-md font-bold mb-2">Quick Actions</h3>
          {[
            { to: '/dashboard/predict', icon: Stethoscope, label: 'New assessment' },
            { to: '/dashboard/history', icon: Activity, label: 'Patient records' },
            { to: '/dashboard/insights', icon: BrainCircuit, label: 'Analytics' },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition text-sm font-semibold group"
            >
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-blue-600" />
                {label}
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

        <div className="md:col-span-2 rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-bold">Recent Assessments</h3>
            <Link to="/dashboard/history" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div className="h-4 w-28 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-8 w-20 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
                </div>
              ))
            ) : recentRuns.length === 0 ? (
              <EmptyState message="No assessments logged yet. Run your first cardiovascular risk assessment to get started." />
            ) : (
              recentRuns.map((run) => (
                <div key={run.id || run._id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{run.patientName}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{run.patientId} · {new Date(run.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    run.riskLevel.toLowerCase() === 'high'
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'
                      : run.riskLevel.toLowerCase() === 'moderate'
                      ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
                      : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                  }`}>
                    {run.riskLevel} ({Math.round(run.probability * 100)}%)
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
