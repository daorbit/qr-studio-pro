import React from 'react';
import { Button } from '@mantine/core';
import { ArrowUpRight, CalendarClock, Clock, Infinity as InfinityIcon } from 'lucide-react';
import type { Subscription } from '@/types/payment';
import { useDateFormatter } from '@/hooks/useDateFormatter';
import { cn } from '@/lib/utils';
import UsageMeter from '@/components/common/UsageMeter';

const PLAN_NAMES: Record<Subscription['planType'], string> = {
  free: 'Free',
  basic: 'Basic',
  pro: 'Pro',
  enterprise: 'Enterprise',
  trial: 'Pro trial',
};

const RENEW_SOON_DAYS = 7;

interface PlanOverviewProps {
  subscription: Subscription;
  qrCount: number;
  memberCount: number;
  onChangePlan: () => void;
}

const daysUntil = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);

const PlanOverview: React.FC<PlanOverviewProps> = ({ subscription, qrCount, memberCount, onChangePlan }) => {
  const formatter = useDateFormatter();
  const { planType, status, features } = subscription;
  const endDate = planType === 'trial' ? subscription.trialEndDate : subscription.endDate;
  const daysLeft = endDate ? daysUntil(endDate) : null;
  const expired = status === 'expired' || (daysLeft !== null && daysLeft < 0);
  const soon = daysLeft !== null && daysLeft >= 0 && daysLeft <= RENEW_SOON_DAYS;

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <div className="create-stage flex flex-wrap items-center justify-between gap-5 px-5 py-6 sm:px-7">
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Current plan</span>
          <div className="mt-1 flex flex-wrap items-center gap-2.5">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-foreground">{PLAN_NAMES[planType]}</h2>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize',
                expired ? 'bg-destructive/10 text-destructive' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              )}
            >
              <span className={cn('h-1.5 w-1.5 rounded-full', expired ? 'bg-destructive' : 'bg-emerald-500')} />
              {expired ? 'Expired' : status}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {planType === 'free' ? (
              <span className="inline-flex items-center gap-1.5">
                <InfinityIcon size={13} />
                Free forever · upgrade any time
              </span>
            ) : endDate ? (
              <span className="inline-flex items-center gap-1.5">
                {planType === 'trial' ? <Clock size={13} /> : <CalendarClock size={13} />}
                {expired ? 'Ended' : planType === 'trial' ? 'Trial ends' : 'Renews'} {formatter.format(endDate, { dateStyle: 'medium' })}
              </span>
            ) : null}
            {daysLeft !== null && !expired && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 font-medium tabular-nums',
                  soon ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-foreground/[0.06] text-foreground'
                )}
              >
                {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
              </span>
            )}
          </div>
        </div>
        <Button onClick={onChangePlan} rightSection={<ArrowUpRight size={15} />}>
          {planType === 'free' || planType === 'trial' || expired ? 'Upgrade' : 'Change plan'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 border-t border-border px-5 py-5 sm:grid-cols-3 sm:px-7">
        <UsageMeter label="QR codes" used={qrCount} limit={planType === 'trial' ? -1 : features.maxQRCodes} />
        <UsageMeter label="Seats" used={memberCount} limit={planType === 'trial' ? -1 : features.maxMembers ?? 1} />
        <div>
          <div className="mb-1.5 text-xs font-medium text-muted-foreground">Scans per code</div>
          <div className="text-sm font-semibold text-foreground">
            {planType === 'trial' || features.maxScansPerQR === -1 ? 'Unlimited' : features.maxScansPerQR.toLocaleString()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanOverview;
