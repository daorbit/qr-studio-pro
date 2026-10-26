import React from 'react';
import { Button } from '@mantine/core';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CREATE_STEPS } from './createSteps';

interface StepFooterProps {
  current: number;
  editing: boolean;
  canSave: boolean;
  saving: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSave: () => void;
}

const StepFooter: React.FC<StepFooterProps> = ({ current, editing, canSave, saving, onPrev, onNext, onSave }) => {
  const isLast = current === CREATE_STEPS.length - 1;

  return (
    <div className="sticky bottom-4 z-10 mt-auto hidden pt-6 lg:block">
      <div className="create-glass flex items-center justify-between gap-3 rounded-full p-1.5 pl-2">
        <Button variant="subtle" color="gray" leftSection={<ArrowLeft size={16} />} onClick={onPrev} disabled={current === 0}>
          Back
        </Button>
        <span className="text-xs tabular-nums text-muted-foreground">
          {current + 1} / {CREATE_STEPS.length}
        </span>
        {isLast ? (
          <Button onClick={onSave} disabled={!canSave} loading={saving} miw={132}>
            {editing ? 'Save changes' : 'Save QR code'}
          </Button>
        ) : (
          <Button rightSection={<ArrowRight size={16} />} onClick={onNext} miw={132}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepFooter;
