import React from 'react';
import { Slider } from '@mantine/core';

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

const SliderField: React.FC<SliderFieldProps> = ({ label, value, min, max, step = 1, unit = 'px', onChange }) => (
  <div>
    <div className="mb-1.5 flex justify-between text-xs font-medium text-muted-foreground">
      <span>{label}</span>
      <span className="tabular-nums">
        {value}
        {unit}
      </span>
    </div>
    <Slider size="sm" min={min} max={max} step={step} value={value} onChange={onChange} label={null} />
  </div>
);

export default SliderField;
