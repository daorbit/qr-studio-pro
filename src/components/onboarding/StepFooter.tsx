import React from 'react';
import { Button } from 'antd';

interface StepFooterProps {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  secondary?: React.ReactNode;
}

const StepFooter: React.FC<StepFooterProps> = ({ onBack, onNext, nextLabel = 'Continue', loading, disabled, secondary }) => (
  <div className="mt-9 flex items-center justify-between gap-3">
    {onBack ? (
      <Button type="text" onClick={onBack} className="max-sm:!hidden">
        Back
      </Button>
    ) : (
      <span />
    )}
    <div className="flex flex-1 sm:flex-none items-center justify-end gap-3">
      {secondary}
      <Button type="primary" onClick={onNext} loading={loading} disabled={disabled} className="flex-1 sm:flex-none sm:min-w-[140px]">
        {nextLabel}
      </Button>
    </div>
  </div>
);

export default StepFooter;
