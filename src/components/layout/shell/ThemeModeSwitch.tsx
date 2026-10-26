import React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeMode } from '@/context/themeTypes';
import { cn } from '@/lib/utils';

const MODES: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'Auto', icon: Monitor },
];

const ThemeModeSwitch: React.FC = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-0.5 rounded-lg border border-border bg-muted p-0.5">
      {MODES.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setMode(value)}
          aria-pressed={mode === value}
          className={cn(
            'flex h-7 items-center justify-center gap-1.5 rounded-md text-xs font-medium transition-colors',
            mode === value ? 'bg-card text-foreground shadow-soft ring-1 ring-border' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Icon size={13} />
          {label}
        </button>
      ))}
    </div>
  );
};

export default ThemeModeSwitch;
