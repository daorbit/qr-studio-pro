import React from 'react';
import { cn } from '@/lib/utils';

interface StepperProps {
  steps: string[];
  current: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, current }) => (
  <div className="mb-8">
    <div className="flex gap-1.5">
      {steps.map((step, index) => (
        <span
          key={step}
          className={cn('h-1 flex-1 rounded-full transition-colors duration-300', index <= current ? 'bg-primary' : 'bg-border')}
        />
      ))}
    </div>
    <div className="mt-2.5 text-xs font-medium text-muted-foreground">
      Step {current + 1} of {steps.length} · {steps[current]}
    </div>
  </div>
);

export default Stepper;
