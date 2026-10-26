import type { FC } from 'react';
import { Droplets, Palette, Shield, Tag, User, type LucideIcon } from 'lucide-react';
import type { Subscription } from '@/types/payment';
import ProfileInfo from './ProfileInfo';
import ThemeSettings from './ThemeSettings';
import SecuritySettings from './SecuritySettings';
import WatermarkSettings from '@/components/settings/WatermarkSettings';
import WhiteLabelSettings from '@/components/settings/WhiteLabelSettings';

export interface SettingsSection {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  premium?: keyof Subscription['features'];
  Panel: FC;
}

export const SETTINGS_SECTIONS: SettingsSection[] = [
  { id: 'profile', label: 'Account', description: 'Your photo, name and regional preferences.', icon: User, Panel: ProfileInfo },
  { id: 'theme', label: 'Appearance', description: 'How QR Studio looks on this device and across your account.', icon: Palette, Panel: ThemeSettings },
  {
    id: 'watermark',
    label: 'Watermark',
    description: 'The attribution added to codes downloaded from this workspace.',
    icon: Droplets,
    premium: 'removeWatermark',
    Panel: WatermarkSettings,
  },
  {
    id: 'whitelabel',
    label: 'White-label',
    description: 'Your branding on the page people see after they scan.',
    icon: Tag,
    premium: 'whiteLabel',
    Panel: WhiteLabelSettings,
  },
  { id: 'security', label: 'Security', description: 'Keep your account protected.', icon: Shield, Panel: SecuritySettings },
];
