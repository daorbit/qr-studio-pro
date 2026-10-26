import React from 'react';
import { Switch } from '@mantine/core';
import ColorField from '@/components/create/ColorField';
import FieldGroup from '@/components/create/FieldGroup';
import OptionTiles from '@/components/create/OptionTiles';
import QRPatternPreview from '../QRPatternPreview';
import type { Gradient } from './styleOptions';

interface CornerOptions<T extends string> {
  color: string;
  type: T;
  gradient?: Gradient;
}

interface CornerControlProps<T extends string> {
  label: string;
  types: { value: T; label: string }[];
  options: CornerOptions<T>;
  onChange: (options: CornerOptions<T>) => void;
}

function CornerControl<T extends string>({ label, types, options, onChange }: CornerControlProps<T>) {
  const secondColor = options.gradient?.colorStops[1]?.color ?? options.color;

  const setGradient = (enabled: boolean) =>
    onChange({
      ...options,
      gradient: enabled
        ? {
            type: 'linear',
            rotation: 45,
            colorStops: [
              { offset: 0, color: options.color },
              { offset: 1, color: secondColor },
            ],
          }
        : undefined,
    });

  return (
    <FieldGroup label={label}>
      <OptionTiles
        options={types.map((t) => ({
          ...t,
          preview: <QRPatternPreview id={`corner-${label}-${t.value}`} size={32} styling={{ cornersSquareOptions: { color: '#111827', type: t.value as never } }} />,
        }))}
        value={options.type}
        onChange={(type) => onChange({ ...options, type })}
        columns="grid-cols-3 sm:grid-cols-6"
      />
      <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2">
        <ColorField
          label={options.gradient ? 'Start color' : 'Color'}
          value={options.color}
          onChange={(color) =>
            onChange({
              ...options,
              color,
              gradient: options.gradient && {
                ...options.gradient,
                colorStops: [
                  { offset: 0, color },
                  { offset: 1, color: secondColor },
                ],
              },
            })
          }
        />
        {options.gradient ? (
          <ColorField
            label="End color"
            value={secondColor}
            onChange={(color) =>
              onChange({
                ...options,
                gradient: {
                  ...options.gradient!,
                  colorStops: [
                    { offset: 0, color: options.color },
                    { offset: 1, color },
                  ],
                },
              })
            }
          />
        ) : null}
      </div>
      <Switch label="Gradient" checked={Boolean(options.gradient)} onChange={(e) => setGradient(e.currentTarget.checked)} />
    </FieldGroup>
  );
}

export default CornerControl;
