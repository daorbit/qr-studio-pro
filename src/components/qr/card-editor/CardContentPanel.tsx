import React from 'react';
import { Button, Menu, Select } from '@mantine/core';
import { Plus, Shapes } from 'lucide-react';
import type { CustomField, QRTemplate } from '@/types/qrcode';
import FieldGroup from '@/components/create/FieldGroup';
import EmptyBlock from '@/components/common/EmptyBlock';
import SliderField from '../preview/SliderField';
import EmojiTextInput from './EmojiTextInput';
import CustomFieldEditor from './CustomFieldEditor';
import { FIELD_DEFAULTS, FIELD_TYPES, FONT_WEIGHTS } from './cardEditorOptions';

type FontWeight = NonNullable<QRTemplate['titleFontWeight']>;

interface CardContentPanelProps {
  template: QRTemplate;
  onTemplateChange: (template: QRTemplate) => void;
}

const newFieldId = () => `field_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

const CardContentPanel: React.FC<CardContentPanelProps> = ({ template, onTemplateChange }) => {
  const fields = template.customFields || [];
  const setFields = (customFields: CustomField[]) => onTemplateChange({ ...template, customFields });

  const addField = (type: CustomField['type']) =>
    setFields([
      ...fields,
      {
        id: newFieldId(),
        type,
        value: FIELD_DEFAULTS[type],
        style: {
          fontSize: type === 'label' ? 11 : type === 'title' ? 20 : 14,
          fontWeight: type === 'label' || type === 'title' ? 'bold' : 'normal',
          color: template.textColor,
          letterSpacing: type === 'label' ? 2 : 0,
        },
      },
    ]);

  const moveField = (index: number, direction: 'up' | 'down') => {
    const swap = direction === 'up' ? index - 1 : index + 1;
    if (swap < 0 || swap >= fields.length) return;
    const next = [...fields];
    [next[index], next[swap]] = [next[swap], next[index]];
    setFields(next);
  };

  return (
    <div className="space-y-7">
      <FieldGroup label="Title">
        <EmojiTextInput value={template.title} placeholder="Enter title" onChange={(title) => onTemplateChange({ ...template, title })} />
        <div className="grid grid-cols-2 items-end gap-3">
          <SliderField label="Size" min={14} max={48} value={template.titleFontSize || 24} onChange={(titleFontSize) => onTemplateChange({ ...template, titleFontSize })} />
          <Select
            size="xs"
            label="Weight"
            data={FONT_WEIGHTS}
            value={template.titleFontWeight || 'bold'}
            onChange={(v) => onTemplateChange({ ...template, titleFontWeight: (v ?? 'bold') as FontWeight })}
            allowDeselect={false}
          />
        </div>
      </FieldGroup>

      <FieldGroup label="Subtitle">
        <EmojiTextInput value={template.subtitle} placeholder="Enter subtitle" onChange={(subtitle) => onTemplateChange({ ...template, subtitle })} />
        <div className="grid grid-cols-2 items-end gap-3">
          <SliderField label="Size" min={10} max={28} value={template.subtitleFontSize || 14} onChange={(subtitleFontSize) => onTemplateChange({ ...template, subtitleFontSize })} />
          <Select
            size="xs"
            label="Weight"
            data={FONT_WEIGHTS}
            value={template.subtitleFontWeight || 'normal'}
            onChange={(v) => onTemplateChange({ ...template, subtitleFontWeight: (v ?? 'normal') as FontWeight })}
            allowDeselect={false}
          />
        </div>
      </FieldGroup>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-semibold text-foreground">Extra elements</div>
          <Menu position="bottom-end">
            <Menu.Target>
              <Button size="xs" variant="default" leftSection={<Plus size={13} />}>
                Add
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {FIELD_TYPES.map(({ value, label, icon: Icon }) => (
                <Menu.Item key={value} leftSection={<Icon size={14} />} onClick={() => addField(value)}>
                  {label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </div>

        {fields.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border">
            <EmptyBlock icon={Shapes} title="No extra elements" description="Add labels, dates, times or dividers to the card." />
          </div>
        ) : (
          fields.map((field, index) => (
            <CustomFieldEditor
              key={field.id}
              field={field}
              fallbackColor={template.textColor}
              isFirst={index === 0}
              isLast={index === fields.length - 1}
              onChange={(updates) => setFields(fields.map((f) => (f.id === field.id ? { ...f, ...updates } : f)))}
              onMove={(direction) => moveField(index, direction)}
              onRemove={() => setFields(fields.filter((f) => f.id !== field.id))}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CardContentPanel;
