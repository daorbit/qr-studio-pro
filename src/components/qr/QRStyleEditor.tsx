import React, { memo, useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import { QRStyling } from '../../types/qrcode';
import ColorsTab from './ColorsTab';
import SettingsTab from './SettingsTab';
import ShapeTab from './ShapeTab';
import LogoTab from './LogoTab';
import FrameTab from './FrameTab';

interface QRStyleEditorProps {
  styling: QRStyling;
  onStyleChange: (styling: QRStyling) => void;
}

const SECTIONS = [
  { value: 'colors', label: 'Colors', Panel: ColorsTab },
  { value: 'shape', label: 'Shape', Panel: ShapeTab },
  { value: 'logo', label: 'Logo', Panel: LogoTab },
  { value: 'corners', label: 'Corners', Panel: FrameTab },
  { value: 'settings', label: 'Settings', Panel: SettingsTab },
];

const QRStyleEditor: React.FC<QRStyleEditorProps> = memo(({ styling, onStyleChange }) => {
  const [section, setSection] = useState(SECTIONS[0].value);
  const Panel = SECTIONS.find((s) => s.value === section)?.Panel ?? ColorsTab;

  return (
    <div>
      <SegmentedControl
        fullWidth
        data={SECTIONS.map(({ value, label }) => ({ value, label }))}
        value={section}
        onChange={setSection}
        className="mb-7"
      />
      <div key={section} className="create-step-enter">
        <Panel styling={styling} onStyleChange={onStyleChange} />
      </div>
    </div>
  );
});

QRStyleEditor.displayName = 'QRStyleEditor';

export default QRStyleEditor;
