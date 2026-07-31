export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'admin' | 'patient';
}

export interface PatientInput {
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
}

export interface PredictionResult {
  id?: string;
  prediction: number;
  probability: number;
  risk_level: string;
  confidence: number;
  explanation: Array<{ feature: string; impact: number }>;
  recommendations?: string[];
}

export interface PredictionRecord {
  id?: string;
  _id?: string;
  patientName: string;
  patientId: string;
  input: PatientInput;
  prediction: number;
  probability: number;
  riskLevel: string;
  confidence: number;
  explanation: Array<{ feature: string; impact: number }>;
  recommendations: string[];
  createdBy: string;
  createdAt: string;
}

export interface StatsSummary {
  totalPredictions: number;
  highRiskCount: number;
  moderateRiskCount: number;
  lowRiskCount: number;
  predictionsToday: number;
  activeDoctors: number;
}

export interface ChartDataPoint {
  month?: string;
  group?: string;
  gender?: string;
  risk?: string;
  count: number;
  predictions?: number;
}

export interface StatsResponse {
  summary: StatsSummary;
  charts: {
    monthlyPredictions: Array<{ month: string; predictions: number }>;
    ageDistribution: Array<{ group: string; count: number }>;
    genderDistribution: Array<{ gender: string; count: number }>;
    riskDistribution: Array<{ risk: string; count: number }>;
  };
  hasData: boolean;
}

export interface ApiError {
  error: string;
}
