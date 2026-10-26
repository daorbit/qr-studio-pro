import React from 'react';
import { SegmentedControl, Slider } from '@mantine/core';
import ColorField from '@/components/create/ColorField';
import FieldGroup from '@/components/create/FieldGroup';
import type { Gradient } from './styleOptions';

type Mode = 'solid' | Gradient['type'];

interface GradientColorControlProps {
  label: string;
  color: string;
  gradient?: Gradient;
  onChange: (color: string, gradient: Gradient | undefined) => void;
}

const MODES = [
  { value: 'solid', label: 'Solid' },
  { value: 'linear', label: 'Linear' },
  { value: 'radial', label: 'Radial' },
];

const withStops = (gradient: Gradient, first: string, second: string): Gradient => ({
  ...gradient,
  colorStops: [
    { offset: 0, color: first },
    { offset: 1, color: second },
  ],
});

const GradientColorControl: React.FC<GradientColorControlProps> = ({ label, color, gradient, onChange }) => {
  const mode: Mode = gradient?.type ?? 'solid';
  const secondColor = gradient?.colorStops[1]?.color ?? color;
  const rotation = gradient?.rotation ?? 45;

  const setMode = (next: string) => {
    if (next === 'solid') {
      onChange(color, undefined);
      return;
    }
    const type = next as Gradient['type'];
    onChange(color, withStops({ type, rotation: type === 'linear' ? rotation : 0, colorStops: [] }, color, secondColor));
  };

  return (
    <FieldGroup label={label}>
      <SegmentedControl fullWidth size="sm" data={MODES} value={mode} onChange={setMode} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ColorField
          label={gradient ? 'Start color' : 'Color'}
          value={color}
          onChange={(next) => onChange(next, gradient && withStops(gradient, next, secondColor))}
        />
        {gradient && (
          <ColorField label="End color" value={secondColor} onChange={(next) => onChange(color, withStops(gradient, color, next))} />
        )}
      </div>
      {gradient?.type === 'linear' && (
        <div>
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>Angle</span>
            <span className="tabular-nums">{rotation}°</span>
          </div>
          <Slider
            min={0}
            max={360}
            step={15}
            value={rotation}
            onChange={(value) => onChange(color, { ...gradient, rotation: value })}
            label={(value) => `${value}°`}
          />
        </div>
      )}
    </FieldGroup>
  );
};

export default GradientColorControl;
