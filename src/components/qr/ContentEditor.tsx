import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import { cn } from '@/lib/utils';
import type { QRType } from '@/types/qrcode';
import { CONTENT_FIELDS } from './content/contentFields';
import { buildContent, type ContentValues } from './content/contentBuilders';
import ContentFieldInput from './content/ContentFieldInput';
import ImageUploadField from './content/ImageUploadField';

interface ContentEditorProps {
  type: QRType;
  content: string;
  name: string;
  onNameChange: (name: string) => void;
  onContentChange: (content: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ type, content, name, onNameChange, onContentChange }) => {
  const [values, setValues] = useState<ContentValues>({ content });
  const fields = CONTENT_FIELDS[type] ?? CONTENT_FIELDS.text ?? [];

  const setValue = (field: string, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    onContentChange(buildContent(type, next));
  };

  return (
    <div className="max-w-2xl space-y-6">
      <TextInput
        label="Name"
        description="Only you see this. It helps you find the code later."
        placeholder="Spring menu, Store Wi-Fi, ..."
        withAsterisk
        size="md"
        value={name}
        onChange={(e) => onNameChange(e.currentTarget.value)}
      />

      <div className="h-px bg-border" />

      {type === 'image' ? (
        <ImageUploadField content={content} onContentChange={onContentChange} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className={cn(!field.half && 'sm:col-span-2')}>
              <ContentFieldInput field={field} value={values[field.name] ?? ''} onChange={(value) => setValue(field.name, value)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
