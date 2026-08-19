import { Info, BrainCircuit, TrendingUp, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { EmptyState } from '../components/EmptyState';
import { BenchmarkAnalyticsDashboard } from '../components/BenchmarkAnalyticsDashboard';
import { useStats } from '../hooks/useStats';
import { useNotification } from '../context/NotificationContext';
import { useEffect, useMemo } from 'react';

const glossary = [
  { marker: 'trestbps', label: 'Resting Blood Pressure', unit: 'mmHg', normal: '90 - 120 mmHg', desc: 'Pressure in arteries when the heart rests between beats.' },
  { marker: 'chol', label: 'Serum Cholesterol', unit: 'mg/dL', normal: '< 200 mg/dL', desc: 'Fat-like substance in blood. Excess cholesterol forms arterial plaque.' },
  { marker: 'thalach', label: 'Max Heart Rate Achieved', unit: 'bpm', normal: '140 - 200 bpm', desc: 'Highest heart rate recorded during physical stress testing.' },
  { marker: 'oldpeak', label: 'ST Depression', unit: 'mm', normal: '< 1.0 mm', desc: 'ECG ST segment deviation indicating temporary cardiac ischemia.' },
  { marker: 'ca', label: 'Blocked Major Vessels', unit: 'count', normal: '0 vessels', desc: 'Number of major blood vessels showing calcium blockages.' },
  { marker: 'thal', label: 'Thalassemia Scan', unit: 'type', normal: 'Normal / Fixed', desc: 'Nuclear perfusion scan showing blood flow distribution.' },
];

export function InsightsPage() {
  const { data, loading, error } = useStats();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (error) showNotification(error, 'error');
  }, [error, showNotification]);

  const ageDist = useMemo(() => data?.charts.ageDistribution.map((a) => ({ name: a.group, count: a.count })) ?? [], [data]);
  const riskDist = useMemo(() => data?.charts.riskDistribution.map((r) => ({ name: r.risk, count: r.count })) ?? [], [data]);
  const genderDist = useMemo(() => data?.charts.genderDistribution.map((g) => ({ name: g.gender, count: g.count })) ?? [], [data]);
  const hasData = data?.hasData ?? false;

  const dynamicInsights = useMemo(() => {
    if (!data || !hasData) return [];

    const total = data.summary.totalPredictions;
    const highRisk = data.summary.highRiskCount;
    const highRiskPct = total > 0 ? ((highRisk / total) * 100).toFixed(1) : '0';

    const topAgeGroup = [...ageDist].sort((a, b) => b.count - a.count)[0];
    
    const males = data.charts.genderDistribution.find(g => g.gender === 'Male')?.count || 0;
    const females = data.charts.genderDistribution.find(g => g.gender === 'Female')?.count || 0;
    const predominantGender = males > females ? 'Male' : females > males ? 'Female' : 'Balanced';

    return [
      {
        title: 'Risk Prevalance',
        desc: `${highRiskPct}% of analyzed patients were classified as High Risk.`,
        icon: AlertTriangle,
        color: 'text-rose-500',
        bg: 'bg-rose-50 dark:bg-rose-950/30',
        border: 'border-rose-100 dark:border-rose-900/50'
      },
      {
        title: 'Demographic Peak',
        desc: topAgeGroup && topAgeGroup.count > 0 ? `The ${topAgeGroup.name} age group represents the highest volume of assessments.` : 'Insufficient age data.',
        icon: TrendingUp,
        color: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-blue-100 dark:border-blue-900/50'
      },
      {
        title: 'Gender Distribution',
        desc: predominantGender !== 'Balanced' ? `Patient demographics are skewing primarily ${predominantGender} in the dataset.` : 'Patient demographics are perfectly balanced.',
        icon: BrainCircuit,
        color: 'text-amber-500',
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        border: 'border-amber-100 dark:border-amber-900/50'
      }
    ];
  }, [data, hasData, ageDist]);

  return (
    <div className="space-y-10">
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">ANALYTICS & BENCHMARKS</p>
        <h2 className="text-2xl font-extrabold tracking-tight dark:text-white mt-1">Clinical Insights & Model Benchmarks</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Real-time patient telemetry insights and data-science model evaluations comparing Random Forest against Logistic Regression on the Cleveland dataset.
        </p>
      </div>

      {hasData && !loading && (
        <div className="grid gap-4 md:grid-cols-3">
          {dynamicInsights.map((insight, idx) => (
            <div key={idx} className={`rounded-[24px] border ${insight.border} ${insight.bg} p-5 shadow-sm flex items-start gap-4`}>
              <div className={`p-2.5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm ${insight.color}`}>
                <insight.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{insight.title}</h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {insight.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Age Demographics', subtitle: 'Distribution by age range', data: ageDist },
          { title: 'Risk Distribution', subtitle: 'Assessments by severity', data: riskDist },
          { title: 'Gender Distribution', subtitle: 'Assessments by gender', data: genderDist },
        ].map((chart) => (
          <div key={chart.title} className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-md font-bold">{chart.title}</h3>
            <p className="text-xs text-slate-400">{chart.subtitle}</p>
            <div className="h-64 w-full mt-6">
              {loading ? (
                <div className="h-full w-full bg-slate-50 dark:bg-slate-800 animate-pulse rounded-[24px]" />
              ) : !hasData ? (
                <EmptyState message="No prediction data available yet." />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chart.data} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" className="opacity-20" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Full Benchmark & Model Comparison Dashboard */}
      <BenchmarkAnalyticsDashboard />

      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/40 p-2.5 text-blue-600 dark:text-blue-400">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Clinical Indicators Reference</h3>
            <p className="text-xs text-slate-400">The 13 diagnostic parameters evaluated by the ML model</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {glossary.map((g) => (
            <div key={g.marker} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">{g.marker}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{g.normal}</span>
              </div>
              <h4 className="font-bold text-sm dark:text-white">{g.label}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{g.desc}</p>
              <span className="text-[10px] font-bold text-slate-400 mt-4 block">Unit: {g.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
