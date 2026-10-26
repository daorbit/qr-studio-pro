import React from 'react';
import { SegmentedControl, Select, Switch } from '@mantine/core';
import type { QRTemplate } from '@/types/qrcode';
import FieldGroup from '@/components/create/FieldGroup';
import ColorField from '@/components/create/ColorField';
import SliderField from '../preview/SliderField';
import { FONT_FAMILIES, GRADIENT_DIRECTIONS, SHADOWS, TEXT_ALIGNS } from './cardEditorOptions';

interface CardStylePanelProps {
  template: QRTemplate;
  onTemplateChange: (template: QRTemplate) => void;
}

const CardStylePanel: React.FC<CardStylePanelProps> = ({ template, onTemplateChange }) => (
  <div className="space-y-7">
    <FieldGroup label="Typography">
      <Select
        size="sm"
        label="Font"
        data={FONT_FAMILIES}
        value={template.fontFamily || 'Inter'}
        onChange={(fontFamily) => onTemplateChange({ ...template, fontFamily: fontFamily ?? 'Inter' })}
        searchable
        allowDeselect={false}
        renderOption={({ option }) => <span style={{ fontFamily: option.value }}>{option.label}</span>}
      />
      <SegmentedControl
        fullWidth
        size="sm"
        data={TEXT_ALIGNS}
        value={template.textAlign || 'center'}
        onChange={(textAlign) => onTemplateChange({ ...template, textAlign: textAlign as QRTemplate['textAlign'] })}
      />
    </FieldGroup>

    <FieldGroup label="Colors">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ColorField label="Background" value={template.backgroundColor} onChange={(backgroundColor) => onTemplateChange({ ...template, backgroundColor })} />
        <ColorField label="Text" value={template.textColor} onChange={(textColor) => onTemplateChange({ ...template, textColor })} />
        <ColorField
          label="Accent"
          value={template.accentColor || template.textColor}
          onChange={(accentColor) => onTemplateChange({ ...template, accentColor })}
        />
      </div>
      <Switch
        label="Gradient background"
        checked={template.showGradient || false}
        onChange={(e) => onTemplateChange({ ...template, showGradient: e.currentTarget.checked })}
      />
      {template.showGradient && (
        <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2">
          <ColorField
            label="End color"
            value={template.gradientColor || '#000000'}
            onChange={(gradientColor) => onTemplateChange({ ...template, gradientColor })}
          />
          <SegmentedControl
            fullWidth
            data={GRADIENT_DIRECTIONS}
            value={template.gradientDirection || 'to-bottom'}
            onChange={(gradientDirection) => onTemplateChange({ ...template, gradientDirection: gradientDirection as QRTemplate['gradientDirection'] })}
          />
        </div>
      )}
    </FieldGroup>

    <FieldGroup label="Card">
      <SliderField label="Corner radius" min={0} max={32} value={template.borderRadius || 16} onChange={(borderRadius) => onTemplateChange({ ...template, borderRadius })} />
      <SliderField label="Padding" min={12} max={48} value={template.padding || 24} onChange={(padding) => onTemplateChange({ ...template, padding })} />
      <div>
        <div className="mb-1.5 text-xs font-medium text-muted-foreground">Shadow</div>
        <SegmentedControl
          fullWidth
          size="sm"
          data={SHADOWS}
          value={template.shadowIntensity || 'none'}
          onChange={(shadowIntensity) => onTemplateChange({ ...template, shadowIntensity: shadowIntensity as QRTemplate['shadowIntensity'] })}
        />
      </div>
    </FieldGroup>
  </div>
);

export default CardStylePanel;
