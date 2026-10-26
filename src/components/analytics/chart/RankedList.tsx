import React from 'react';
import { formatNumber } from './chartTheme';

interface RankedListProps {
  items: { label: React.ReactNode; value: number; key: string }[];
  limit?: number;
  unit?: string;
}

const RankedList: React.FC<RankedListProps> = ({ items, limit = 6, unit }) => {
  const rows = [...items].sort((a, b) => b.value - a.value).slice(0, limit);
  const max = Math.max(...rows.map((r) => r.value), 1);
  const total = items.reduce((sum, r) => sum + r.value, 0);

  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.key}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-[13px]">
            <span className="min-w-0 truncate text-foreground">{row.label}</span>
            <span className="shrink-0 tabular-nums">
              <span className="font-semibold text-foreground">{formatNumber(row.value)}</span>
              {unit && <span className="ml-1 text-muted-foreground">{unit}</span>}
              {total > 0 && <span className="ml-2 text-xs text-muted-foreground">{Math.round((row.value / total) * 100)}%</span>}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-foreground/[0.06]">
            <div className="h-full rounded-full bg-primary" style={{ width: `${(row.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RankedList;
