import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Trash2, 
  Eye, 
  Download, 
  User, 
  X, 
  AlertCircle, 
  SlidersHorizontal
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';
import { TableRowSkeleton } from '../components/Skeleton';
import { RiskGauge } from '../components/RiskGauge';
import { ReportTemplate } from '../components/ReportTemplate';

interface PredictionRecord {
  id?: string;
  _id?: string;
  patientName: string;
  patientId: string;
  input: {
    age: number;
    sex: number;
    cp: number;
    trestbps: number;
    chol: number;
    fbs: number;
    restecg: number;
    thalach: number;
    exang: number;
    oldpeak: number;
    slope: number;
    ca: number;
    thal: number;
  };
  prediction: number;
  probability: number;
  riskLevel: string;
  confidence: number;
  explanation: Array<{ feature: string; impact: number }>;
  recommendations: string[];
  createdBy: string;
  createdAt: string;
}

export function HistoryPage() {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  
  const [records, setRecords] = useState<PredictionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  
  // Selected Modal State
  const [selectedRecord, setSelectedRecord] = useState<PredictionRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  // Export Modal State
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedForPrint, setSelectedForPrint] = useState<Set<string>>(new Set());
  const [printRecords, setPrintRecords] = useState<PredictionRecord[]>([]);

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

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
        setRecords(mappedRecords);
      }
    } catch (err: any) {
      console.error(err);
      showNotification("Failed to fetch historical database logs", "error");
    } finally {
      setLoading(false);
    }
  }, [user, showNotification]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Filtered & Sorted records
  const processedRecords = useMemo(() => {
    let list = [...records];

    // Search
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      list = list.filter(r => 
        r.patientName.toLowerCase().includes(q) || 
        r.patientId.toLowerCase().includes(q)
      );
    }

    // Risk Filter
    if (riskFilter !== 'all') {
      list = list.filter(r => r.riskLevel.toLowerCase() === riskFilter.toLowerCase());
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'date_desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'date_asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'name') {
        return a.patientName.localeCompare(b.patientName);
      }
      if (sortBy === 'probability_desc') {
        return b.probability - a.probability;
      }
      return 0;
    });

    return list;
  }, [records, search, riskFilter, sortBy]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('predictions').delete().eq('id', id);
      if (error) throw error;
      
      showNotification("Record deleted successfully", "success");
      setRecords(prev => prev.filter(r => (r.id || r._id) !== id));
      setDeleteConfirmId(null);
    } catch (err: any) {
      const errText = err.message || 'Failed to delete record';
      showNotification(errText, "error");
    }
  };

  const handlePrintReports = () => {
    if (processedRecords.length === 0) {
      showNotification("No records available to export", "warning");
      return;
    }

    if (processedRecords.length === 1) {
      setPrintRecords(processedRecords);
      setTimeout(() => {
        window.print();
      }, 300);
      return;
    }

    // More than 1 record, ask which ones to print
    setSelectedForPrint(new Set(processedRecords.map(r => r.id || r._id!)));
    setShowExportModal(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm no-print">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">DATABASE LOGS</p>
          <h2 className="text-xl font-extrabold tracking-tight dark:text-white mt-1">Practitioner Audit Directory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review, filter, and export patient cardiovascular history</p>
        </div>
        <button 
          onClick={handlePrintReports}
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm font-semibold shadow transition cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Generate AI Report
        </button>
      </div>

      {/* Filter panel */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-wrap items-center gap-4 shadow-sm no-print">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-9 pr-4 py-2.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
            placeholder="Search patient name or ID..."
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-350 cursor-pointer outline-none"
            >
              <option value="all">All Risks</option>
              <option value="low">Low Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-350 cursor-pointer outline-none"
          >
            <option value="date_desc">Newest Run</option>
            <option value="date_asc">Oldest Run</option>
            <option value="name">Patient Name</option>
            <option value="probability_desc">Highest Severity</option>
          </select>

        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm no-print">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-955/20 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Assessment Date</th>
                <th className="px-6 py-4">Patient Profile</th>
                <th className="px-6 py-4">Age & Sex</th>
                <th className="px-6 py-4">Severity Triage</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-medium">
              {loading ? (
                Array.from({ length: 4 }).map((_, idx) => <TableRowSkeleton key={idx} />)
              ) : processedRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-xs text-slate-400">
                    No matching clinical files found in the active scope.
                  </td>
                </tr>
              ) : (
                processedRecords.map((record) => {
                  const recordId = record.id || record._id || '';
                  return (
                    <tr key={recordId} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-all">
                      <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900 dark:text-white">{record.patientName}</p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">{record.patientId}</p>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-350">
                        {record.input.age} yrs • {record.input.sex === 1 ? 'Male' : 'Female'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          record.riskLevel.toLowerCase() === 'high' 
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400' 
                            : record.riskLevel.toLowerCase() === 'moderate'
                            ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                        }`}>
                          {record.riskLevel} ({Math.round(record.probability * 100)}%)
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => setSelectedRecord(record)}
                          className="rounded-xl border border-slate-200 dark:border-slate-800 p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(recordId)}
                          className="rounded-xl border border-slate-250 dark:border-slate-800 p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Detail Modal Overlay */}
      <AnimatePresence>
        {selectedRecord && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto no-scrollbar relative text-left"
            >
              <button
                onClick={() => setSelectedRecord(null)}
                className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-105 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-850 pb-4 mb-6">
                <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/40 p-2 text-blue-600 dark:text-blue-400">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight dark:text-white">{selectedRecord.patientName}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{selectedRecord.patientId} • Triage Record File</p>
                </div>
              </div>

              {/* Grid content */}
              <div className="space-y-6">
                
                {/* Risk dial row */}
                <div className="grid gap-6 sm:grid-cols-2 items-center bg-slate-50 dark:bg-slate-950/20 rounded-[24px] border border-slate-100 dark:border-slate-800 p-4">
                  <RiskGauge probability={selectedRecord.probability} riskLevel={selectedRecord.riskLevel} />
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">ASSESSMENT DATE</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                        {new Date(selectedRecord.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">MODEL CONFIDENCE</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                        {(selectedRecord.confidence * 100).toFixed(1)}% classification certainty
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Triaged By</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                        {user?.role === 'doctor' ? 'Dr. ' : ''}{selectedRecord.createdBy === 'guest' ? 'Anonymous Guest' : user?.name || 'Practitioner'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">Clinical Prescriptions</span>
                  <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed list-disc pl-5">
                    {selectedRecord.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>

                {/* SHAP Explanation */}
                <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-5 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">SHAP Attributions</span>
                  <div className="grid gap-2">
                    {selectedRecord.explanation.map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white dark:bg-slate-950 px-3.5 py-2.5 border border-slate-100 dark:border-slate-850 text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{item.feature}</span>
                        <span className={`font-bold ${item.impact >= 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {item.impact >= 0 ? `+${item.impact}` : item.impact} Impact
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Popup */}
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
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
              <h3 className="font-extrabold text-slate-900 dark:text-white text-md">Delete Triage Record?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                This action is irreversible and will delete the patient logs from both history indexes and analytics timelines.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white py-2.5 text-xs font-semibold shadow transition cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Selection Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 no-print"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto relative text-left"
            >
               <h3 className="text-xl font-extrabold tracking-tight dark:text-white mb-4">Select Reports to Export</h3>
               <p className="text-sm text-slate-500 mb-6">You have multiple records in your current view. Please select which patient reports you want to include in the generated PDF.</p>
               
               <div className="space-y-3 mb-8 max-h-[45vh] overflow-y-auto pr-2">
                 {processedRecords.map(r => {
                   const id = r.id || r._id!;
                   const isSelected = selectedForPrint.has(id);
                   return (
                     <label key={id} className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 accent-blue-600 rounded cursor-pointer" 
                          checked={isSelected}
                          onChange={(e) => {
                            const newSet = new Set(selectedForPrint);
                            if (e.target.checked) newSet.add(id);
                            else newSet.delete(id);
                            setSelectedForPrint(newSet);
                          }}
                        />
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{r.patientName} - <span className="font-medium text-slate-500">{r.patientId}</span></p>
                          <p className="text-xs font-semibold text-slate-500 mt-0.5">{new Date(r.createdAt).toLocaleString()} • {r.riskLevel} Risk</p>
                        </div>
                     </label>
                   )
                 })}
               </div>

               <div className="flex gap-3">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const records = processedRecords.filter(r => selectedForPrint.has(r.id || r._id!));
                      if (records.length === 0) {
                        showNotification("Please select at least one report to export.", "warning");
                        return;
                      }
                      setPrintRecords(records);
                      setShowExportModal(false);
                      setTimeout(() => window.print(), 300);
                    }}
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm font-semibold shadow transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Generate PDF
                  </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReportTemplate records={printRecords as any[]} user={user} />

    </div>
  );
}
