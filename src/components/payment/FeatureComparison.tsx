import React from 'react';
import { Check, Minus } from 'lucide-react';
import type { Plan } from '@/types/payment';
import { cn } from '@/lib/utils';
import type { CatalogPlan, PlanKey } from './billing/planCatalog';

interface FeatureComparisonProps {
  catalog: CatalogPlan[];
  currentKey?: PlanKey | 'trial';
}

type FeatureKey = keyof Plan['features'];

const ROWS: { group: string; items: { label: string; key: FeatureKey }[] }[] = [
  {
    group: 'Limits',
    items: [
      { label: 'QR codes', key: 'maxQRCodes' },
      { label: 'Scans per code', key: 'maxScansPerQR' },
      { label: 'Seats', key: 'maxMembers' },
    ],
  },
  {
    group: 'Analytics',
    items: [
      { label: 'Scan analytics', key: 'analytics' },
      { label: 'Audience insights', key: 'advancedAnalytics' },
    ],
  },
  {
    group: 'Protection',
    items: [
      { label: 'Password protection', key: 'passwordProtection' },
      { label: 'Expiry dates', key: 'expirationDate' },
      { label: 'Custom scan limits', key: 'customScanLimit' },
    ],
  },
  {
    group: 'Branding',
    items: [
      { label: 'Remove watermark', key: 'removeWatermark' },
      { label: 'White-label redirect pages', key: 'whiteLabel' },
    ],
  },
];

const Cell: React.FC<{ value: number | boolean | undefined }> = ({ value }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check size={16} className="mx-auto text-primary" aria-label="Included" />
    ) : (
      <Minus size={16} className="mx-auto text-muted-foreground/50" aria-label="Not included" />
    );
  }
  return <span className="font-medium tabular-nums text-foreground">{value === -1 ? 'Unlimited' : (value ?? 1).toLocaleString()}</span>;
};

const FeatureComparison: React.FC<FeatureComparisonProps> = ({ catalog, currentKey }) => (
  <section className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
    <header className="border-b border-border px-5 py-4">
      <h3 className="text-sm font-semibold text-foreground">Compare plans</h3>
      <p className="mt-0.5 text-xs text-muted-foreground">Everything each plan includes, side by side.</p>
    </header>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-[13px]">
        <thead>
          <tr className="border-b border-border">
            <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Feature</th>
            {catalog.map((plan) => (
              <th key={plan.key} className={cn('px-4 py-3 text-center text-[13px] font-semibold text-foreground', plan.key === currentKey && 'bg-primary/[0.05]')}>
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((group) => (
            <React.Fragment key={group.group}>
              <tr>
                <td colSpan={catalog.length + 1} className="bg-foreground/[0.025] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {group.group}
                </td>
              </tr>
              {group.items.map((row) => (
                <tr key={row.key} className="border-t border-border">
                  <td className="px-5 py-3 text-muted-foreground">{row.label}</td>
                  {catalog.map((plan) => (
                    <td key={plan.key} className={cn('px-4 py-3 text-center', plan.key === currentKey && 'bg-primary/[0.05]')}>
                      <Cell value={plan.features[row.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default FeatureComparison;
