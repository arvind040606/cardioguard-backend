import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { StatsResponse } from '../types';
import { useAuth } from '../context/AuthContext';

export function useStats() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const fetchStats = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const { data: predictions, error } = await supabase
        .from('predictions')
        .select('patient_id, risk_level, created_at, input_data');

      if (error) throw error;

      let highRiskCount = 0;
      let moderateRiskCount = 0;
      let lowRiskCount = 0;
      let predictionsToday = 0;
      
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

      const monthlyCounts: Record<string, number> = {};
      const ageGroups = { '20-39': 0, '40-49': 0, '50-59': 0, '60-69': 0, '70+': 0 };
      let maleCount = 0;
      let femaleCount = 0;
      const uniquePatients = new Set<string>();

      predictions?.forEach((p: any) => {
        if (p.patient_id) uniquePatients.add(p.patient_id);
        
        const risk = p.risk_level.toLowerCase();
        if (risk === 'high') highRiskCount++;
        else if (risk === 'moderate') moderateRiskCount++;
        else lowRiskCount++;

        const pDate = new Date(p.created_at);
        if (pDate.getTime() >= startOfDay) {
          predictionsToday++;
        }

        const month = pDate.toLocaleString('default', { month: 'short' });
        monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

        const age = p.input_data?.age || 0;
        if (age < 40) ageGroups['20-39']++;
        else if (age < 50) ageGroups['40-49']++;
        else if (age < 60) ageGroups['50-59']++;
        else if (age < 70) ageGroups['60-69']++;
        else ageGroups['70+']++;

        const sex = p.input_data?.sex;
        if (sex === 1) maleCount++;
        else femaleCount++;
      });

      const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthlyPredictions = monthsOrder
        .filter(m => monthlyCounts[m] !== undefined || m === monthsOrder[now.getMonth()])
        .map(month => ({ month, predictions: monthlyCounts[month] || 0 }));

      if (monthlyPredictions.length === 0) {
        monthlyPredictions.push({ month: monthsOrder[now.getMonth()], predictions: 0 });
      }

      setData({
        summary: {
          totalPredictions: predictions?.length || 0,
          highRiskCount,
          moderateRiskCount,
          lowRiskCount,
          predictionsToday,
          activeDoctors: uniquePatients.size,
        },
        charts: {
          monthlyPredictions,
          ageDistribution: Object.entries(ageGroups).map(([group, count]) => ({ group, count })),
          genderDistribution: [
            { gender: 'Male', count: maleCount },
            { gender: 'Female', count: femaleCount },
          ],
          riskDistribution: [
            { risk: 'High', count: highRiskCount },
            { risk: 'Moderate', count: moderateRiskCount },
            { risk: 'Low', count: lowRiskCount },
          ],
        },
        hasData: (predictions?.length || 0) > 0,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { data, loading, error, refetch: fetchStats };
}
