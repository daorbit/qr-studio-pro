import React, { useState } from 'react';
import { Check } from 'lucide-react';
import type { QRStyling } from '../../types/qrcode';
import FilterPills from '@/components/create/FilterPills';
import QRCodeOnly from './QRCodeOnly';
import { STYLE_PRESETS, STYLE_PRESET_CATEGORIES, applyPreset, matchesPreset } from './style/stylePresets';

interface QRDesignTemplatesProps {
  styling: QRStyling;
  onStyleChange: (styling: QRStyling) => void;
}

const SAMPLE_CONTENT = 'https://qrstudio.app';

const QRDesignTemplates: React.FC<QRDesignTemplatesProps> = ({ styling, onStyleChange }) => {
  const [category, setCategory] = useState('all');
  const visible = category === 'all' ? STYLE_PRESETS : STYLE_PRESETS.filter((p) => p.category === category);

  return (
    <div>
      <FilterPills options={STYLE_PRESET_CATEGORIES} value={category} onChange={setCategory} className="mb-5" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {visible.map((preset) => {
          const selected = matchesPreset(styling, preset.styling);
          return (
            <button
              key={preset.id}
              type="button"
              aria-pressed={selected}
              data-selected={selected}
              onClick={() => onStyleChange(applyPreset(styling, preset.styling))}
              className="create-tile relative flex flex-col items-center gap-3 rounded-2xl p-3"
            >
              <span className="flex aspect-square w-full items-center justify-center rounded-xl bg-white p-3 ring-1 ring-black/5">
                <span style={{ backgroundColor: preset.styling.bgColor }} className="rounded-lg p-1.5">
                  <QRCodeOnly content={SAMPLE_CONTENT} template={null} styling={preset.styling} size={104} />
                </span>
              </span>
              <span className="w-full text-left">
                <span className="block truncate text-[13px] font-semibold text-foreground">{preset.name}</span>
                <span className="block text-[11px] capitalize text-muted-foreground">{preset.category}</span>
              </span>
              {selected && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QRDesignTemplates;
