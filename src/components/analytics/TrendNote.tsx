import React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendNoteProps {
  current: number;
  previous: number;
  label: string;
}

const TrendNote: React.FC<TrendNoteProps> = ({ current, previous, label }) => {
  if (previous === 0 && current === 0) return <span>No scans in either period</span>;
  if (previous === 0) return <span>New activity {label}</span>;

  const change = Math.round(((current - previous) / previous) * 100);
  const Icon = change > 0 ? ArrowUpRight : change < 0 ? ArrowDownRight : Minus;

  return (
    <span className="inline-flex items-center gap-1">
      <span
        className={cn(
          'inline-flex items-center gap-0.5 font-semibold',
          change > 0 && 'text-[var(--viz-good)]',
          change < 0 && 'text-[var(--viz-bad)]'
        )}
      >
        <Icon size={12} />
        {change > 0 ? '+' : ''}
        {change}%
      </span>
      {label}
    </span>
  );
};

export default TrendNote;
