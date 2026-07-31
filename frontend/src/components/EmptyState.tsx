import { BarChart3 } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'No data available yet',
  message = 'Data will appear here once records are created.',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 mb-4">
        {icon || <BarChart3 className="h-8 w-8 text-slate-300 dark:text-slate-600" />}
      </div>
      <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">{title}</h4>
      <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">{message}</p>
    </div>
  );
}
