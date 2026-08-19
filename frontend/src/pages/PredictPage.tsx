import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Stethoscope, 
  Printer, 
  RotateCcw,
  HelpCircle
} from 'lucide-react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { supabase } from '../supabase';
import type { PatientInput, PredictionResult } from '../types';
import { RiskGauge } from '../components/RiskGauge';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { ReportTemplate, type ReportRecord } from '../components/ReportTemplate';

const defaultValues: Partial<PatientInput & { patientName?: string; patientId?: string }> = {
  patientName: '',
  patientId: '',
};

const fieldGroups = [
  {
    title: 'Patient profile',
    fields: [
      { 
        key: 'age', 
        label: 'Age (years)', 
        type: 'number', 
        min: 1, 
        max: 120, 
        step: 1,
        tooltip: "Enter the patient's age in years.",
        hint: 'Range: 0–120 years'
      },
      { 
        key: 'sex', 
        label: 'Sex', 
        type: 'select', 
        options: [{ label: 'Female', value: '0' }, { label: 'Male', value: '1' }],
        tooltip: "Select the patient's sex.",
        hint: 'Select: Male / Female'
      },
      { 
        key: 'cp', 
        label: 'Chest pain type', 
        type: 'select', 
        options: [{ label: 'Typical angina', value: '0' }, { label: 'Atypical angina', value: '1' }, { label: 'Non-anginal pain', value: '2' }, { label: 'Asymptomatic', value: '3' }],
        tooltip: "Select the type of chest pain reported by the patient.",
        hint: "Select the option that best matches the patient's symptoms."
      },
    ],
  },
  {
    title: 'Physiological vitals',
    fields: [
      { 
        key: 'trestbps', 
        label: 'Resting Blood Pressure (mmHg)', 
        type: 'number', 
        min: 50, 
        max: 250, 
        step: 1,
        tooltip: "Enter the patient's resting systolic blood pressure in mmHg.",
        hint: 'Range: 50–250 mmHg'
      },
      { 
        key: 'chol', 
        label: 'Serum Cholesterol (mg/dL)', 
        type: 'number', 
        min: 80, 
        max: 600, 
        step: 1,
        tooltip: "Enter the patient's serum cholesterol level from the blood test.",
        hint: 'Range: 80–600 mg/dL'
      },
      { 
        key: 'thalach', 
        label: 'Max heart rate achieved (bpm)', 
        type: 'number', 
        min: 50, 
        max: 250, 
        step: 1,
        tooltip: "Enter the maximum heart rate reached during the exercise/stress test.",
        hint: 'Range: 50–250 bpm'
      },
    ],
  },
  {
    title: 'Electrocardiographic markers',
    fields: [
      { 
        key: 'fbs', 
        label: 'Fasting blood sugar > 120 mg/dL', 
        type: 'select', 
        options: [{ label: 'No (Normal)', value: '0' }, { label: 'Yes (Elevated)', value: '1' }],
        tooltip: "Indicates whether fasting blood sugar is above 120 mg/dL.",
        hint: 'Select Yes or No'
      },
      { 
        key: 'restecg', 
        label: 'Resting ECG result', 
        type: 'select', 
        options: [{ label: 'Normal', value: '0' }, { label: 'ST-T wave abnormality', value: '1' }, { label: 'Left ventricular hypertrophy', value: '2' }],
        tooltip: "Select the patient's resting ECG result.",
        hint: "Select the patient's ECG result."
      },
      { 
        key: 'exang', 
        label: 'Exercise induced angina', 
        type: 'select', 
        options: [{ label: 'No', value: '0' }, { label: 'Yes', value: '1' }],
        tooltip: "Indicates whether the patient experiences angina during exercise.",
        hint: 'Select Yes or No'
      },
    ],
  },
  {
    title: 'Clinical scan diagnostics',
    fields: [
      { 
        key: 'oldpeak', 
        label: 'ST depression (oldpeak)', 
        type: 'number', 
        min: 0, 
        max: 10, 
        step: 0.1,
        tooltip: "Enter the ST depression value reported by the ECG/stress test.",
        hint: 'Range: 0–10'
      },
      { 
        key: 'slope', 
        label: 'Slope of peak ST segment', 
        type: 'select', 
        options: [{ label: 'Upsloping', value: '0' }, { label: 'Flat', value: '1' }, { label: 'Downsloping', value: '2' }],
        tooltip: "Select the slope reported by the exercise ECG.",
        hint: 'Select the reported ST-segment slope.'
      },
      { 
        key: 'ca', 
        label: 'Major vessels colored by fluoroscopy', 
        type: 'select', 
        options: [{ label: '0 vessels', value: '0' }, { label: '1 vessel', value: '1' }, { label: '2 vessels', value: '2' }, { label: '3 vessels', value: '3' }],
        tooltip: "Enter the number of major vessels reported by the clinical test.",
        hint: 'Allowed values: 0–3'
      },
      { 
        key: 'thal', 
        label: 'Thalassemia scan', 
        type: 'select', 
        options: [{ label: 'Normal', value: '1' }, { label: 'Fixed defect', value: '2' }, { label: 'Reversible defect', value: '3' }],
        tooltip: "Select the thalassemia test/result category reported in the medical record.",
        hint: 'Select the reported test category.'
      },
    ],
  },
];

