import React from 'react';
import { ActionIcon, Select, Switch, Tooltip } from '@mantine/core';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import type { CustomField } from '@/types/qrcode';
import ColorField from '@/components/create/ColorField';
import SliderField from '../preview/SliderField';
import EmojiTextInput from './EmojiTextInput';
import { FONT_WEIGHTS } from './cardEditorOptions';

interface CustomFieldEditorProps {
  field: CustomField;
  fallbackColor: string;
  isFirst: boolean;
  isLast: boolean;
  onChange: (updates: Partial<CustomField>) => void;
  onMove: (direction: 'up' | 'down') => void;
  onRemove: () => void;
}

const CustomFieldEditor: React.FC<CustomFieldEditorProps> = ({ field, fallbackColor, isFirst, isLast, onChange, onMove, onRemove }) => {
  const setStyle = (updates: Partial<NonNullable<CustomField['style']>>) => onChange({ style: { ...field.style, ...updates } });

  return (
    <div className="space-y-3 rounded-2xl border border-border bg-card p-3">
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">{field.type}</span>
        <div className="flex items-center">
          <ActionIcon size="sm" onClick={() => onMove('up')} disabled={isFirst} aria-label="Move up">
            <ChevronUp size={14} />
          </ActionIcon>
          <ActionIcon size="sm" onClick={() => onMove('down')} disabled={isLast} aria-label="Move down">
            <ChevronDown size={14} />
          </ActionIcon>
          <Tooltip label="Remove">
            <ActionIcon size="sm" color="red" onClick={onRemove} aria-label="Remove element">
              <Trash2 size={14} />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>

      {field.type !== 'divider' && (
        <>
          <EmojiTextInput value={field.value} placeholder="Enter content..." onChange={(value) => onChange({ value })} />
          <div className="grid grid-cols-2 items-end gap-3">
            <SliderField label="Size" min={8} max={48} value={field.style?.fontSize || 14} onChange={(fontSize) => setStyle({ fontSize })} />
            <Select
              size="xs"
              label="Weight"
              data={FONT_WEIGHTS}
              value={field.style?.fontWeight || 'normal'}
              onChange={(v) => setStyle({ fontWeight: (v ?? 'normal') as NonNullable<CustomField['style']>['fontWeight'] })}
              allowDeselect={false}
            />
          </div>
          <div className="grid grid-cols-2 items-end gap-3">
            <ColorField size="xs" label="Color" value={field.style?.color || fallbackColor} onChange={(color) => setStyle({ color })} />
            <Switch size="sm" label="Italic" checked={field.style?.italic || false} onChange={(e) => setStyle({ italic: e.currentTarget.checked })} className="pb-1.5" />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomFieldEditor;
