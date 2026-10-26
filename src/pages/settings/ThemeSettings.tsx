import React, { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import { Check, Monitor, Moon, Palette, SunMedium, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { themes, ThemeName, ThemeMode } from '../../context/themeTypes';
import { message } from '@/lib/notify';
import SettingsCard from '@/components/common/SettingsCard';

const MODES = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

const ThemeSettings: React.FC = () => {
  const { currentTheme, mode, setTheme, setMode } = useTheme();
  const [pending, setPending] = useState<ThemeName | null>(null);

  const pickTheme = async (name: ThemeName) => {
    if (name === currentTheme || pending) return;
    setPending(name);
    try {
      await setTheme(name);
    } catch {
      message.error('Could not save your theme');
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="space-y-5">
      <SettingsCard icon={SunMedium} title="Appearance" description="Light, dark, or follow your device.">
        <SegmentedControl
          fullWidth
          value={mode}
          onChange={(value) => setMode(value as ThemeMode)}
          data={MODES.map(({ value, label, icon: Icon }) => ({
            value,
            label: (
              <span className="inline-flex items-center justify-center gap-1.5 py-1">
                <Icon size={15} />
                {label}
              </span>
            ),
          }))}
          className="max-w-md"
        />
      </SettingsCard>

      <SettingsCard icon={Palette} title="Accent color" description="Used for buttons, highlights and charts. Applies right away.">
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
          {(Object.entries(themes) as [ThemeName, (typeof themes)[ThemeName]][]).map(([key, theme]) => {
            const selected = (pending ?? currentTheme) === key;
            const swatch = key.startsWith('gradient_')
              ? `linear-gradient(135deg, hsl(${theme.colors.primary}), hsl(${theme.colors.accent}))`
              : `hsl(${theme.colors.primary})`;
            return (
              <button
                key={key}
                type="button"
                data-selected={selected}
                onClick={() => pickTheme(key)}
                className="create-tile flex flex-col items-center gap-2 rounded-xl px-2 py-3"
                aria-pressed={selected}
              >
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full shadow-soft" style={{ background: swatch }}>
                  {selected && <Check size={16} strokeWidth={3} className="text-white" />}
                </span>
                <span className="truncate text-xs font-medium text-foreground">{theme.label}</span>
              </button>
            );
          })}
        </div>
      </SettingsCard>
    </div>
  );
};

export default ThemeSettings;
