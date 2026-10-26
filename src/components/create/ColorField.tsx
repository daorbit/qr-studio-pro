import React from 'react';
import { ColorInput } from '@mantine/core';

export const COLOR_SWATCHES = [
  '#000000',
  '#1f2937',
  '#ffffff',
  '#f97316',
  '#ef4444',
  '#ec4899',
  '#8b5cf6',
  '#3b82f6',
  '#06b6d4',
  '#10b981',
  '#eab308',
  '#78350f',
];

interface ColorFieldProps {
  value: string | undefined;
  onChange: (value: string) => void;
  label?: string;
  size?: 'xs' | 'sm' | 'md';
  withinPortal?: boolean;
}

const ColorField: React.FC<ColorFieldProps> = ({ value, onChange, label, size = 'sm', withinPortal = true }) => (
  <ColorInput
    label={label}
    size={size}
    format="hex"
    value={value ?? ''}
    onChange={onChange}
    swatches={COLOR_SWATCHES}
    swatchesPerRow={6}
    popoverProps={{ withinPortal }}
  />
);

export default ColorField;
