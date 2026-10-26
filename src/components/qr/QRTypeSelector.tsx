import React, { useMemo, useState } from 'react';
import { TextInput } from '@mantine/core';
import { Check, Search } from 'lucide-react';
import type { QRType } from '@/types/qrcode';
import { cn } from '@/lib/utils';
import FilterPills from '@/components/create/FilterPills';
import EmptyBlock from '@/components/common/EmptyBlock';
import { QR_TYPE_CATEGORIES, QR_TYPE_OPTIONS } from './qrTypeOptions';

interface QRTypeSelectorProps {
  selectedType: QRType;
  onSelect: (type: QRType) => void;
}

const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({ selectedType, onSelect }) => {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return QR_TYPE_OPTIONS.filter(
      (option) =>
        (category === 'all' || option.category === category) &&
        (!q || option.label.toLowerCase().includes(q) || option.description.toLowerCase().includes(q))
    );
  }, [category, query]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterPills options={QR_TYPE_CATEGORIES} value={category} onChange={setCategory} />
        <TextInput
          placeholder="Search types"
          leftSection={<Search size={15} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          radius="xl"
          className="sm:w-56"
          aria-label="Search QR types"
        />
      </div>

      {options.length === 0 ? (
        <EmptyBlock icon={Search} title="No matching types" description="Try a different word or category." />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {options.map(({ value, label, description, icon: Icon, tint }) => {
            const selected = selectedType === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                data-selected={selected}
                onClick={() => onSelect(value)}
                className="create-tile relative flex items-center gap-3 rounded-2xl p-3 text-left"
              >
                <span className={cn('create-app-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br text-white', tint)}>
                  <Icon size={19} strokeWidth={2.1} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13.5px] font-semibold text-foreground">{label}</span>
                  <span className="block truncate text-xs text-muted-foreground">{description}</span>
                </span>
                {selected && (
                  <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QRTypeSelector;
