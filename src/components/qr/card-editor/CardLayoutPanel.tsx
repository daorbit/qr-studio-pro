import React from 'react';
import { Switch, TextInput } from '@mantine/core';
import type { QRTemplate } from '@/types/qrcode';
import FieldGroup from '@/components/create/FieldGroup';
import ColorField from '@/components/create/ColorField';
import SliderField from '../preview/SliderField';
import { GRADIENT_PRESETS } from './cardEditorOptions';

interface CardLayoutPanelProps {
  template: QRTemplate;
  onTemplateChange: (template: QRTemplate) => void;
}

const CardLayoutPanel: React.FC<CardLayoutPanelProps> = ({ template, onTemplateChange }) => (
  <div className="space-y-7">
    <FieldGroup label="QR label" description="Short text shown under the code.">
      <TextInput
        size="sm"
        value={template.qrLabel || ''}
        placeholder="e.g. Scan for details"
        onChange={(e) => onTemplateChange({ ...template, qrLabel: e.currentTarget.value })}
      />
    </FieldGroup>

    <FieldGroup label="Background presets">
      <div className="grid grid-cols-5 gap-2">
        <button
          type="button"
          data-selected={!template.showGradient}
          onClick={() => onTemplateChange({ ...template, showGradient: false })}
          className="create-tile flex aspect-square items-center justify-center rounded-xl text-[10px] font-semibold"
          style={{ backgroundColor: template.backgroundColor, color: template.textColor }}
        >
          Solid
        </button>
        {GRADIENT_PRESETS.map((preset) => (
          <button
            key={preset.bg}
            type="button"
            aria-label={`Gradient ${preset.bg} to ${preset.end}`}
            data-selected={Boolean(template.showGradient && template.backgroundColor === preset.bg)}
            onClick={() =>
              onTemplateChange({
                ...template,
                showGradient: true,
                backgroundColor: preset.bg,
                gradientColor: preset.end,
                gradientDirection: 'to-bottom-right',
                textColor: preset.text,
              })
            }
            className="create-tile aspect-square rounded-xl"
            style={{ background: `linear-gradient(135deg, ${preset.bg}, ${preset.end})` }}
          />
        ))}
      </div>
    </FieldGroup>

    <FieldGroup label="Border">
      <Switch
        label="Show border"
        checked={template.showBorder || false}
        onChange={(e) => onTemplateChange({ ...template, showBorder: e.currentTarget.checked })}
      />
      {template.showBorder && (
        <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2">
          <ColorField label="Color" value={template.borderColor || '#e5e7eb'} onChange={(borderColor) => onTemplateChange({ ...template, borderColor })} />
          <SliderField label="Width" min={1} max={5} value={template.borderWidth || 1} onChange={(borderWidth) => onTemplateChange({ ...template, borderWidth })} />
        </div>
      )}
    </FieldGroup>
  </div>
);

export default CardLayoutPanel;
