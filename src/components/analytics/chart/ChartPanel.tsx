import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import EmptyBlock from '@/components/common/EmptyBlock';

interface ChartPanelProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  extra?: React.ReactNode;
  empty?: boolean;
  emptyText?: string;
  className?: string;
  children: React.ReactNode;
}

const ChartPanel: React.FC<ChartPanelProps> = ({ title, description, icon: Icon, extra, empty, emptyText = 'No data yet', className, children }) => (
  <section className={cn('flex flex-col rounded-xl border border-border bg-card shadow-soft', className)}>
    <header className="flex items-start justify-between gap-3 px-5 pt-4">
      <div className="min-w-0">
        <h3 className="flex items-center gap-1.5 text-[14px] font-semibold tracking-[-0.01em] text-foreground">
          {Icon && <Icon size={14} className="text-muted-foreground" />}
          {title}
        </h3>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      {extra && <div className="shrink-0">{extra}</div>}
    </header>
    <div className="flex-1 px-5 pb-5 pt-4">{empty ? <EmptyBlock title={emptyText} /> : children}</div>
  </section>
);

export default ChartPanel;
