import React from 'react';
import { cn } from '@/lib/utils';

interface SettingRowProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}

const SettingRow: React.FC<SettingRowProps> = ({ title, description, disabled, children }) => (
  <div className={cn('flex items-center justify-between gap-4 rounded-lg bg-foreground/[0.03] px-4 py-3', disabled && 'opacity-60')}>
    <div className="min-w-0">
      <div className="text-[13px] font-semibold text-foreground">{title}</div>
      {description && <div className="mt-0.5 text-xs text-muted-foreground">{description}</div>}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

export default SettingRow;
