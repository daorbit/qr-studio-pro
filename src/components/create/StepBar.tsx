import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CREATE_STEPS } from './createSteps';

interface StepBarProps {
  current: number;
  canJump: (index: number) => boolean;
  onJump: (index: number) => void;
}

const StepBar: React.FC<StepBarProps> = ({ current, canJump, onJump }) => (
  <ol className="inline-flex items-center gap-0.5 rounded-full bg-foreground/[0.05] p-1">
    {CREATE_STEPS.map((step, index) => {
      const done = index < current;
      const active = index === current;
      const enabled = canJump(index);
      return (
        <li key={step.key}>
          <button
            type="button"
            disabled={!enabled}
            onClick={() => onJump(index)}
            aria-current={active ? 'step' : undefined}
            data-active={active}
            className={cn(
              'create-segment flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-all',
              !active && enabled && 'text-muted-foreground hover:text-foreground',
              !enabled && 'text-muted-foreground/45'
            )}
          >
            <span
              className={cn(
                'flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] font-semibold tabular-nums transition-colors',
                done && 'bg-primary text-primary-foreground',
                active && 'bg-foreground text-background',
                !done && !active && 'bg-foreground/[0.08]'
              )}
            >
              {done ? <Check size={11} strokeWidth={3} /> : index + 1}
            </span>
            {step.label}
          </button>
        </li>
      );
    })}
  </ol>
);

export default StepBar;