export function PredictPage() {
  const { user, token } = useAuth();
  const { showNotification } = useNotification();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });
  
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [patientDetails, setPatientDetails] = useState({ name: 'Anonymous', id: 'Not Available' });
  const [submittedInputs, setSubmittedInputs] = useState<any>(null);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    setMessage(null);
    setResult(null);

    const pName = values.patientName || 'Anonymous';
    const pId = values.patientId || 'Not Available';
    setPatientDetails({ name: pName, id: pId });
    setSubmittedInputs(values);

    // Step-by-step loading messages cycling rapidly without halting network execution
    const steps = [
      'Reading patient physiological vitals...',
      'Scaling features to match model boundaries...',
      'Running Random Forest classifier (100 estimators)...',
      'Attributing SHAP explainability matrices...',
      'Compiling clinical health recommendations...'
    ];

    setLoadingStep(steps[0]);
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setLoadingStep(steps[stepIndex]);
    }, 250);

    try {
      // Stripping patient identifiers for ML model
      const { patientName: _, patientId: __, ...payload } = values;
      const modelPayload = Object.fromEntries(
        Object.entries(payload).map(([key, value]) => [key, Number(value)])
      );

      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await axios.post(`${API_URL}/api/predict`, {
        patientName: pName,
        patientId: pId,
        ...modelPayload
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 45000
      });

      const mlData = response.data;
      setResult(mlData);

      if (user) {
        // Save to Supabase in background without delaying UI display
        const payload: any = {
          user_id: user.id,
          patient_name: pName,
          patient_id: pId,
          prediction: mlData.prediction,
          risk_probability: mlData.probability,
          confidence: mlData.confidence,
          recommendation: mlData.recommendations || [],
          input_data: modelPayload,
          explanation: mlData.explanation || [],
          risk_level: mlData.risk_level
        };
        (supabase as any).from('predictions').insert([payload]).then().catch(console.error);
      }

      showNotification("Risk analysis generated successfully", "success");
    } catch (error: any) {
      console.error(error);
      const errText = error.response?.data?.error || 'Prediction request failed. Verify backend services are active.';
      setMessage(errText);
      showNotification(errText, "error");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  });

  const resetForm = () => {
    reset(defaultValues);
    setResult(null);
    showNotification("Form reset successfully", "info");
  };

  const handlePrint = () => {
    window.print();
  };

  // Recharts boundary data for probability chart
  const boundaryData = useMemo(() => {
    if (!result) return [];
    return [
      { name: 'Patient Risk', value: Math.round(result.probability * 100), color: result.risk_level === 'High' ? '#ef4444' : result.risk_level === 'Moderate' ? '#f59e0b' : '#10b981' },
      { name: 'Low Risk Max', value: 30, color: '#e2e8f0' },
      { name: 'Mod Risk Max', value: 60, color: '#cbd5e1' },
    ];
  }, [result]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] relative">
      
      {/* 1. Predict Intake Form */}
      <motion.form 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        onSubmit={onSubmit} 
        className="no-print space-y-6 rounded-[32px] border border-slate-200 dark:border-slate-800/40 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl text-left"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-500 mb-1">INPUT PORTAL</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Patient Vitals Intake</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Patient Metadata Info */}
        <div className="rounded-[24px] border border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-transparent p-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">Patient Name</label>
            <input
              type="text"
              {...register('patientName', { required: true })}
              className="w-full rounded-[16px] border border-slate-200 dark:border-transparent bg-white dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500/50 transition text-sm text-slate-900 dark:text-white font-medium shadow-inner"
              placeholder="e.g. John Doe"
            />
            {errors.patientName && <span className="text-[10px] text-rose-500 font-bold block mt-1">Patient name is required</span>}
          </div>
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">Patient Identifier / ID</label>
            <input
              type="text"
              {...register('patientId', { required: true })}
              className="w-full rounded-[16px] border border-slate-200 dark:border-transparent bg-white dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500/50 transition text-sm text-slate-900 dark:text-white font-medium shadow-inner"
              placeholder="e.g. MRN-12345"
            />
            {errors.patientId && <span className="text-[10px] text-rose-500 font-bold block mt-1">Patient ID is required</span>}
          </div>
        </div>

        {/* Grouped Vitals Forms */}
        <div className="space-y-6">
          {fieldGroups.map((group) => (
            <div key={group.title} className="rounded-[32px] bg-slate-100 dark:bg-slate-800/50 p-6 sm:p-8 shadow-sm">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-5">{group.title}</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.fields.map((field) => (
                  <div key={field.key} className="space-y-1 text-left">
                    <div className="flex items-center justify-between gap-1">
                      <span className="inline-flex items-center text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {field.label}
                        <div className="relative inline-flex items-center ml-1.5 group/tooltip cursor-pointer">
                          <HelpCircle className="h-3.5 w-3.5 text-slate-400 hover:text-blue-500 transition-colors" />
                          <div className="absolute left-0 bottom-full mb-2 w-56 p-2.5 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-normal leading-relaxed rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:visible transition-all duration-150 pointer-events-none z-50 normal-case">
                            {field.tooltip}
                            <div className="absolute top-full left-3 -mt-1 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                          </div>
                        </div>
                      </span>
                    </div>

                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                      {field.hint}
                    </p>

                    {field.type === 'select' ? (
                      <select
                        {...register(field.key as keyof PatientInput, { valueAsNumber: true })}
                        className="w-full rounded-[16px] border border-slate-200 dark:border-transparent bg-white dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500/50 transition text-sm font-medium text-slate-900 dark:text-white shadow-inner cursor-pointer mt-1"
                      >
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        {...register(field.key as keyof PatientInput, { 
                          valueAsNumber: true, 
                          required: true,
                          min: field.min,
                          max: field.max
                        })}
                        type="number"
                        step={field.step}
                        className="w-full rounded-[16px] border border-slate-200 dark:border-transparent bg-white dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500/50 transition text-sm font-medium text-slate-900 dark:text-white shadow-inner mt-1"
                      />
                    )}
                    {errors[field.key as keyof PatientInput] && (
                      <span className="text-[10px] text-rose-500 dark:text-rose-400 font-bold block mt-1">Field required (limits: {field.min}-{field.max})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Form Submission */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-400 font-medium">
            Protected by a secure role-based medical auditing pipeline.
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-6 py-4 font-semibold text-white shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-amber-400" />}
            {loading ? 'Processing Triage...' : 'Execute Data-Driven Prediction'}
          </button>
        </div>

        {message && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-900 p-4 text-xs font-semibold text-rose-600">
            {message}
          </div>
        )}
      </motion.form>

      {/* 2. Loading State Transition */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="no-print fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-md text-white"
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl flex flex-col items-center max-w-sm text-center space-y-6">
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
              <div className="space-y-2">
                <h4 className="font-extrabold text-lg">Clinical Predictive Analytics Studio</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed h-8">
                  {loadingStep}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Output Predictions Panel */}
      <div className="no-print space-y-6">
        <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col items-start justify-between min-h-[300px]">
          <div className="w-full flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 dark:bg-blue-950 p-2.5 text-blue-600 dark:text-blue-400">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">REPORT OUTCOME</p>
                <h3 className="text-lg font-extrabold tracking-tight dark:text-white mt-0.5">Triage Results</h3>
              </div>
            </div>
            
            {result && (
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 text-xs font-semibold shadow transition cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                Print Clinical PDF
              </button>
            )}
          </div>

          {!result ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center w-full py-16">
              <AlertCircle className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-700" />
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Awaiting Intake Submission</h4>
              <p className="text-xs text-slate-400 mt-2 max-w-[240px] leading-relaxed">
                Log the patient's physiological markers in the intake form to execute the Random Forest classifier.
              </p>
            </div>
          ) : (
            <div className="w-full space-y-6 mt-6 text-left">
              
              {/* Dial Gauge & Status Row */}
              <div className="grid gap-6 sm:grid-cols-2 items-center">
                <RiskGauge probability={result.probability} riskLevel={result.risk_level} />
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">CLASSIFICATION STATUS</span>
                    <span className={`inline-block text-xl font-extrabold mt-1 uppercase tracking-tight ${
                      result.risk_level.toLowerCase() === 'high' 
                        ? 'text-rose-600 dark:text-rose-400' 
                        : result.risk_level.toLowerCase() === 'moderate'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {result.risk_level} Risk ({(result.probability * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">MODEL CONFIDENCE</span>
                    <span className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-0.5 block">
                      {(result.confidence * 100).toFixed(1)}% confidence score
                    </span>
                  </div>
                  <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-955/20 p-3">
                    <p className="text-[11px] leading-normal text-slate-500 dark:text-slate-400 font-medium">
                      {result.risk_level === 'High' 
                        ? '⚠️ Alert: Immediate clinical intervention required. Prioritize cardiologist diagnostic escalation.' 
                        : result.risk_level === 'Moderate'
                        ? '⚡ Advisory: Monitor cardiovascular telemetry regularly. Schedule preventive clinical checkups.'
                        : '✅ Normal: Maintain current healthy lifestyle habits. Schedule routine checkups.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Boundary chart */}
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Risk Threshold Comparison</span>
                <div className="h-28 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={boundaryData} margin={{ left: -10, right: 10, top: 0, bottom: 0 }}>
                      <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={9} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={9} width={80} />
                      <Tooltip />
                      <Bar dataKey="value" radius={6} barSize={12}>
                        {boundaryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recommendations */}
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Clinical Recommendations
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed pl-1">
                  {result.recommendations && result.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SHAP Explanation */}
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  SHAP Explainability
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-normal mb-1">
                  Shows how heavily each physiological feature pushed the model prediction score away from the dataset's base value.
                </p>
                <div className="grid gap-2">
                  {result.explanation && result.explanation.length > 0 ? (
                    result.explanation.map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white dark:bg-slate-950 px-3.5 py-2.5 border border-slate-100 dark:border-slate-850 text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{item.feature}</span>
                        <span className={`font-bold ${item.impact >= 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {item.impact >= 0 ? `+${item.impact}` : item.impact} Impact
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">No SHAP attribution values generated by the model.</p>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* 4. Print-Only Hospital-Style Clinical PDF Report */}
      {result && submittedInputs && (
        <ReportTemplate 
          records={[{
            id: result.id,
            patientName: patientDetails.name,
            patientId: patientDetails.id,
            createdAt: new Date().toISOString(),
            input: submittedInputs,
            probability: result.probability,
            riskLevel: result.risk_level,
            confidence: result.confidence,
            explanation: result.explanation,
            recommendations: result.recommendations,
          } as ReportRecord]} 
          user={user} 
        />
      )}

    </div>
  );
}
