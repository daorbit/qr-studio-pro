import React from 'react';
import { SegmentedControl } from '@mantine/core';
import type { Cycle } from './billing/planCatalog';

interface DurationToggleProps {
  selectedDuration: Cycle;
  onDurationChange: (duration: Cycle) => void;
  yearlySaving: number;
}

const DurationToggle: React.FC<DurationToggleProps> = ({ selectedDuration, onDurationChange, yearlySaving }) => (
  <SegmentedControl
    value={String(selectedDuration)}
    onChange={(value) => onDurationChange(Number(value) as Cycle)}
    data={[
      { value: '1', label: 'Monthly' },
      {
        value: '12',
        label: (
          <span className="inline-flex items-center gap-1.5">
            Yearly
            {yearlySaving > 0 && <span className="text-[11px] font-semibold text-[var(--viz-good)]">−{yearlySaving}%</span>}
          </span>
        ),
      },
    ]}
  />
);

export default DurationToggle;
