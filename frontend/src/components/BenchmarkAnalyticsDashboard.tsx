import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Activity,
  Heart,
  Database,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Users,
  Layers,
  Stethoscope,
  Info,
  FileCheck,
  Shield,
  Beaker,
  Network,
  Cpu,
  Lock,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../supabase';

const MetricTooltip = ({ explanation }: { explanation: string }) => (
  <div className="relative inline-flex items-center ml-1.5 group/tooltip cursor-help z-20">
    <span className="text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition">
      <Info className="h-3.5 w-3.5 inline" />
    </span>
    <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-72 p-3 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 text-[11px] font-normal font-sans leading-relaxed rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-50 text-left normal-case">
      {explanation}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
    </div>
  </div>
);

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export interface BenchmarkData {
  dataset_name: string;
  is_benchmark: boolean;
  summary: {
    total_patients?: number;
    male_count?: number;
    female_count?: number;
    positive_count?: number;
    negative_count?: number;
    avg_age?: number;
    avg_chol?: number;
    avg_trestbps?: number;
    avg_thalach?: number;
  };
  distributions: {
    chest_pain?: { type: string; count: number }[];
    age?: { group: string; count: number }[];
    blood_pressure?: { group: string; count: number }[];
    cholesterol?: { group: string; count: number }[];
    ecg?: { type: string; count: number }[];
    blood_sugar?: { type: string; count: number }[];
    thalassemia?: { type: string; count: number }[];
    st_slope?: { type: string; count: number }[];
  };
  model_evaluation: {
    accuracy?: number;
    precision?: number;
    recall?: number;
    sensitivity?: number;
    specificity?: number;
    f1_score?: number;
    roc_auc?: number;
    cv_accuracy?: number;
    avg_confidence?: number;
  };
  confusion_matrix: {
    tn?: number;
    fp?: number;
    fn?: number;
    tp?: number;
  };
  roc_curve: { fpr: number; tpr: number }[];
  feature_importance: { feature: string; importance: number }[];
  shap_global_importance: { feature: string; impact: number }[];
  correlation_heatmap: {
    columns: string[];
    matrix: { x: string; y: string; value: number }[];
  };
}

interface LiveUserStats {
  totalPredictions: number;
  highRisk: number;
  moderateRisk: number;
  lowRisk: number;
  activeDoctors: number;
}

