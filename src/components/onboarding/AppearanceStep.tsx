import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { themes, ThemeMode, ThemeName } from '@/context/themeTypes';
import { cn } from '@/lib/utils';

const MODES: { value: ThemeMode; label: string; preview: string }[] = [
  { value: 'light', label: 'Light', preview: 'bg-[#f5f5f7]' },
  { value: 'dark', label: 'Dark', preview: 'bg-[#0b0c0e]' },
  { value: 'system', label: 'System', preview: 'bg-gradient-to-r from-[#f5f5f7] from-50% to-[#0b0c0e] to-50%' },
];

const SWATCHES: Partial<Record<ThemeName, string>> = {
  orange: 'bg-orange-500',
  rose: 'bg-rose-600',
  violet: 'bg-violet-500',
  blue: 'bg-blue-500',
  teal: 'bg-teal-500',
  emerald: 'bg-emerald-500',
  green: 'bg-green-600',
  slate: 'bg-slate-700',
};

const ACCENTS = (Object.keys(SWATCHES) as ThemeName[]).filter((name) => name in themes);

const AppearanceStep: React.FC = () => {
  const { mode, setMode, currentTheme, setTheme } = useTheme();

  return (
    <div className="space-y-7">
      <div>
        <div className="mb-2.5 text-[13px] font-semibold text-muted-foreground">Appearance</div>
        <div className="grid grid-cols-3 gap-2.5">
          {MODES.map(({ value, label, preview }) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              aria-pressed={mode === value}
              className={cn(
                'rounded-2xl border p-2 text-left transition-colors',
                mode === value ? 'border-primary bg-primary/[0.06]' : 'border-border bg-card hover:border-input'
              )}
            >
              <div className={cn('relative h-20 overflow-hidden rounded-xl ring-1 ring-inset ring-black/5', preview)}>
                <span className="absolute left-2.5 top-2.5 h-1.5 w-10 rounded-full bg-primary" />
                <span className="absolute left-2.5 top-6 h-1.5 w-16 rounded-full bg-[#86868b]/50" />
                <span className="absolute left-2.5 top-9 h-1.5 w-12 rounded-full bg-[#86868b]/30" />
                <span className="absolute bottom-2.5 right-2.5 h-6 w-6 rounded-md bg-primary/80" />
              </div>
              <div className="mt-2 flex items-center justify-between px-1">
                <span className="text-sm font-medium text-foreground">{label}</span>
                {mode === value && <Check size={14} className="text-primary" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2.5 text-[13px] font-semibold text-muted-foreground">Accent color</div>
        <div className="flex flex-wrap gap-3">
          {ACCENTS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setTheme(name)}
              aria-label={themes[name].label}
              aria-pressed={currentTheme === name}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full ring-offset-[3px] ring-offset-background transition-shadow',
                SWATCHES[name],
                currentTheme === name ? 'ring-2 ring-foreground' : 'hover:ring-2 hover:ring-border'
              )}
            >
              {currentTheme === name && <Check size={16} className="text-white" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppearanceStep;
