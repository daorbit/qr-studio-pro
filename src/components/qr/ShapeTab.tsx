import React from 'react';
import { SegmentedControl } from '@mantine/core';
import { QRStyling } from '../../types/qrcode';
import FieldGroup from '@/components/create/FieldGroup';
import OptionTiles from '@/components/create/OptionTiles';
import QRPatternPreview from './QRPatternPreview';
import { DOT_TYPES } from './style/styleOptions';

interface ShapeTabProps {
  styling: QRStyling;
  onStyleChange: (styling: QRStyling) => void;
}

const SHAPES = [
  { value: 'square', label: 'Square' },
  { value: 'circle', label: 'Circle' },
];

const ShapeTab: React.FC<ShapeTabProps> = ({ styling, onStyleChange }) => (
  <div className="space-y-8">
    <FieldGroup label="Outline">
      <SegmentedControl
        fullWidth
        data={SHAPES}
        value={styling.shape || 'square'}
        onChange={(shape) => onStyleChange({ ...styling, shape: shape as QRStyling['shape'] })}
      />
    </FieldGroup>

    <FieldGroup label="Dots" description="Corner shapes live under Corners.">
      <OptionTiles
        options={DOT_TYPES.map((t) => ({
          ...t,
          preview: <QRPatternPreview id={`dots-${t.value}`} size={40} styling={{ fgColor: '#111827', dotsType: t.value }} />,
        }))}
        value={styling.dotsType}
        onChange={(dotsType) => onStyleChange({ ...styling, dotsType })}
        columns="grid-cols-3"
      />
    </FieldGroup>
  </div>
);

export default ShapeTab;
