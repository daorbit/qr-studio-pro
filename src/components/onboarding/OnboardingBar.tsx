import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StepMeta } from './onboardingSteps';

interface OnboardingBarProps {
  steps: StepMeta[];
  current: number;
  onBack?: () => void;
  onSkip?: () => void;
}

const OnboardingBar: React.FC<OnboardingBarProps> = ({ steps, current, onBack, onSkip }) => (
  <header className="relative shrink-0 border-b border-border">
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-7 py-3.5">
      <div className="flex items-center gap-2 min-w-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="sm:hidden -ml-1 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        <img src="/logo.png" alt="" className="hidden sm:block w-7 h-7 object-contain" />
        <span className="hidden sm:block text-[15px] font-semibold tracking-[-0.02em] text-foreground">QR Studio</span>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
          {current + 1} of {steps.length}
        </span>
        <span className="hidden sm:block text-[13px] font-semibold text-foreground">{steps[current].label}</span>
        <div className="flex sm:hidden gap-1">
          {steps.map((step, i) => (
            <span key={step.slug} className={cn('h-1 w-5 rounded-full', i <= current ? 'bg-primary' : 'bg-border')} />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        {onSkip && (
          <button type="button" onClick={onSkip} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Skip for now
          </button>
        )}
      </div>
    </div>

    <div className="absolute -bottom-px inset-x-0 hidden sm:flex">
      {steps.map((step, i) => (
        <span key={step.slug} className={cn('h-px flex-1 transition-colors duration-500', i <= current ? 'bg-primary' : 'bg-transparent')} />
      ))}
    </div>
  </header>
);

export default OnboardingBar;