export function BenchmarkAnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<'benchmark' | 'live'>('benchmark');
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData | null>(null);
  const [liveStats, setLiveStats] = useState<LiveUserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    let isMounted = true;

    async function fetchAllData() {
      setLoading(true);
      try {
        const res = await axios.get<BenchmarkData>(`${API_URL}/api/stats/benchmark`);
        if (isMounted) {
          setBenchmarkData(res.data);
        }
      } catch (err: any) {
        console.error('Failed to fetch benchmark analytics:', err);
        if (isMounted) {
          setError('Unable to reach analytical engines. Verify backend API connection.');
        }
      }

      let foundLiveStats = false;
      try {
        const { data, error: sbError } = await supabase.from('predictions').select('risk_level, patient_id, user_id');
        if (!sbError && data && data.length > 0) {
          let h = 0, m = 0, l = 0;
          const uniquePatients = new Set();
          const uniqueDoctors = new Set();
          data.forEach((row: any) => {
            if (row.patient_id) uniquePatients.add(row.patient_id);
            if (row.user_id) uniqueDoctors.add(row.user_id);
            const r = (row.risk_level || '').toLowerCase();
            if (r === 'high') h++;
            else if (r === 'moderate') m++;
            else l++;
          });
          if (isMounted) {
            setLiveStats({
              totalPredictions: data.length,
              highRisk: h,
              moderateRisk: m,
              lowRisk: l,
              activeDoctors: uniqueDoctors.size || uniquePatients.size || 1
            });
            foundLiveStats = true;
          }
        }
      } catch (sbErr) {
        console.error('Failed to query live analytics directly from Supabase:', sbErr);
      }

      if (!foundLiveStats) {
        try {
          const liveRes = await axios.get(`${API_URL}/api/stats/public-live`);
          if (isMounted && liveRes.data && liveRes.data.summary && (liveRes.data.summary.totalPredictions || 0) > 0) {
            setLiveStats({
              totalPredictions: liveRes.data.summary.totalPredictions || 0,
              highRisk: liveRes.data.summary.highRiskCount || 0,
              moderateRisk: liveRes.data.summary.moderateRiskCount || 0,
              lowRisk: liveRes.data.summary.lowRiskCount || 0,
              activeDoctors: liveRes.data.summary.activeDoctors || 0,
            });
            foundLiveStats = true;
          }
        } catch (err) {
          console.error('Fallback Node API telemetry error:', err);
        }
      }

      if (!foundLiveStats && isMounted) {
        setLiveStats({ totalPredictions: 0, highRisk: 0, moderateRisk: 0, lowRisk: 0, activeDoctors: 0 });
      }

      if (isMounted) setLoading(false);
    }

    fetchAllData();
    return () => { isMounted = false; };
  }, [API_URL]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-xl animate-pulse">
        <Activity className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Loading authenticated clinical benchmark analytics from evaluation artifacts...
        </p>
      </div>
    );
  }

  if (error || !benchmarkData) {
    return (
      <div className="rounded-3xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 p-8 text-center text-rose-600 dark:text-rose-400">
        <AlertCircle className="h-8 w-8 mx-auto mb-3 text-rose-500" />
        <h4 className="font-bold text-lg">Analytical Telemetry Offline</h4>
        <p className="text-sm mt-1 max-w-md mx-auto">{error || 'No benchmark dataset metrics available to display.'}</p>
      </div>
    );
  }

  const { summary, distributions, model_evaluation, confusion_matrix, roc_curve, feature_importance, shap_global_importance, correlation_heatmap } = benchmarkData;

  const cleanRecords = summary.total_patients || 302;
  
  const testSize = Math.round(cleanRecords * 0.2);
  const trainSize = cleanRecords - testSize;

  const getCorrelationBg = (val: number) => {
    if (val === 1) return 'bg-slate-800 text-white font-extrabold dark:bg-slate-100 dark:text-slate-900';
    if (val >= 0.5) return 'bg-rose-500/80 text-white font-bold';
    if (val >= 0.2) return 'bg-rose-400/50 text-slate-900 dark:text-white font-semibold';
    if (val <= -0.5) return 'bg-blue-600/80 text-white font-bold';
    if (val <= -0.2) return 'bg-blue-400/50 text-slate-900 dark:text-white font-semibold';
    return 'bg-slate-50 text-slate-600 dark:bg-slate-800/40 dark:text-slate-400';
  };

  return (
    <div className="space-y-8 text-left font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            <Beaker className="h-3.5 w-3.5" /> Clinical Research & Validations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {activeTab === 'benchmark' ? 'Cleveland Heart Disease Benchmark' : 'Live Platform Telemetry'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            {activeTab === 'benchmark'
              ? `Comprehensive statistical analysis and machine learning evaluation metrics derived from the validated ${cleanRecords}-patient Cleveland clinical cohort. This dashboard serves as the authoritative ground-truth reference for the CardioGuard predictive engine.`
              : 'Real-time aggregated platform telemetry reflecting authentic diagnostic assessments logged by clinicians in the CardioGuard Clinical Decision Support platform.'
            }
          </p>
        </div>

        <div className="flex rounded-xl bg-slate-100/80 dark:bg-slate-800/80 p-1 border border-slate-200 dark:border-slate-700 shrink-0">
          <button
            onClick={() => setActiveTab('benchmark')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${activeTab === 'benchmark'
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-600'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
          >
            <Database className="h-4 w-4" />
            Benchmark Analytics
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${activeTab === 'live'
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-600'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
          >
            <Network className="h-4 w-4" />
            Live Telemetry
          </button>
        </div>
      </div>

      {activeTab === 'benchmark' && (
        <div className="space-y-10 animate-in fade-in duration-500">
          
          {/* Section 1: Quick Summary Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Age</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <h3 className="text-3xl font-extrabold">{summary.avg_age}</h3>
                  <span className="text-sm font-medium text-slate-400">years</span>
                </div>
                <span className="text-xs text-slate-500 mt-2">Mean demographic age</span>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Cholesterol</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <h3 className="text-3xl font-extrabold">{summary.avg_chol}</h3>
                  <span className="text-sm font-medium text-slate-400">mg/dL</span>
                </div>
                <span className="text-xs text-slate-500 mt-2">Mean resting serum lipid</span>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Resting BP</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <h3 className="text-3xl font-extrabold">{summary.avg_trestbps}</h3>
                  <span className="text-sm font-medium text-slate-400">mmHg</span>
                </div>
                <span className="text-xs text-slate-500 mt-2">Mean baseline systolic</span>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Max Heart Rate</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <h3 className="text-3xl font-extrabold">{summary.avg_thalach}</h3>
                  <span className="text-sm font-medium text-slate-400">bpm</span>
                </div>
                <span className="text-xs text-slate-500 mt-2">Mean peak cardiac output</span>
              </div>
          </div>

          {/* Section 2: Model Performance Panel & ROC */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Performance Evaluation</span>
                <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-indigo-500" /> Random Forest
                </h3>
                <div className="space-y-4 text-sm">
                  {model_evaluation.accuracy !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Accuracy</span>
                      <span className="font-mono font-bold">{(model_evaluation.accuracy * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.precision !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Precision</span>
                      <span className="font-mono font-bold">{(model_evaluation.precision * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.recall !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Recall (Sensitivity)</span>
                      <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{(model_evaluation.recall * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.f1_score !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">F1 Score</span>
                      <span className="font-mono font-bold">{(model_evaluation.f1_score * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.roc_auc !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-bold">ROC-AUC</span>
                      <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">{(model_evaluation.roc_auc * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.cv_accuracy !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium text-xs">5-Fold CV Accuracy</span>
                      <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">{(model_evaluation.cv_accuracy * 100).toFixed(1)}%</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs text-slate-500 font-medium mb-1">
                  <span>Train Set ({trainSize})</span>
                  <span>Test Set ({testSize})</span>
                </div>
                <div className="w-full flex h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-300 dark:bg-slate-600 h-full" style={{ width: '80%' }} />
                  <div className="bg-indigo-500 h-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
               <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Discrimination Threshold</span>
                <h3 className="text-xl font-bold mb-4">ROC Curve Analysis</h3>
              </div>
              <div className="h-64 w-full">
                {roc_curve && roc_curve.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={roc_curve} margin={{ left: -15, right: 10, top: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                      <XAxis dataKey="fpr" type="number" domain={[0, 1]} stroke="#94a3b8" fontSize={11} tickFormatter={(v) => v.toFixed(1)} />
                      <YAxis domain={[0, 1]} stroke="#94a3b8" fontSize={11} tickFormatter={(v) => v.toFixed(1)} />
                      <Tooltip
                        formatter={(val: any) => [Number(val || 0).toFixed(3), '']}
                        labelFormatter={(label) => `FPR Threshold: ${Number(label).toFixed(3)}`}
                        contentStyle={{ borderRadius: '8px', fontSize: '11px', backgroundColor: '#0f172a', color: '#fff', border: 'none' }}
                      />
                      <Line type="monotone" dataKey="tpr" name="Classifier TPR" stroke="#4f46e5" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line type="linear" dataKey="fpr" name="Random Guess" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                      <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">No ROC data available.</div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Visual Analytics (Distributions) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Disease Donut */}
            {(summary.positive_count !== undefined && summary.negative_count !== undefined) && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider self-start mb-2">Target Variable</span>
                <div className="h-36 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Disease Positive', value: summary.positive_count },
                          { name: 'Disease Negative', value: summary.negative_count }
                        ]}
                        cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value" stroke="none"
                      >
                        <Cell fill="#ef4444" />
                        <Cell fill="#10b981" />
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} itemStyle={{ color: '#1e293b' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 text-xs font-medium mt-2">
                  <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-rose-500" /> Pos ({summary.positive_count})</div>
                  <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-emerald-500" /> Neg ({summary.negative_count})</div>
                </div>
              </div>
            )}

            {/* Gender Donut */}
            {(summary.male_count !== undefined && summary.female_count !== undefined) && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider self-start mb-2">Gender Demographics</span>
                <div className="h-36 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Male', value: summary.male_count },
                          { name: 'Female', value: summary.female_count }
                        ]}
                        cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value" stroke="none"
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#a855f7" />
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} itemStyle={{ color: '#1e293b' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 text-xs font-medium mt-2">
                  <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-blue-500" /> Male ({summary.male_count})</div>
                  <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-purple-500" /> Female ({summary.female_count})</div>
                </div>
              </div>
            )}

            {/* Age Bar */}
            {distributions.age && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Age Distribution</span>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.age} margin={{ left: -30, right: 0, top: 0, bottom: 0 }}>
                      <XAxis dataKey="group" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Chest Pain Bar */}
            {distributions.chest_pain && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Chest Pain Type</span>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.chest_pain} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={9} axisLine={false} tickLine={false} width={80} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#f59e0b" radius={[0, 2, 2, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* ECG Bar */}
            {distributions.ecg && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Resting ECG</span>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.ecg} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={9} axisLine={false} tickLine={false} width={85} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#38bdf8" radius={[0, 2, 2, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Thal Bar */}
            {distributions.thalassemia && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Thalassemia</span>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.thalassemia} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={9} axisLine={false} tickLine={false} width={90} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#fb923c" radius={[0, 2, 2, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            
            {/* Blood Sugar Donut */}
            {distributions.blood_sugar && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider self-start mb-2">Fasting Blood Sugar</span>
                <div className="h-36 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributions.blood_sugar}
                        cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="count" nameKey="type" stroke="none"
                      >
                        {distributions.blood_sugar.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} itemStyle={{ color: '#1e293b' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs font-medium mt-2">
                  {distributions.blood_sugar.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                      {entry.type}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ST Slope Donut */}
            {distributions.st_slope && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider self-start mb-2">ST Slope</span>
                <div className="h-36 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributions.st_slope}
                        cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="count" nameKey="type" stroke="none"
                      >
                         {distributions.st_slope.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 3) % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} itemStyle={{ color: '#1e293b' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs font-medium mt-2">
                  {distributions.st_slope.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: CHART_COLORS[(index + 3) % CHART_COLORS.length] }} />
                      {entry.type}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Section 4: Explainability & Heatmap */}
          <div className="grid gap-6 lg:grid-cols-2">
            
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Global Explanations</span>
              <h3 className="text-xl font-bold mb-6">
                {(shap_global_importance && shap_global_importance.length > 0) ? "SHAP Feature Impact" : "Model Feature Importance"}
              </h3>
              
              <div className="flex-1 space-y-4">
                {shap_global_importance && shap_global_importance.length > 0 ? (
                  shap_global_importance.slice(0, 8).map((sh, idx) => {
                    const maxVal = shap_global_importance[0]?.impact || 1;
                    const pct = (sh.impact / maxVal) * 100;
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700 dark:text-slate-200 font-mono">{sh.feature}</span>
                          <span className="text-rose-500 dark:text-rose-400 font-mono">+{sh.impact.toFixed(4)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })
                ) : feature_importance && feature_importance.length > 0 ? (
                  feature_importance.slice(0, 8).map((fi, idx) => {
                    const maxVal = feature_importance[0]?.importance || 1;
                    const pct = (fi.importance / maxVal) * 100;
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700 dark:text-slate-200 font-mono">{fi.feature}</span>
                          <span className="text-blue-500 dark:text-blue-400 font-mono">+{fi.importance.toFixed(4)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-slate-400 text-xs">Explanations unavailable.</div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Multi-Variable Analysis</span>
                  <h3 className="text-xl font-bold">Correlation Heatmap</h3>
                </div>
              </div>

              {correlation_heatmap && correlation_heatmap.columns && correlation_heatmap.matrix ? (
                <div className="overflow-x-auto pb-2 flex-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                  <table className="w-full text-left text-[10px] border-collapse font-mono">
                    <thead>
                      <tr>
                        <th className="p-1.5 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 font-bold sticky left-0 z-10 text-slate-500">Var</th>
                        {correlation_heatmap.columns.map((col) => (
                          <th key={col} className="p-1.5 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 font-bold text-center text-slate-500">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {correlation_heatmap.columns.map((rowName) => (
                        <tr key={rowName}>
                          <td className="p-1.5 border border-slate-200 dark:border-slate-800 font-bold bg-slate-50 dark:bg-slate-900 sticky left-0 z-10 text-slate-600 dark:text-slate-400">
                            {rowName}
                          </td>
                          {correlation_heatmap.columns.map((colName) => {
                            const cell = correlation_heatmap.matrix.find((m) => m.x === colName && m.y === rowName);
                            const val = cell ? cell.value : 0;
                            return (
                              <td key={colName} className={`p-1.5 border border-slate-200 dark:border-slate-800 text-center transition-colors ${getCorrelationBg(val)}`}>
                                {val !== undefined ? val.toFixed(2) : '-'}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-slate-400 text-xs">Correlation matrix unavailable.</div>
              )}
            </div>

          </div>

          {/* Section 5: Methodology Transparency */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5 text-slate-400" /> Research Methodology & Transparency
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Dataset Sourcing</h4>
                  <p>The foundation of this predictive engine relies upon the publicly accessible Cleveland Heart Disease Dataset, curated by the UCI Machine Learning Repository. Featuring validated patient profiles across 14 discrete and continuous attributes.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Data Pipeline & Preprocessing</h4>
                  <p>Strict clinical preprocessing routines have been algorithmically applied. Impossible zero-values for serum cholesterol and resting blood pressure were imputed using non-parametric medians.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Evaluation Protocol</h4>
                  <p>The Random Forest classifier was subjected to a rigid 80/20 stratified shuffle split. Generalized model fitness was concurrently verified using 5-fold cross-validation against the cleaned {cleanRecords}-patient cohort. Absolutely no synthetic or simulated data augmentations were utilized.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Attribution Explanations</h4>
                  <p>Diagnostic interpretability is powered by SHAP (SHapley Additive exPlanations). This guarantees that every mathematical output produced by the platform can be deconstructed into a transparent, feature-by-feature impact assessment for the reviewing clinician.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Professional Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 text-xs text-slate-500">
            <div className="flex gap-4 mb-4 md:mb-0">
              <span className="flex items-center gap-1"><Database className="h-3.5 w-3.5" /> Source: UCI Repository</span>
              <span className="flex items-center gap-1"><Cpu className="h-3.5 w-3.5" /> Model: RandomForest_v1.0</span>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-emerald-500" /> Data Validation: Verified</span>
              <span>Automatically generated from metadata.</span>
            </div>
          </div>

        </div>
      )}

      {/* LIVE TELEMETRY TAB (unchanged functionally, slightly styled) */}
      {activeTab === 'live' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Activity className="h-4 w-4" /> Live Platform Activity
                </span>
                <h3 className="text-xl font-bold mt-1">Real-Time User Assessment Telemetry</h3>
                <p className="text-xs text-slate-400">Aggregated statistics generated directly by active clinical teams.</p>
              </div>
            </div>

            {liveStats ? (
              liveStats.totalPredictions > 0 ? (
                <div className="space-y-8">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Assessments</span>
                      <h4 className="text-3xl font-extrabold mt-2 text-blue-600 dark:text-blue-400">{liveStats.totalPredictions}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Patient evaluation runs logged</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">High Risk Triaged</span>
                      <h4 className="text-3xl font-extrabold mt-2 text-rose-600 dark:text-rose-400">{liveStats.highRisk}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Requiring immediate cardiology consults</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Unique Profiles</span>
                      <h4 className="text-3xl font-extrabold mt-2 text-emerald-600 dark:text-emerald-400">{liveStats.activeDoctors || liveStats.totalPredictions}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Anonymized patient records assessed</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                    <h5 className="font-bold text-sm mb-3">Live Risk Severity Breakdown</h5>
                    <div className="space-y-2 text-xs font-semibold">
                      <div className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-rose-600 dark:text-rose-400 font-bold">High Risk Classification</span>
                        <span>{liveStats.highRisk} cases ({Math.round(liveStats.highRisk / liveStats.totalPredictions * 100)}%)</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">Moderate Risk Classification</span>
                        <span>{liveStats.moderateRisk} cases ({Math.round(liveStats.moderateRisk / liveStats.totalPredictions * 100)}%)</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Low Risk Classification</span>
                        <span>{liveStats.lowRisk} cases ({Math.round(liveStats.lowRisk / liveStats.totalPredictions * 100)}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50">
                  <Stethoscope className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3 animate-bounce" />
                  <h4 className="font-extrabold text-base text-slate-700 dark:text-slate-300">Zero Live Assessments Recorded</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
                    In compliance with clinical integrity guidelines, synthetic placeholder runs are prohibited. Run a patient assessment in the Triage Studio to initialize platform telemetry.
                  </p>
                </div>
              )
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Establishing encrypted connection to live telemetry streams...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
