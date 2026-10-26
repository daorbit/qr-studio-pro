import React, { useState, useMemo } from 'react';
import { Pagination } from '@mantine/core';
import { Check, QrCode } from 'lucide-react';
import { QRTemplate, defaultTemplates } from '../../types/qrcode';
import FilterPills from '@/components/create/FilterPills';
import { TEMPLATE_CATEGORIES, getCategoryForTemplate, templateBackground } from './templateCategories';

interface TemplateSelectorProps {
  selectedTemplate: QRTemplate | null;
  onSelect: (template: QRTemplate | null) => void;
}

const PAGE_SIZE = 11;

const SelectedMark: React.FC = () => (
  <span className="absolute right-2.5 top-2.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
    <Check size={12} strokeWidth={3} />
  </span>
);

const TemplateSelector: React.FC<TemplateSelectorProps> = React.memo(({ selectedTemplate, onSelect }) => {
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => defaultTemplates.filter((template) => category === 'all' || getCategoryForTemplate(template) === category),
    [category]
  );
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const showNone = category === 'all' && page === 1;

  return (
    <div>
      <FilterPills
        options={TEMPLATE_CATEGORIES}
        value={category}
        onChange={(value) => {
          setCategory(value);
          setPage(1);
        }}
        className="mb-5"
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {showNone && (
          <button
            type="button"
            data-selected={selectedTemplate === null}
            onClick={() => onSelect(null)}
            className="create-tile relative overflow-hidden rounded-2xl text-left"
          >
            {selectedTemplate === null && <SelectedMark />}
            <div className="flex h-36 flex-col items-center justify-center gap-2 bg-foreground/[0.03]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card shadow-soft">
                <QrCode size={24} className="text-muted-foreground" />
              </span>
            </div>
            <div className="px-3 py-2.5 text-[13px] font-semibold text-foreground">No card</div>
          </button>
        )}

        {visible.map((template) => {
          const selected = selectedTemplate?.id === template.id;
          return (
            <button
              key={template.id}
              type="button"
              data-selected={selected}
              onClick={() => onSelect(template)}
              className="create-tile relative overflow-hidden rounded-2xl text-left"
            >
              {selected && <SelectedMark />}
              <div
                className="flex h-36 flex-col items-center justify-center p-3 text-center"
                style={{ background: templateBackground(template), color: template.textColor, fontFamily: template.fontFamily || 'Inter' }}
              >
                <span className="line-clamp-2 text-[13px] font-bold leading-tight">{template.title}</span>
                <span className="mt-1 line-clamp-2 text-[10px] opacity-70">{template.subtitle}</span>
                <span className="mt-2.5 flex h-8 w-8 items-center justify-center rounded-md bg-white/90 shadow-soft">
                  <QrCode size={18} className="text-zinc-800" />
                </span>
              </div>
              <div className="truncate px-3 py-2.5 text-[13px] font-semibold text-foreground">{template.name}</div>
            </button>
          );
        })}
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination size="sm" total={pageCount} value={page} onChange={setPage} />
        </div>
      )}
    </div>
  );
});

TemplateSelector.displayName = 'TemplateSelector';

export default TemplateSelector;
