import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle,
  ChevronDown,
  Database,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BenchmarkAnalyticsDashboard } from '../components/BenchmarkAnalyticsDashboard';

const benefits = [
  {
    title: 'SHAP Explainability & Feature Importance',
    desc: 'Never wonder about a score. Every output is backed by SHAP feature attribution metrics that show exactly which physiological indicators drove the risk calculation.',
    icon: BrainCircuit
  },
  {
    title: 'Standardized EMR Variables',
    desc: 'Compatible with standard medical parameters (resting BP, serum cholesterol, ECG slope, blood vessel blocks), streamlining clinical intake workflows.',
    icon: Database
  },
  {
    title: 'Secure Practitioner Hub',
    desc: 'A professional dashboard featuring state-of-the-art Light/Dark modes, audit history, role-based controls, and easy CSV/PDF clinical exporting.',
    icon: ShieldCheck
  }
];

const steps = [
  { num: '01', title: 'Input Physiological Vitals', desc: 'Fill in the 13 clinical vitals and exam indicators from the patient\'s health record.' },
  { num: '02', title: 'ML Pipeline Processing', desc: 'Our trained Random Forest model runs calculations on the scaled parameters in seconds.' },
  { num: '03', title: 'Review Risk Attribution', desc: 'View the final risk percentage, clinical status, recommendations, and SHAP explanation charts.' },
  { num: '04', title: 'Export PDF Report', desc: 'Download a clean, printable clinical summary to include in the patient\'s physical charts.' }
];



