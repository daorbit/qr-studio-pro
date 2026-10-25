import React from 'react';
import { Button } from 'antd';
import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { themes, ThemeMode, ThemeName } from '@/context/themeTypes';
import { cn } from '@/lib/utils';
import AuthHeader from '@/components/auth/AuthHeader';

const MODES: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

const SWATCHES: Record<string, string> = {
  orange: 'bg-orange-500',
  blue: 'bg-blue-500',
  green: 'bg-green-600',
  rose: 'bg-rose-600',
  violet: 'bg-violet-500',
  teal: 'bg-teal-500',
  slate: 'bg-slate-800',
  emerald: 'bg-emerald-500',
};

const ACCENTS = Object.keys(SWATCHES).filter((name): name is ThemeName => name in themes);

const AppearanceStep: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const { mode, setMode, currentTheme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <AuthHeader title="Make it yours" subtitle="Pick how QR Studio looks. You can change this any time in Settings." />

      <div>
        <div className="mb-2 text-[13px] font-semibold text-muted-foreground">Appearance</div>
        <div className="grid grid-cols-3 gap-2">
          {MODES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-colors',
                mode === value ? 'border-primary bg-primary/5 text-foreground' : 'border-border bg-card text-muted-foreground hover:border-input hover:text-foreground'
              )}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-[13px] font-semibold text-muted-foreground">Accent color</div>
        <div className="flex flex-wrap gap-2.5">
          {ACCENTS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setTheme(name)}
              aria-label={themes[name].label}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full ring-offset-2 ring-offset-background transition-shadow',
                SWATCHES[name],
                currentTheme === name ? 'ring-2 ring-foreground' : 'hover:ring-2 hover:ring-border'
              )}
            >
              {currentTheme === name && <Check size={16} className="text-white" />}
            </button>
          ))}
        </div>
      </div>

      <Button type="primary" block onClick={onDone}>
        Go to my workspace
      </Button>
    </div>
  );
};

export default AppearanceStep;
