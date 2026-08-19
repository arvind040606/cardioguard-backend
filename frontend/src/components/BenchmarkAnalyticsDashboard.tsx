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
  Database,
  AlertCircle,
  Shield,
  Beaker,
  Cpu,
  Lock,
  BrainCircuit
} from 'lucide-react';

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export interface ModelComparisonData {
  primary_label: string;
  comparison_label: string;
  random_forest: {
    model_name: string;
    is_primary: boolean;
    accuracy: number;
    precision: number;
    sensitivity: number;
    specificity: number;
    f1_score: number;
    roc_auc: number;
    cv_mean: number;
    cv_std: number;
    confusion_matrix: { tn: number; fp: number; fn: number; tp: number };
  };
  logistic_regression: {
    model_name: string;
    is_primary: boolean;
    accuracy: number;
    precision: number;
    sensitivity: number;
    specificity: number;
    f1_score: number;
    roc_auc: number;
    cv_mean: number;
    cv_std: number;
    confusion_matrix: { tn: number; fp: number; fn: number; tp: number };
  };
  roc_curve_comparison: {
    random_forest: Array<{ fpr: number; tpr: number }>;
    logistic_regression: Array<{ fpr: number; tpr: number }>;
  };
}

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
    pr_auc?: number;
    brier_score?: number;
    cv_accuracy?: number;
    avg_confidence?: number;
  };
  model_comparison?: ModelComparisonData;
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

