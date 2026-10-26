import React from 'react';
import { SegmentedControl, Slider, Switch } from '@mantine/core';
import { QRStyling } from '../../types/qrcode';
import FieldGroup from '@/components/create/FieldGroup';
import { ERROR_LEVELS } from './style/styleOptions';

interface SettingsTabProps {
  styling: QRStyling;
  onStyleChange: (styling: QRStyling) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ styling, onStyleChange }) => (
  <div className="space-y-8">
    <FieldGroup label="Size" value={`${styling.size}px`} description="Larger codes are easier to scan from a distance.">
      <Slider
        min={100}
        max={400}
        step={10}
        value={styling.size}
        onChange={(size) => onStyleChange({ ...styling, size })}
        label={(value) => `${value}px`}
      />
    </FieldGroup>

    <FieldGroup label="Error correction" description="How much of the code can be covered or damaged and still scan. Higher values make the code denser.">
      <SegmentedControl
        fullWidth
        data={ERROR_LEVELS}
        value={styling.level}
        onChange={(level) => onStyleChange({ ...styling, level: level as QRStyling['level'] })}
      />
    </FieldGroup>

    <div className="flex items-center justify-between gap-4 rounded-2xl bg-foreground/[0.04] p-4">
      <div>
        <div className="text-[13px] font-semibold text-foreground">Quiet zone</div>
        <div className="text-xs text-muted-foreground">Add space around the code so scanners lock on faster.</div>
      </div>
      <Switch
        checked={styling.includeMargin}
        onChange={(e) => onStyleChange({ ...styling, includeMargin: e.currentTarget.checked })}
        aria-label="Quiet zone"
      />
    </div>
  </div>
);

export default SettingsTab;
