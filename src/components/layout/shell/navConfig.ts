import {
  BarChart3,
  Building2,
  CreditCard,
  GitCompare,
  LayoutGrid,
  PlusSquare,
  Settings,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  match?: string[];
}

export interface NavGroup {
  heading: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    heading: 'Workspace',
    items: [
      { to: '/dashboard', label: 'QR codes', icon: LayoutGrid, match: ['/edit'] },
      { to: '/create', label: 'Create', icon: PlusSquare },
      { to: '/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/compare', label: 'Compare', icon: GitCompare },
    ],
  },
  {
    heading: 'Team',
    items: [
      { to: '/workspace', label: 'Workspace', icon: Building2 },
      { to: '/members', label: 'Members', icon: Users },
      { to: '/pricing', label: 'Plans and billing', icon: CreditCard },
      { to: '/settings/profile', label: 'Settings', icon: Settings, match: ['/settings'] },
    ],
  },
];

export const ADMIN_GROUP: NavGroup = {
  heading: 'Admin',
  items: [
    { to: '/admin/users', label: 'Admin data', icon: ShieldCheck, match: ['/admin'] },
  ],
};

export const findActivePath = (groups: NavGroup[], pathname: string): string | null => {
  let best: { to: string; length: number } | null = null;
  for (const item of groups.flatMap((g) => g.items)) {
    for (const prefix of [item.to, ...(item.match ?? [])]) {
      if ((pathname === prefix || pathname.startsWith(`${prefix}/`)) && (!best || prefix.length > best.length)) {
        best = { to: item.to, length: prefix.length };
      }
    }
  }
  return best?.to ?? null;
};