export function BenchmarkAnalyticsDashboard() {
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData | null>(null);
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
      } finally {
        if (isMounted) setLoading(false);
      }
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

  const { summary, distributions, model_evaluation, roc_curve, feature_importance, shap_global_importance, correlation_heatmap } = benchmarkData;

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
            Cleveland Heart Disease Benchmark
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            Comprehensive statistical analysis and machine learning evaluation metrics derived from the validated {cleanRecords}-patient Cleveland clinical cohort. This dashboard serves as the authoritative ground-truth reference for the CardioGuard predictive engine.
          </p>
        </div>
      </div>

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

          {/* Section: Data Science Model Comparison */}
          {benchmarkData.model_comparison && (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-2">
                    <BrainCircuit className="h-3.5 w-3.5" /> Benchmarking & Comparative Analytics
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight">Data Science Model Comparison</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Side-by-side performance evaluation on the Cleveland UCI Heart Disease dataset (13 clinical features, 5-Fold Stratified CV).
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-600 text-white shadow-sm flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" /> Primary Production Model: Random Forest
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5" /> Comparison Model: Logistic Regression
                  </span>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      <th className="pb-3 px-4">Evaluation Metric</th>
                      <th className="pb-3 px-4 text-blue-600 dark:text-blue-400">Random Forest (Primary)</th>
                      <th className="pb-3 px-4 text-purple-600 dark:text-purple-400">Logistic Regression (Comparison)</th>
                      <th className="pb-3 px-4">Delta / Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {[
                      { 
                        metric: 'Accuracy (%)', 
                        rf: (benchmarkData.model_comparison.random_forest.accuracy * 100).toFixed(1) + '%', 
                        lr: (benchmarkData.model_comparison.logistic_regression.accuracy * 100).toFixed(1) + '%',
                        rfVal: benchmarkData.model_comparison.random_forest.accuracy,
                        lrVal: benchmarkData.model_comparison.logistic_regression.accuracy,
                        desc: 'Overall correct prediction rate'
                      },
                      { 
                        metric: 'Precision (%)', 
                        rf: (benchmarkData.model_comparison.random_forest.precision * 100).toFixed(1) + '%', 
                        lr: (benchmarkData.model_comparison.logistic_regression.precision * 100).toFixed(1) + '%',
                        rfVal: benchmarkData.model_comparison.random_forest.precision,
                        lrVal: benchmarkData.model_comparison.logistic_regression.precision,
                        desc: 'Positive predictive value'
                      },
                      { 
                        metric: 'Sensitivity / Recall (%)', 
                        rf: (benchmarkData.model_comparison.random_forest.sensitivity * 100).toFixed(1) + '%', 
                        lr: (benchmarkData.model_comparison.logistic_regression.sensitivity * 100).toFixed(1) + '%',
                        rfVal: benchmarkData.model_comparison.random_forest.sensitivity,
                        lrVal: benchmarkData.model_comparison.logistic_regression.sensitivity,
                        desc: 'True positive detection rate'
                      },
                      { 
                        metric: 'Specificity (%)', 
                        rf: (benchmarkData.model_comparison.random_forest.specificity * 100).toFixed(1) + '%', 
                        lr: (benchmarkData.model_comparison.logistic_regression.specificity * 100).toFixed(1) + '%',
                        rfVal: benchmarkData.model_comparison.random_forest.specificity,
                        lrVal: benchmarkData.model_comparison.logistic_regression.specificity,
                        desc: 'True negative detection rate'
                      },
                      { 
                        metric: 'F1 Score (%)', 
                        rf: (benchmarkData.model_comparison.random_forest.f1_score * 100).toFixed(1) + '%', 
                        lr: (benchmarkData.model_comparison.logistic_regression.f1_score * 100).toFixed(1) + '%',
                        rfVal: benchmarkData.model_comparison.random_forest.f1_score,
                        lrVal: benchmarkData.model_comparison.logistic_regression.f1_score,
                        desc: 'Harmonic mean of precision & recall'
                      },
                      { 
                        metric: 'ROC-AUC (%)', 
                        rf: (benchmarkData.model_comparison.random_forest.roc_auc * 100).toFixed(1) + '%', 
                        lr: (benchmarkData.model_comparison.logistic_regression.roc_auc * 100).toFixed(1) + '%',
                        rfVal: benchmarkData.model_comparison.random_forest.roc_auc,
                        lrVal: benchmarkData.model_comparison.logistic_regression.roc_auc,
                        desc: 'Area under ROC curve'
                      },
                      { 
                        metric: '5-Fold CV Accuracy', 
                        rf: (benchmarkData.model_comparison.random_forest.cv_mean * 100).toFixed(1) + '% ± ' + (benchmarkData.model_comparison.random_forest.cv_std * 100).toFixed(1) + '%', 
                        lr: (benchmarkData.model_comparison.logistic_regression.cv_mean * 100).toFixed(1) + '% ± ' + (benchmarkData.model_comparison.logistic_regression.cv_std * 100).toFixed(1) + '%',
                        rfVal: benchmarkData.model_comparison.random_forest.cv_mean,
                        lrVal: benchmarkData.model_comparison.logistic_regression.cv_mean,
                        desc: 'Stratified cross-validation mean'
                      },
                    ].map((row) => {
                      const diff = (row.rfVal - row.lrVal) * 100;
                      return (
                        <tr key={row.metric} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                          <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-100">
                            {row.metric}
                            <span className="block text-[10px] font-normal text-slate-400">{row.desc}</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-extrabold text-blue-600 dark:text-blue-400">
                            {row.rf}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-extrabold text-purple-600 dark:text-purple-400">
                            {row.lr}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs font-bold">
                            {diff > 0.1 ? (
                              <span className="text-emerald-600 dark:text-emerald-400">Random Forest (+{diff.toFixed(1)}%)</span>
                            ) : diff < -0.1 ? (
                              <span className="text-purple-600 dark:text-purple-400">Logistic Reg (+{Math.abs(diff).toFixed(1)}%)</span>
                            ) : (
                              <span className="text-slate-400">Equal Performance</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Confusion Matrices Side-by-Side */}
              <div className="grid gap-6 md:grid-cols-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-5 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-950/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">Random Forest Confusion Matrix</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">PRIMARY</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] text-slate-400 font-medium">True Negatives (TN)</span>
                      <span className="text-lg font-extrabold text-emerald-600">{benchmarkData.model_comparison.random_forest.confusion_matrix.tn}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] text-slate-400 font-medium">False Positives (FP)</span>
                      <span className="text-lg font-extrabold text-amber-600">{benchmarkData.model_comparison.random_forest.confusion_matrix.fp}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] text-slate-400 font-medium">False Negatives (FN)</span>
                      <span className="text-lg font-extrabold text-rose-600">{benchmarkData.model_comparison.random_forest.confusion_matrix.fn}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] text-slate-400 font-medium">True Positives (TP)</span>
                      <span className="text-lg font-extrabold text-blue-600">{benchmarkData.model_comparison.random_forest.confusion_matrix.tp}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/20 dark:bg-purple-950/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">Logistic Regression Confusion Matrix</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-600/20 text-purple-400 border border-purple-500/30">BENCHMARK</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] text-slate-400 font-medium">True Negatives (TN)</span>
                      <span className="text-lg font-extrabold text-emerald-600">{benchmarkData.model_comparison.logistic_regression.confusion_matrix.tn}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] text-slate-400 font-medium">False Positives (FP)</span>
                      <span className="text-lg font-extrabold text-amber-600">{benchmarkData.model_comparison.logistic_regression.confusion_matrix.fp}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] text-slate-400 font-medium">False Negatives (FN)</span>
                      <span className="text-lg font-extrabold text-rose-600">{benchmarkData.model_comparison.logistic_regression.confusion_matrix.fn}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="block text-[10px] text-slate-400 font-medium">True Positives (TP)</span>
                      <span className="text-lg font-extrabold text-purple-600">{benchmarkData.model_comparison.logistic_regression.confusion_matrix.tp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Model Performance Panel & ROC */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Performance Evaluation</span>
                <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-indigo-500" /> Random Forest
                </h3>
                <div className="space-y-3 text-sm">
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
                  {model_evaluation.specificity !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Specificity</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{(model_evaluation.specificity * 100).toFixed(1)}%</span>
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
                      <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400">{(model_evaluation.roc_auc * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.pr_auc !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-bold">PR-AUC</span>
                      <span className="font-mono font-extrabold text-purple-600 dark:text-purple-400">{(model_evaluation.pr_auc * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  {model_evaluation.brier_score !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium text-xs">Calibration Brier Score</span>
                      <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400">{model_evaluation.brier_score.toFixed(4)}</span>
                    </div>
                  )}
                  {model_evaluation.cv_accuracy !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-medium text-xs">5-Fold CV Accuracy</span>
                      <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">{(model_evaluation.cv_accuracy * 100).toFixed(1)}%</span>
                    </div>
                  )}
                </div>

                {benchmarkData.confusion_matrix && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Test Confusion Matrix (N={testSize})</span>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                        <div className="text-emerald-700 dark:text-emerald-400 font-bold text-base">{benchmarkData.confusion_matrix.tn}</div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-500">True Neg (TN)</div>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                        <div className="text-amber-700 dark:text-amber-400 font-bold text-base">{benchmarkData.confusion_matrix.fp}</div>
                        <div className="text-[10px] text-amber-600 dark:text-amber-500">False Pos (FP)</div>
                      </div>
                      <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                        <div className="text-rose-700 dark:text-rose-400 font-bold text-base">{benchmarkData.confusion_matrix.fn}</div>
                        <div className="text-[10px] text-rose-600 dark:text-rose-500">False Neg (FN)</div>
                      </div>
                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                        <div className="text-indigo-700 dark:text-indigo-400 font-bold text-base">{benchmarkData.confusion_matrix.tp}</div>
                        <div className="text-[10px] text-indigo-600 dark:text-indigo-500">True Pos (TP)</div>
                      </div>
                    </div>
                  </div>
                )}
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
                        {distributions.blood_sugar.map((_, index) => (
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
                         {distributions.st_slope.map((_, index) => (
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
    </div>
  );
}
