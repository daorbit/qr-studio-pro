import React from 'react';
import { PasswordInput, Select, TextInput, Textarea } from '@mantine/core';
import type { ContentField } from './contentFields';

interface ContentFieldInputProps {
  field: ContentField;
  value: string;
  onChange: (value: string) => void;
}

const ContentFieldInput: React.FC<ContentFieldInputProps> = ({ field, value, onChange }) => {
  const common = {
    label: field.label,
    placeholder: field.placeholder,
    withAsterisk: field.required,
  };
  const Icon = field.icon;

  switch (field.kind) {
    case 'textarea':
      return <Textarea {...common} value={value} onChange={(e) => onChange(e.currentTarget.value)} minRows={field.rows ?? 3} autosize />;
    case 'password':
      return <PasswordInput {...common} value={value} onChange={(e) => onChange(e.currentTarget.value)} />;
    case 'select':
      return (
        <Select
          {...common}
          data={field.options ?? []}
          value={value || field.defaultValue || null}
          onChange={(next) => onChange(next ?? '')}
          allowDeselect={false}
        />
      );
    case 'datetime':
    case 'date':
      return (
        <TextInput
          {...common}
          type={field.kind === 'datetime' ? 'datetime-local' : 'date'}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      );
    default:
      return (
        <TextInput
          {...common}
          leftSection={Icon ? <Icon size={15} /> : undefined}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      );
  }
};

export default ContentFieldInput;
