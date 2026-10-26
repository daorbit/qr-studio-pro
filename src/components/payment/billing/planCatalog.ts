import type { Plan, Plans, Subscription } from '@/types/payment';

export type PlanKey = 'free' | 'basic' | 'pro' | 'enterprise';
export type Cycle = 1 | 12;

export interface CatalogPlan {
  key: PlanKey;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: Plan['features'];
}

const FREE_FEATURES: Plan['features'] = {
  maxQRCodes: 5,
  maxScansPerQR: 100,
  maxMembers: 1,
  analytics: true,
  advancedAnalytics: false,
  whiteLabel: false,
  removeWatermark: false,
  passwordProtection: false,
  expirationDate: false,
  customScanLimit: false,
};

const TAGLINES: Record<PlanKey, string> = {
  free: 'For trying QR Studio on a few codes.',
  basic: 'For small businesses printing their first campaigns.',
  pro: 'For growing teams that live on their scan data.',
  enterprise: 'For organisations that need it all, without limits.',
};

const PLAN_ORDER: Record<string, number> = { free: 0, basic: 1, pro: 2, enterprise: 3, trial: 2 };

export const buildCatalog = (plans: Plans): CatalogPlan[] => [
  { key: 'free', name: 'Free', tagline: TAGLINES.free, monthlyPrice: 0, yearlyPrice: 0, features: FREE_FEATURES },
  ...(['basic', 'pro', 'enterprise'] as const)
    .filter((key) => plans[key])
    .map((key) => ({
      key,
      name: plans[key].name,
      tagline: TAGLINES[key],
      monthlyPrice: plans[key].monthlyPrice,
      yearlyPrice: plans[key].yearlyPrice,
      features: plans[key].features,
    })),
];

const amount = (value: number | undefined, unit: string) =>
  value === -1 ? `Unlimited ${unit}` : `${(value ?? 0).toLocaleString()} ${unit}`;

export const featureLines = (f: Plan['features']): string[] =>
  [
    amount(f.maxQRCodes, 'QR codes'),
    `${f.maxScansPerQR === -1 ? 'Unlimited' : f.maxScansPerQR.toLocaleString()} scans per code`,
    amount(f.maxMembers ?? 1, f.maxMembers === 1 ? 'seat' : 'seats'),
    f.advancedAnalytics ? 'Advanced analytics' : f.analytics ? 'Scan analytics' : '',
    f.passwordProtection ? 'Password protection' : '',
    f.expirationDate ? 'Expiry dates' : '',
    f.customScanLimit ? 'Custom scan limits' : '',
    f.removeWatermark ? 'No watermark' : '',
    f.whiteLabel ? 'White-label redirect pages' : '',
  ].filter(Boolean);

export const yearlySavingPercent = (catalog: CatalogPlan[]) => {
  const paid = catalog.filter((p) => p.monthlyPrice > 0 && p.yearlyPrice > 0);
  if (!paid.length) return 0;
  return Math.max(...paid.map((p) => Math.round((1 - p.yearlyPrice / (p.monthlyPrice * 12)) * 100)));
};

export type PlanAction = 'current' | 'upgrade' | 'switch' | 'included' | 'downgrade' | 'contact' | 'free';

export const planAction = (plan: CatalogPlan, subscription: Subscription | null): PlanAction => {
  const current = subscription?.planType ?? 'free';
  if (plan.key === 'enterprise' || current === 'enterprise') return current === plan.key ? 'current' : 'contact';
  if (current === plan.key) return 'current';
  if (plan.key === 'free') return 'free';
  if (current === 'trial') return 'upgrade';
  if (PLAN_ORDER[plan.key] > PLAN_ORDER[current]) return current === 'free' ? 'upgrade' : 'switch';
  return 'downgrade';
};
