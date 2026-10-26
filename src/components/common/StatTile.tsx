import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatTileProps {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: LucideIcon;
  footnote?: React.ReactNode;
  className?: string;
}

const StatTile: React.FC<StatTileProps> = ({ label, value, icon: Icon, footnote, className }) => (
  <div className={cn('rounded-xl border border-border bg-card p-4 shadow-soft transition-colors hover:border-input sm:p-5', className)}>
    <div className="mb-3 flex min-w-0 items-center gap-1.5 text-muted-foreground">
      {Icon && <Icon size={14} className="shrink-0" />}
      <span className="truncate text-xs font-medium tracking-[0.01em]">{label}</span>
    </div>
    <div className="text-[26px] font-bold leading-[1.05] tracking-[-0.025em] text-foreground">{value}</div>
    {footnote && <div className="mt-2 text-xs text-muted-foreground">{footnote}</div>}
  </div>
);

export default StatTile;
