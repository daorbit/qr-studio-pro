import React from 'react';
import { cn } from '@/lib/utils';

interface FilterPillsProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const FilterPills: React.FC<FilterPillsProps> = ({ options, value, onChange, className }) => (
  <div className={cn('-mx-1 overflow-x-auto px-1 scrollbar-hide', className)}>
    <div role="tablist" className="inline-flex w-max gap-1 rounded-full bg-foreground/[0.05] p-1">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            data-active={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'create-segment whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all',
              !active && 'text-muted-foreground hover:text-foreground'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  </div>
);

export default FilterPills;
