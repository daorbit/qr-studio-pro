import React from 'react';
import { cn } from '@/lib/utils';

export interface TileOption<V extends string> {
  value: V;
  label: string;
  preview?: React.ReactNode;
  hint?: string;
}

interface OptionTilesProps<V extends string> {
  options: TileOption<V>[];
  value: V | undefined;
  onChange: (value: V) => void;
  columns?: string;
}

function OptionTiles<V extends string>({ options, value, onChange, columns = 'grid-cols-3 sm:grid-cols-4' }: OptionTilesProps<V>) {
  return (
    <div className={cn('grid gap-2', columns)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            data-selected={selected}
            onClick={() => onChange(option.value)}
            className="create-tile flex flex-col items-center justify-center gap-1.5 rounded-2xl px-2 py-3 text-center"
          >
            {option.preview}
            <span className={cn('text-xs font-medium leading-tight', selected ? 'text-foreground' : 'text-muted-foreground')}>
              {option.label}
            </span>
            {option.hint && <span className="text-[11px] text-muted-foreground">{option.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default OptionTiles;
