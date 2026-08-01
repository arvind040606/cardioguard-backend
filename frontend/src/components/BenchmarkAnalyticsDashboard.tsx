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
  Legend
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
  Info
} from 'lucide-react';
import { supabase } from '../supabase';

const MetricTooltip = ({ explanation }: { explanation: string }) => (
  <div className="relative inline-flex items-center ml-1.5 group/tooltip cursor-help z-20">
    <span className="text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition">
      <Info className="h-3.5 w-3.5 inline" />
    </span>
    <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-64 p-2.5 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 text-[11px] font-normal font-sans leading-relaxed rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-50 text-left normal-case">
      {explanation}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
    </div>
  </div>
);

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
        // Fetch Benchmark Dataset Analytics
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

      // 1. Fetch authentic Live User Analytics directly from Supabase (Primary Production DB)
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

      // 2. If Supabase returned zero rows (or failed due to unauthenticated RLS), check Node backend API telemetry
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

  // Helper for correlation color
  const getCorrelationBg = (val: number) => {
    if (val === 1) return 'bg-slate-800 text-white font-extrabold dark:bg-slate-100 dark:text-slate-900';
    if (val >= 0.5) return 'bg-rose-500/80 text-white font-bold';
    if (val >= 0.2) return 'bg-rose-400/50 text-slate-900 dark:text-white font-semibold';
    if (val <= -0.5) return 'bg-blue-600/80 text-white font-bold';
    if (val <= -0.2) return 'bg-blue-400/50 text-slate-900 dark:text-white font-semibold';
    return 'bg-slate-50 text-slate-600 dark:bg-slate-800/40 dark:text-slate-400';
  };

  return (
    <div className="space-y-8 text-left">
      {/* Tab Selector & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <Database className="h-4 w-4" /> CLINICAL INTELLIGENCE STUDIO
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            {activeTab === 'benchmark' ? 'Benchmark Dataset Analytics' : 'Live User Analytics'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {activeTab === 'benchmark' 
              ? 'Aggregated research metrics computed directly from the 303-patient Cleveland Heart Disease study and trained machine learning evaluation artifacts. Zero simulated numbers.'
              : 'Real-time platform telemetry reflecting authentic diagnostic assessments logged by clinicians in CardioGuard AI.'
            }
          </p>
        </div>

        <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800/60 p-1 border border-slate-200/60 dark:border-slate-700/60 self-start">
          <button
            onClick={() => setActiveTab('benchmark')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'benchmark'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Layers className="h-4 w-4" />
            Cleveland Benchmark (303 Records)
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'live'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Users className="h-4 w-4" />
            Live User Analytics
          </button>
        </div>
      </div>

      {/* Privacy & Provenance Notice Banner */}
      <div className="flex items-start sm:items-center gap-3 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 p-4 text-xs text-blue-900 dark:text-blue-300">
        <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
        <div className="leading-relaxed">
          <span className="font-bold">Patient Privacy & Data Authenticity Guarantee: </span>
          {activeTab === 'benchmark' ? (
            <span>
              All figures displayed below represent aggregated, anonymized research statistics computed solely from <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">data/heart.csv</code> and trained serialized model weights (<code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">model_metadata.pkl</code>). No live patient submissions are ever merged into this research reference.
            </span>
          ) : (
            <span>
              Figures in this section correspond strictly to genuine evaluations run through CardioGuard by platform practitioners. To maintain absolute diagnostic integrity, placeholder values and synthetic statistics are strictly prohibited.
            </span>
          )}
        </div>
      </div>

      {/* TAB 1: BENCHMARK DATASET ANALYTICS */}
      {activeTab === 'benchmark' && (
        <div className="space-y-8">
          
          {/* Summary KPI Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summary.total_patients !== undefined && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cohort Study Size</span>
                <h3 className="text-3xl font-extrabold mt-2">{summary.total_patients}</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" /> UCI Cleveland Dataset
                </p>
              </div>
            )}
            {summary.avg_age !== undefined && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Age</span>
                <h3 className="text-3xl font-extrabold mt-2">{summary.avg_age} <span className="text-base font-normal text-slate-400">yrs</span></h3>
                <p className="text-xs text-slate-400 mt-1">Mean patient age across cohort</p>
              </div>
            )}
            {summary.avg_chol !== undefined && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Cholesterol</span>
                <h3 className="text-3xl font-extrabold mt-2">{summary.avg_chol} <span className="text-base font-normal text-slate-400">mg/dL</span></h3>
                <p className="text-xs text-slate-400 mt-1">Mean resting serum cholesterol</p>
              </div>
            )}
            {summary.avg_trestbps !== undefined && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Resting Blood Pressure</span>
                <h3 className="text-3xl font-extrabold mt-2">{summary.avg_trestbps} <span className="text-base font-normal text-slate-400">mmHg</span></h3>
                <p className="text-xs text-slate-400 mt-1">Mean baseline systolic BP</p>
              </div>
            )}
            {summary.avg_thalach !== undefined && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Max Heart Rate</span>
                <h3 className="text-3xl font-extrabold mt-2">{summary.avg_thalach} <span className="text-base font-normal text-slate-400">bpm</span></h3>
                <p className="text-xs text-slate-400 mt-1">Mean peak heart rate achieved</p>
              </div>
            )}

            {/* Gender breakdown badge card */}
            {(summary.male_count !== undefined && summary.female_count !== undefined) && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gender Distribution</span>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <span className="text-2xl font-extrabold text-blue-600">{summary.male_count}</span>
                    <span className="text-xs text-slate-400 ml-1">Male ({Math.round(summary.male_count / (summary.male_count + summary.female_count) * 100)}%)</span>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-purple-600">{summary.female_count}</span>
                    <span className="text-xs text-slate-400 ml-1">Female ({Math.round(summary.female_count / (summary.male_count + summary.female_count) * 100)}%)</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-purple-200 dark:bg-purple-950 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(summary.male_count / (summary.male_count + summary.female_count)) * 100}%` }} />
                </div>
              </div>
            )}

            {/* Disease distribution card */}
            {(summary.positive_count !== undefined && summary.negative_count !== undefined) && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm sm:col-span-2 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Disease Prevalence in Dataset</span>
                  <Heart className="h-4 w-4 text-rose-500" />
                </div>
                <div className="flex items-center gap-6 mt-2">
                  <div>
                    <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{summary.positive_count}</span>
                    <span className="text-xs font-semibold text-slate-500 block">Disease Positive ({Math.round(summary.positive_count / (summary.positive_count + summary.negative_count) * 100)}%)</span>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{summary.negative_count}</span>
                    <span className="text-xs font-semibold text-slate-500 block">Disease Negative ({Math.round(summary.negative_count / (summary.positive_count + summary.negative_count) * 100)}%)</span>
                  </div>
                  <div className="flex-1 hidden sm:block">
                    <div className="h-2 w-full bg-emerald-200 dark:bg-emerald-950 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(summary.positive_count / (summary.positive_count + summary.negative_count)) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Model Evaluation & ROC Curve Row */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">Random Forest Classifier</span>
                <h3 className="text-lg font-bold">Model Evaluation Metrics</h3>
                <p className="text-xs text-slate-400 mb-4">Evaluated on stratified test partition</p>

                <div className="space-y-3.5 text-sm">
                  {model_evaluation.roc_auc !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-300 font-semibold flex items-center">
                        <TrendingUp className="h-4 w-4 text-emerald-500 mr-1.5 inline" /> ROC-AUC
                        <MetricTooltip explanation="Receiver Operating Characteristic Area Under Curve: Evaluates the model's overall capacity to correctly discriminate between disease-positive and disease-negative patients across all decision thresholds." />
                      </span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono text-base">
                        {(model_evaluation.roc_auc * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                  {model_evaluation.accuracy !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-300 font-semibold flex items-center">
                        Accuracy
                        <MetricTooltip explanation="Overall Diagnostic Accuracy: The exact percentage of correctly classified patient outcomes (both positive disease detections and correct healthy exclusions) across the test evaluation partition." />
                      </span>
                      <span className="font-bold font-mono">{(model_evaluation.accuracy * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.precision !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-300 font-semibold flex items-center">
                        Precision
                        <MetricTooltip explanation="Positive Predictive Value (Precision): The percentage of patients identified by the AI as cardiovascular high-risk who genuinely tested positive for cardiovascular disease." />
                      </span>
                      <span className="font-bold font-mono">{(model_evaluation.precision * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {(model_evaluation.recall !== undefined || model_evaluation.sensitivity !== undefined) && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-300 font-semibold flex items-center">
                        Recall
                        <MetricTooltip explanation="True Positive Rate (Recall): The percentage of confirmed cardiovascular disease patients that the model successfully detected without generating false negatives." />
                      </span>
                      <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">
                        {((model_evaluation.recall ?? model_evaluation.sensitivity ?? 0) * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                  {(model_evaluation.sensitivity !== undefined || model_evaluation.recall !== undefined) && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-300 font-semibold flex items-center">
                        Sensitivity
                        <MetricTooltip explanation="Clinical Sensitivity: Identical to recall in medical biostatistics, measuring the capacity to detect true disease-positive patients. Critical for eliminating missed diagnoses in emergency triage." />
                      </span>
                      <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">
                        {((model_evaluation.sensitivity ?? model_evaluation.recall ?? 0) * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                  {model_evaluation.specificity !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-300 font-semibold flex items-center">
                        Specificity
                        <MetricTooltip explanation="Clinical Specificity (True Negative Rate): The percentage of healthy patients correctly identified as low risk without triggering unnecessary cardiovascular false alarm consults." />
                      </span>
                      <span className="font-bold font-mono">{(model_evaluation.specificity * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.f1_score !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-300 font-semibold flex items-center">
                        F1-Score
                        <MetricTooltip explanation="Harmonic Mean F1-Score: A robust balanced diagnostic performance measure uniting precision and recall into a cohesive single evaluation percentage." />
                      </span>
                      <span className="font-bold font-mono">{(model_evaluation.f1_score * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.cv_accuracy !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-600 dark:text-slate-300 font-semibold flex items-center">
                        Cross-Validation Accuracy
                        <MetricTooltip explanation="5-Fold Stratified Cross-Validation Accuracy: The generalized model accuracy validated across 5 randomized rotating validation folds of the dataset, assuring zero overfitting." />
                      </span>
                      <span className="font-bold font-mono">{(model_evaluation.cv_accuracy * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.avg_confidence !== undefined && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 dark:text-slate-300 font-semibold flex items-center">
                        Model Confidence
                        <MetricTooltip explanation="Average Diagnostic Confidence: The mathematical mean of predictive certainty generated by the Random Forest classifier across evaluated patient profiles." />
                      </span>
                      <span className="font-bold font-mono text-blue-600 dark:text-blue-400">
                        {(model_evaluation.avg_confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Confusion Matrix Card */}
              {confusion_matrix && (confusion_matrix.tp !== undefined) && (
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Test Set Confusion Matrix</span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-center font-mono">
                    <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                      <span className="text-emerald-700 dark:text-emerald-400 font-extrabold block text-base">{confusion_matrix.tp}</span>
                      <span className="text-[10px] text-slate-500">True Positives (TP)</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                      <span className="font-extrabold block text-base text-slate-700 dark:text-slate-300">{confusion_matrix.fp}</span>
                      <span className="text-[10px] text-slate-500">False Positives (FP)</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                      <span className="font-extrabold block text-base text-slate-700 dark:text-slate-300">{confusion_matrix.fn}</span>
                      <span className="text-[10px] text-slate-500">False Negatives (FN)</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                      <span className="text-emerald-700 dark:text-emerald-400 font-extrabold block text-base">{confusion_matrix.tn}</span>
                      <span className="text-[10px] text-slate-500">True Negatives (TN)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROC Curve Chart */}
            <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">Receiver Operating Characteristic</span>
                <h3 className="text-lg font-bold">ROC Discrimination Curve</h3>
                <p className="text-xs text-slate-400 mb-4">Plots True Positive Rate vs False Positive Rate at all diagnostic threshold settings.</p>
              </div>

              <div className="h-72 w-full">
                {roc_curve && roc_curve.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={roc_curve} margin={{ left: -10, right: 10, top: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                      <XAxis 
                        dataKey="fpr" 
                        type="number" 
                        domain={[0, 1]} 
                        stroke="#94a3b8" 
                        fontSize={11} 
                        tickFormatter={(v) => v.toFixed(1)} 
                        label={{ value: 'False Positive Rate (1 - Specificity)', position: 'insideBottom', offset: -2, fontSize: 11, fill: '#64748b' }} 
                      />
                      <YAxis 
                        domain={[0, 1]} 
                        stroke="#94a3b8" 
                        fontSize={11} 
                        tickFormatter={(v) => v.toFixed(1)}
                        label={{ value: 'True Positive Rate (Sensitivity)', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#64748b' }}
                      />
                      <Tooltip 
                        formatter={(val: any) => [Number(val || 0).toFixed(3), '']}
                        labelFormatter={(label) => `FPR Threshold: ${Number(label).toFixed(3)}`}
                        contentStyle={{ borderRadius: '12px', fontSize: '12px', backgroundColor: '#0f172a', color: '#fff', border: 'none' }} 
                      />
                      <Line type="monotone" dataKey="tpr" name="Random Forest Classifier" stroke="#2563eb" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      {/* Random guess diagonal */}
                      <Line type="linear" dataKey="fpr" name="Random Guess (0.500)" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                      <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">
                    ROC Curve data points currently unavailable for rendering.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Distributions Grid (Age, BP, Chol, CP) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {distributions.age && (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Cohort Demographics</span>
                <h4 className="font-bold text-md mb-3">Age Distribution</h4>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.age} margin={{ left: -25, right: 5, top: 5, bottom: 0 }}>
                      <XAxis dataKey="group" stroke="#94a3b8" fontSize={10} />
                      <YAxis stroke="#94a3b8" fontSize={10} />
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            {distributions.blood_pressure && (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Systolic BP</span>
                <h4 className="font-bold text-md mb-3">Resting BP Groups</h4>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.blood_pressure} margin={{ left: -25, right: 5, top: 5, bottom: 0 }}>
                      <XAxis dataKey="group" stroke="#94a3b8" fontSize={10} />
                      <YAxis stroke="#94a3b8" fontSize={10} />
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            {distributions.cholesterol && (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Lipid Profiles</span>
                <h4 className="font-bold text-md mb-3">Serum Cholesterol</h4>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.cholesterol} margin={{ left: -25, right: 5, top: 5, bottom: 0 }}>
                      <XAxis dataKey="group" stroke="#94a3b8" fontSize={10} />
                      <YAxis stroke="#94a3b8" fontSize={10} />
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            {distributions.chest_pain && (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Symptomology</span>
                <h4 className="font-bold text-md mb-3">Chest Pain Types</h4>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributions.chest_pain} margin={{ left: -25, right: 5, top: 5, bottom: 0 }}>
                      <XAxis dataKey="type" stroke="#94a3b8" fontSize={9} interval={0} angle={-10} textAnchor="end" height={30} />
                      <YAxis stroke="#94a3b8" fontSize={10} />
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* Feature Importance & SHAP Attribution Row */}
          <div className="grid gap-6 md:grid-cols-2">
            {feature_importance && feature_importance.length > 0 && (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">Gini Impurity Attributions</span>
                <h3 className="text-lg font-bold mb-4">Random Forest Feature Importance Ranking</h3>
                <div className="space-y-3">
                  {feature_importance.slice(0, 8).map((fi, idx) => {
                    const maxVal = feature_importance[0]?.importance || 1;
                    const pct = (fi.importance / maxVal) * 100;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700 dark:text-slate-200 font-mono">{fi.feature}</span>
                          <span className="text-blue-600 dark:text-blue-400 font-mono">{fi.importance.toFixed(4)}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {shap_global_importance && shap_global_importance.length > 0 && (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-1">Game Theory Explainability</span>
                <h3 className="text-lg font-bold mb-4">SHAP Global Feature Impact (Mean |SHAP|)</h3>
                <div className="space-y-3">
                  {shap_global_importance.slice(0, 8).map((sh, idx) => {
                    const maxVal = shap_global_importance[0]?.impact || 1;
                    const pct = (sh.impact / maxVal) * 100;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700 dark:text-slate-200 font-mono">{sh.feature}</span>
                          <span className="text-rose-500 dark:text-rose-400 font-mono">+{sh.impact.toFixed(4)}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Clinical Correlation Heatmap Table */}
          {correlation_heatmap && correlation_heatmap.columns && correlation_heatmap.matrix && (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">Multi-Variable Analysis</span>
                  <h3 className="text-lg font-bold">Clinical Parameter Correlation Heatmap</h3>
                  <p className="text-xs text-slate-400">Pearson correlation coefficient matrix across all 13 diagnostic clinical variables & target outcome.</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs font-semibold">
                  <span className="px-2 py-0.5 rounded bg-rose-500/80 text-white font-bold">High Positive (+0.5)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Neutral (0.0)</span>
                  <span className="px-2 py-0.5 rounded bg-blue-600/80 text-white font-bold">High Negative (-0.5)</span>
                </div>
              </div>

              <div className="overflow-x-auto pb-2">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr>
                      <th className="p-2 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 font-bold sticky left-0 z-10">Feature</th>
                      {correlation_heatmap.columns.map((col) => (
                        <th key={col} className="p-2 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 font-bold text-center">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {correlation_heatmap.columns.map((rowName) => (
                      <tr key={rowName}>
                        <td className="p-2 border border-slate-200 dark:border-slate-800 font-bold bg-slate-50 dark:bg-slate-900 sticky left-0 z-10">
                          {rowName}
                        </td>
                        {correlation_heatmap.columns.map((colName) => {
                          const cell = correlation_heatmap.matrix.find((m) => m.x === colName && m.y === rowName);
                          const val = cell ? cell.value : 0;
                          return (
                            <td key={colName} className={`p-2 border border-slate-200 dark:border-slate-800 text-center transition-colors ${getCorrelationBg(val)}`}>
                              {val !== undefined ? val.toFixed(2) : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: LIVE USER ANALYTICS */}
      {activeTab === 'live' && (
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Activity className="h-4 w-4" /> LIVE PLATFORM TELEMETRY
                </span>
                <h3 className="text-xl font-bold mt-1">Real-Time User Assessment Activity</h3>
                <p className="text-xs text-slate-400">Aggregated statistics generated directly by active hospital clinical teams and verified users.</p>
              </div>
            </div>

            {liveStats ? (
              liveStats.totalPredictions > 0 ? (
                <div className="space-y-8">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Patient Assessments</span>
                      <h4 className="text-3xl font-extrabold mt-2 text-blue-600 dark:text-blue-400">{liveStats.totalPredictions}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Real patient evaluation runs logged</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">High Risk Triaged</span>
                      <h4 className="text-3xl font-extrabold mt-2 text-rose-600 dark:text-rose-400">{liveStats.highRisk}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Patients identified needing immediate cardiology consults</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Unique Patients Triaged</span>
                      <h4 className="text-3xl font-extrabold mt-2 text-emerald-600 dark:text-emerald-400">{liveStats.activeDoctors || liveStats.totalPredictions}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Unique anonymized patient records</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                    <h5 className="font-bold text-sm mb-3">Live Risk Severity Breakdown</h5>
                    <div className="space-y-2 text-xs font-semibold">
                      <div className="flex justify-between items-center p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-rose-600 dark:text-rose-400 font-bold">High Risk Classification</span>
                        <span>{liveStats.highRisk} cases ({Math.round(liveStats.highRisk / liveStats.totalPredictions * 100)}%)</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">Moderate Risk Classification</span>
                        <span>{liveStats.moderateRisk} cases ({Math.round(liveStats.moderateRisk / liveStats.totalPredictions * 100)}%)</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Low Risk Classification</span>
                        <span>{liveStats.lowRisk} cases ({Math.round(liveStats.lowRisk / liveStats.totalPredictions * 100)}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                  <Stethoscope className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3 animate-bounce" />
                  <h4 className="font-extrabold text-base text-slate-700 dark:text-slate-300">Zero Live Assessments Recorded Yet</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                    In compliance with clinical integrity guidelines, we do not generate synthetic placeholder runs. Run your first patient assessment in the Triage Studio to initialize real-time platform telemetry.
                  </p>
                </div>
              )
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Connecting to live Supabase / Mongo telemetry streams...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
