import React from 'react';
import { cn } from '@/lib/utils';

interface FieldGroupProps {
  label: React.ReactNode;
  value?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ label, value, description, children, className }) => (
  <div className={cn('space-y-3', className)}>
    <div className="flex items-baseline justify-between gap-3">
      <div className="text-[13px] font-semibold text-foreground">{label}</div>
      {value !== undefined && <div className="text-xs tabular-nums text-muted-foreground">{value}</div>}
    </div>
    {children}
    {description && <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>}
  </div>
);

export default FieldGroup;
