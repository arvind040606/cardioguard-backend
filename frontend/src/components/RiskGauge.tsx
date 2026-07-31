import React from 'react';
import { motion } from 'framer-motion';

interface RiskGaugeProps {
  probability: number; // 0 to 1
  riskLevel: string;   // 'Low' | 'Moderate' | 'High'
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ probability, riskLevel }) => {
  const percentage = Math.round(probability * 100);
  
  // Color configuration based on risk level
  const getColor = () => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return {
          stroke: '#10b981', // emerald-500
          bg: 'bg-emerald-50 dark:bg-emerald-950/20',
          text: 'text-emerald-600 dark:text-emerald-400',
          glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]'
        };
      case 'moderate':
        return {
          stroke: '#f59e0b', // amber-500
          bg: 'bg-amber-50 dark:bg-amber-950/20',
          text: 'text-amber-600 dark:text-amber-400',
          glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]'
        };
      case 'high':
      default:
        return {
          stroke: '#ef4444', // rose-500
          bg: 'bg-rose-50 dark:bg-rose-950/20',
          text: 'text-rose-600 dark:text-rose-400',
          glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]'
        };
    }
  };

  const colors = getColor();

  // Circle path parameters
  const radius = 80;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  // Arc stroke-dashoffset: circumference represents 100%, offset = circumference * (1 - pct)
  const offset = circumference - (probability * circumference);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative flex items-center justify-center w-52 h-52">
        
        {/* Glow behind the circle */}
        <div className={`absolute inset-4 rounded-full -z-10 blur-xl opacity-20 transition ${colors.bg}`} />
        
        <svg className="w-full h-full transform -rotate-90">
          {/* Base track */}
          <circle
            cx="104"
            cy="104"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-slate-800 transition"
            fill="transparent"
          />
          {/* Animated active path */}
          <motion.circle
            cx="104"
            cy="104"
            r={radius}
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center label */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className={`text-5xl font-extrabold tracking-tight dark:text-white`}
          >
            {percentage}%
          </motion.span>
          <motion.span
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className={`mt-1 text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
          >
            {riskLevel} RISK
          </motion.span>
        </div>
      </div>
      
      <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400 text-center max-w-[200px]">
        Probability computed by CardioGuard's Random Forest classifier.
      </p>
    </div>
  );
};
