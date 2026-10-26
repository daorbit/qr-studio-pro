import {
  Briefcase,
  Building,
  Building2,
  CalendarDays,
  CreditCard,
  Globe,
  Instagram,
  Linkedin,
  Megaphone,
  MessageCircle,
  Package,
  Search,
  Sparkles,
  User,
  Users,
  UtensilsCrossed,
  Wifi,
  Youtube,
  type LucideIcon,
} from 'lucide-react';

export interface StepMeta {
  slug: string;
  label: string;
  title: string;
  lede: string;
}

export const STEPS: StepMeta[] = [
  { slug: 'details', label: 'Your details', title: 'Tell us who you are', lede: 'This is the name your teammates see on QR codes and activity.' },
  { slug: 'workspace', label: 'Workspace', title: 'Name your workspace', lede: 'A workspace holds your QR codes, analytics and plan together. Usually your company, or one client.' },
  { slug: 'use', label: 'Use cases', title: 'What will you use QR codes for?', lede: 'Pick everything that applies. We use it to suggest the right templates.' },
  { slug: 'team', label: 'Team', title: 'How big is your team?', lede: 'Helps us tailor sharing and roles to how you work.' },
  { slug: 'appearance', label: 'Appearance', title: 'Make it yours', lede: 'Pick how QR Studio looks. You can change it any time in Settings.' },
  { slug: 'referral', label: 'About you', title: 'One last thing. How did you hear about us?', lede: 'Pick everything that applies. It helps us know where to focus.' },
  { slug: 'ready', label: 'Ready', title: "You're all set", lede: 'Your workspace is ready, with 3 months of Pro free. Create your first QR code in under a minute.' },
];

export const STEP_INDEX = Object.fromEntries(STEPS.map((s, i) => [s.slug, i])) as Record<string, number>;

export interface ChoiceOption {
  value: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  tone: string;
}

export const USE_CASES: ChoiceOption[] = [
  { value: 'menus', label: 'Restaurant menus', hint: 'Contactless menus and ordering', icon: UtensilsCrossed, tone: 'bg-orange-500/10 text-orange-500' },
  { value: 'marketing', label: 'Marketing campaigns', hint: 'Posters, flyers and ads', icon: Megaphone, tone: 'bg-rose-500/10 text-rose-500' },
  { value: 'business-cards', label: 'Business cards', hint: 'vCards and contact sharing', icon: Briefcase, tone: 'bg-sky-500/10 text-sky-500' },
  { value: 'events', label: 'Events and tickets', hint: 'Check-ins, invites, schedules', icon: CalendarDays, tone: 'bg-violet-500/10 text-violet-500' },
  { value: 'packaging', label: 'Product packaging', hint: 'Manuals, reviews, warranties', icon: Package, tone: 'bg-amber-500/10 text-amber-500' },
  { value: 'wifi', label: 'Wi-Fi access', hint: 'Guests connect in one scan', icon: Wifi, tone: 'bg-teal-500/10 text-teal-500' },
  { value: 'payments', label: 'Payments', hint: 'UPI and payment links', icon: CreditCard, tone: 'bg-emerald-500/10 text-emerald-500' },
  { value: 'other', label: 'Something else', hint: 'We will keep it flexible', icon: Sparkles, tone: 'bg-indigo-500/10 text-indigo-500' },
];

export const TEAM_SIZES: ChoiceOption[] = [
  { value: '1', label: 'Just me', icon: User, tone: 'bg-orange-500/10 text-orange-500' },
  { value: '2-10', label: '2 to 10', icon: Users, tone: 'bg-sky-500/10 text-sky-500' },
  { value: '11-50', label: '11 to 50', icon: Building, tone: 'bg-violet-500/10 text-violet-500' },
  { value: '51-200', label: '51 to 200', icon: Building2, tone: 'bg-emerald-500/10 text-emerald-500' },
  { value: '200+', label: 'More than 200', icon: Globe, tone: 'bg-rose-500/10 text-rose-500' },
];

export const REFERRAL_SOURCES: ChoiceOption[] = [
  { value: 'google', label: 'Google search', icon: Search, tone: 'bg-sky-500/10 text-sky-500' },
  { value: 'ai', label: 'ChatGPT or another AI', icon: Sparkles, tone: 'bg-violet-500/10 text-violet-500' },
  { value: 'youtube', label: 'YouTube', icon: Youtube, tone: 'bg-rose-500/10 text-rose-500' },
  { value: 'instagram', label: 'Instagram', icon: Instagram, tone: 'bg-pink-500/10 text-pink-500' },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, tone: 'bg-blue-500/10 text-blue-500' },
  { value: 'friend', label: 'A friend or colleague', icon: MessageCircle, tone: 'bg-emerald-500/10 text-emerald-500' },
  { value: 'other', label: 'Somewhere else', icon: Globe, tone: 'bg-amber-500/10 text-amber-500' },
];
