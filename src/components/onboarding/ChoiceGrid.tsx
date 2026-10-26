import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChoiceOption } from './onboardingSteps';

interface ChoiceGridProps {
  options: ChoiceOption[];
  selected: string[];
  onToggle: (value: string) => void;
  columns?: 1 | 2;
}

const ChoiceGrid: React.FC<ChoiceGridProps> = ({ options, selected, onToggle, columns = 2 }) => (
  <div className={cn('grid gap-2.5', columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1')}>
    {options.map(({ value, label, hint, icon: Icon, tone }) => {
      const active = selected.includes(value);
      return (
        <button
          key={value}
          type="button"
          onClick={() => onToggle(value)}
          aria-pressed={active}
          className={cn(
            'flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors duration-150',
            active ? 'border-primary bg-primary/[0.06]' : 'border-border bg-card hover:border-input'
          )}
        >
          <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', tone)}>
            <Icon size={18} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[15px] font-medium tracking-[-0.01em] text-foreground">{label}</span>
            {hint && <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span>}
          </span>
          <span
            className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
              active ? 'border-primary bg-primary text-primary-foreground' : 'border-input'
            )}
          >
            {active && <Check size={12} strokeWidth={3} />}
          </span>
        </button>
      );
    })}
  </div>
);

export default ChoiceGrid;