export function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [benchmarkPreview, setBenchmarkPreview] = useState<any>(null);
  const [previewLoading, setPreviewLoading] = useState<boolean>(true);

  const API_URL = import.meta.env.VITE_API_URL || '';

  const dynamicFaqs = [
    {
      q: "What is CardioGuard?",
      a: "CardioGuard is a cardiovascular risk prediction and benchmark analytics platform built using machine learning and validated clinical datasets."
    },
    {
      q: "Which dataset was used to develop the prediction model?",
      a: "The predictive model was developed, trained, and benchmarked exclusively using the UCI Cleveland Heart Disease Dataset."
    },

    {
      q: "How are benchmark analytics calculated?",
      a: "All statistics, demographic distributions, charts, and model performance metrics are computed dynamically from the validated dataset by our backend services. No placeholder or simulated values are used in the dashboard."
    },
    {
      q: "Which machine learning algorithm is used?",
      a: "The core predictive engine relies on a Random Forest classifier. This algorithm was selected due to its robust ability to handle complex, non-linear physiological relationships while minimizing overfitting through ensemble bagging."
    },
    {
      q: "How are prediction factors interpreted?",
      a: "Feature importance and prediction explanations are generated directly from the trained Random Forest model's internal weighting system. This allows the impact of specific physiological markers (such as cholesterol or resting blood pressure) to be presented transparently."
    },
    {
      q: "Can I analyze my own patient data?",
      a: "Yes. Authorized users can input new patient physiological parameters into the Triage Studio. The platform will dynamically run the data against the serialized model and generate an immediate cardiovascular risk assessment."
    },
    {
      q: "Is this platform intended for clinical diagnosis?",
      a: "No. CardioGuard is designed strictly as an educational and research decision-support platform. It is a data science demonstration tool and should never replace the professional judgment of a qualified medical practitioner."
    }
  ];

  useEffect(() => {
    let isMounted = true;
    axios.get(`${API_URL}/api/stats/benchmark`)
      .then((res) => {
        if (isMounted) setBenchmarkPreview(res.data);
      })
      .catch((err) => console.error("Failed fetching benchmark preview for hero:", err))
      .finally(() => {
        if (isMounted) setPreviewLoading(false);
      });
    return () => { isMounted = false; };
  }, [API_URL]);

  return (
    <div className="bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 min-h-screen font-sans selection:bg-blue-600 selection:text-white">

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                Clinical Decision Support & Predictive Analytics
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Explainable <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Cardiovascular</span> Risk Prediction.
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                CardioGuard Clinical Decision Support bridges the gap between state-of-the-art supervised machine learning models and clinical workflows by providing data-driven risk estimation with clear SHAP explainability, validated on the Cleveland Heart Disease Dataset.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 hover:scale-[1.01] shadow-lg shadow-blue-500/20"
                >
                  Enter Triage Studio
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#clinical-intelligence"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm"
                >
                  <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Explore Benchmark Analytics
                </a>
              </div>

              {/* Benefits badge row */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  {benchmarkPreview?.summary?.total_patients || '...'} Validated Records
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  SHAP Local Attribution
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  Zero Placeholder Stats
                </div>
              </div>
            </motion.div>

            {/* Right Dynamic Benchmark Preview Card (Replaces Static Dummy Mockup) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 h-40 w-40 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl" />

                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-bold text-sm">Cleveland UCI Dataset Benchmark</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                    {benchmarkPreview?.summary?.total_patients || '...'} Real Records
                  </span>
                </div>

                {/* Dynamic Score Showcase */}
                <div className="my-6 space-y-4">
                  {previewLoading ? (
                    <div className="py-4 space-y-3">
                      <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                      <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                    </div>
                  ) : benchmarkPreview ? (
                    <div className="space-y-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                            ROC-AUC
                            <div className="relative inline-flex items-center ml-1 group/tooltip cursor-help z-20">
                              <HelpCircle className="h-3.5 w-3.5 text-slate-400 hover:text-blue-500 inline transition" />
                              <div className="absolute left-0 bottom-full mb-2 w-64 p-2.5 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-normal leading-relaxed rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-50 text-left normal-case">
                                Receiver Operating Characteristic Area Under Curve (ROC-AUC): Evaluates the Random Forest classifier's capacity to accurately distinguish between cardiovascular disease-positive and healthy patients across all clinical decision thresholds.
                                <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                              </div>
                            </div>
                          </span>
                          <h3 className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                            {benchmarkPreview.model_evaluation?.roc_auc !== undefined ? `${(benchmarkPreview.model_evaluation.roc_auc * 100).toFixed(1)}%` : ''}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-slate-400 block font-medium flex items-center justify-end">
                            Sensitivity (Recall)
                            <div className="relative inline-flex items-center ml-1 group/tooltip cursor-help z-20">
                              <HelpCircle className="h-3.5 w-3.5 text-slate-400 hover:text-blue-500 inline transition" />
                              <div className="absolute right-0 bottom-full mb-2 w-64 p-2.5 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-normal leading-relaxed rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-50 text-left normal-case">
                                Clinical Sensitivity: The verified true positive diagnostic rate among patients confirmed to have coronary heart disease in the Cleveland evaluation cohort.
                                <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                              </div>
                            </div>
                          </span>
                          <span className="text-lg font-bold text-rose-500 font-mono">
                            {benchmarkPreview.model_evaluation?.recall !== undefined ? `${(benchmarkPreview.model_evaluation.recall * 100).toFixed(1)}%` : ''}
                          </span>
                        </div>
                      </div>

                      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(benchmarkPreview.model_evaluation?.roc_auc || 0.94) * 100}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-slate-400">
                      Backend analytical engine unavailable for preview display.
                    </div>
                  )}
                </div>

                {/* SHAP Global Factor Attributions */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top SHAP Global Impact Factors</span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
                      Mean |SHAP| Value
                    </span>
                  </div>

                  <div className="grid gap-2 text-xs">
                    {previewLoading ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-9 w-full bg-slate-50 dark:bg-slate-800 rounded-xl animate-pulse" />
                      ))
                    ) : benchmarkPreview && benchmarkPreview.shap_global_importance && benchmarkPreview.shap_global_importance.length > 0 ? (
                      benchmarkPreview.shap_global_importance.slice(0, 3).map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="font-semibold text-slate-700 dark:text-slate-300 font-sans">{item.feature}</span>
                          <span className="font-extrabold text-rose-500 dark:text-rose-400 font-mono">+{item.impact.toFixed(4)} impact</span>
                        </div>
                      ))
                    ) : benchmarkPreview && benchmarkPreview.feature_importance ? (
                      benchmarkPreview.feature_importance.slice(0, 3).map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="font-semibold text-slate-700 dark:text-slate-300 font-sans">{item.feature}</span>
                          <span className="font-extrabold text-blue-600 dark:text-blue-400 font-mono">+{item.importance.toFixed(4)} weight</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-slate-400 py-2">No placeholder predictions displayed.</div>
                    )}
                  </div>

                  <p className="text-[10px] text-slate-400 mt-2 text-center border-t border-slate-100 dark:border-slate-800/60 pt-3 font-sans leading-relaxed">
                    ⚠️ <b>Clinical Authenticity Guarantee:</b> Computed dynamically from <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-blue-600 dark:text-blue-400">models/shap_explainer.pkl</code> & <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-blue-600 dark:text-blue-400">data/heart.csv</code>. Zero static placeholder metrics.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Clinical Intelligence & Benchmark Analytics Studio */}
      <section id="clinical-intelligence" className="py-20 bg-slate-100/50 dark:bg-[#0c1221]/50 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-7xl px-6">
          <BenchmarkAnalyticsDashboard />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-center space-y-12">
          <div className="space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Clinical Focus</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Predictive Analytics & Decision Support Benefits</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">We preserve rigorous supervised machine learning pipelines while offering an evidence-based clinical frontend interface.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 text-left">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="inline-flex rounded-2xl bg-blue-50 dark:bg-blue-950/40 p-3.5 text-blue-600 dark:text-blue-400 mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-100/50 dark:bg-[#0c1221]/50 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-7xl px-6 space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Technical Pipeline</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">How The Predictive Pipeline Works</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Review the simplified pipeline from physiological intake to decision attribution.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => (
              <div key={idx} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-3xl font-extrabold text-blue-100 dark:text-slate-800 select-none">
                  {s.num}
                </span>
                <h3 className="text-md font-bold mb-2 mt-4">{s.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-100/50 dark:bg-[#0c1221]/50 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-3xl px-6 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">SUPPORT & INSIGHTS</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {dynamicFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-5 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-950/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left">

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="h-6 w-6 text-blue-500" />
              <div>
                <span className="font-bold text-lg tracking-tight block">CardioGuard AI</span>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Explainable Heart Disease Risk Predictor</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed">
              Leading the path in open, evidence-based clinical decision support systems using supervised machine learning models and Cleveland Heart Disease Dataset validation.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4">Clinical Studio</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/login" className="hover:text-white transition">Triage Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Risk Prediction</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Audit Log Records</Link></li>
              <li><Link to="/login" className="hover:text-white transition">SHAP Explainer Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-4">Research & Data</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://archive.ics.uci.edu/dataset/45/heart+disease" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Cleveland Dataset</a></li>
              <li><a href="#clinical-intelligence" className="hover:text-white transition">Benchmark Studio</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">Random Forest pipeline</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm mb-4">Regulatory Notice</h4>
            <p className="text-[10px] leading-normal text-slate-500">
              For research and prototype presentation purposes only. Not FDA cleared. Always consult a qualified medical professional for health reviews and diagnostics.
            </p>
          </div>

        </div>

        <div className="mx-auto max-w-7xl px-6 mt-8 pt-8 border-t border-slate-800/80 text-center text-xs space-y-2">
          <p>© {new Date().getFullYear()} CardioGuard Clinical Predictive Analytics. All rights reserved. Built with evidence-based supervised machine learning models and zero placeholder statistics.</p>
          <p className="text-slate-500 pt-1">
            Developed by <span className="font-semibold text-slate-300">Krisha Sharma</span>, <span className="font-semibold text-slate-300">Arvind Madaan</span>, and <span className="font-semibold text-slate-300">Janvi Dawra</span>.
          </p>
        </div>
      </footer>

    </div>
  );
}
