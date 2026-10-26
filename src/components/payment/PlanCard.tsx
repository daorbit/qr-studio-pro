import React from 'react';
import { Button } from '@mantine/core';
import { ArrowUpRight, Check, CreditCard, Mail, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/currencyFormatter';
import { SUPPORT_MAILTO } from '@/lib/config';
import { featureLines, type CatalogPlan, type Cycle, type PlanAction } from './billing/planCatalog';

interface PlanCardProps {
  plan: CatalogPlan;
  cycle: Cycle;
  action: PlanAction;
  featured: boolean;
  onTrial: boolean;
  loading: boolean;
  onSelect: (plan: CatalogPlan) => void;
}

const CTA: Record<PlanAction, string> = {
  current: 'Current plan',
  upgrade: 'Upgrade',
  switch: 'Switch plan',
  included: 'Included',
  downgrade: 'Not available as a downgrade',
  contact: 'Talk to us',
  free: 'Free forever',
};

const PlanCard: React.FC<PlanCardProps> = ({ plan, cycle, action, featured, onTrial, loading, onSelect }) => {
  const paid = plan.monthlyPrice > 0;
  const perMonth = cycle === 12 ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice;
  const saving = plan.monthlyPrice * 12 - plan.yearlyPrice;
  const current = action === 'current';
  const highlight = featured || current;
  const actionable = action === 'upgrade' || action === 'switch' || action === 'contact';
  const label = action === 'downgrade' && onTrial ? 'Included in your trial' : CTA[action];

  return (
    <article
      className={cn(
        'relative flex flex-col overflow-hidden rounded-xl border bg-card p-6 shadow-soft',
        highlight ? 'border-primary/50 shadow-card' : 'border-border'
      )}
    >
      {highlight && (
        <span className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,hsl(var(--primary)/0.14),transparent_70%)]" />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <h3 className="text-[19px] font-bold tracking-[-0.02em] text-foreground">{plan.name}</h3>
        {current ? (
          <span className="inline-flex h-6 items-center gap-1 rounded-full bg-primary px-2.5 text-[11.5px] font-semibold text-primary-foreground">
            <Check size={12} strokeWidth={2.75} />
            {onTrial ? 'Your trial' : 'Current'}
          </span>
        ) : featured ? (
          <span className="inline-flex h-6 items-center gap-1 rounded-full bg-primary/10 px-2.5 text-[11.5px] font-semibold text-primary">
            <Sparkles size={12} />
            Most popular
          </span>
        ) : null}
      </div>
      <p className="relative mt-1 min-h-[36px] text-xs leading-relaxed text-muted-foreground">{plan.tagline}</p>

      <div className="relative mt-5 flex items-baseline gap-1.5">
        {plan.key === 'enterprise' ? (
          <span className="text-[32px] font-bold leading-none tracking-[-0.04em] text-foreground">Custom</span>
        ) : (
          <>
            <span className="text-[40px] font-bold leading-none tracking-[-0.045em] text-foreground">{formatCurrency(perMonth)}</span>
            <span className="text-[13px] text-muted-foreground">/ month</span>
          </>
        )}
      </div>
      <div className="relative mt-2 min-h-[18px] text-xs">
        {paid && cycle === 12 && plan.key !== 'enterprise' && (
          <span className="text-muted-foreground">
            {formatCurrency(plan.yearlyPrice)} billed yearly
            {saving > 0 && <span className="ml-1.5 font-semibold text-[var(--viz-good)]">Save {formatCurrency(saving)}</span>}
          </span>
        )}
      </div>

      <Button
        fullWidth
        size="md"
        mt="lg"
        variant={actionable && highlight ? 'filled' : actionable ? 'default' : 'light'}
        disabled={!actionable}
        loading={loading}
        leftSection={action === 'contact' ? <Mail size={15} /> : actionable ? <CreditCard size={15} /> : undefined}
        rightSection={action === 'upgrade' ? <ArrowUpRight size={15} /> : undefined}
        onClick={() => (action === 'contact' ? (window.location.href = SUPPORT_MAILTO) : onSelect(plan))}
      >
        {label}
      </Button>

      <div className="my-5 h-px bg-border" />

      <ul className="flex flex-1 flex-col gap-2.5">
        {featureLines(plan.features).map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-[12.5px] leading-snug text-muted-foreground">
            <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check size={11} strokeWidth={3} />
            </span>
            {line}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PlanCard;
