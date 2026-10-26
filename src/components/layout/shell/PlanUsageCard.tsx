import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useSubscription } from '@/context/SubscriptionContext';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchStats, selectShouldFetchStats, selectStatsTotal } from '@/store/slices/statsSlice';

const PlanUsageCard: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
  const dispatch = useAppDispatch();
  const { subscription, isOnTrial, getTrialDaysRemaining, getPlanDisplayName } = useSubscription();
  const used = Number(useAppSelector(selectStatsTotal)) || 0;
  const shouldFetch = useAppSelector(selectShouldFetchStats);

  useEffect(() => {
    if (shouldFetch) dispatch(fetchStats());
  }, [dispatch, shouldFetch]);

  const limit = subscription?.features.maxQRCodes ?? 5;
  const unlimited = limit === -1;
  const trial = isOnTrial();
  const daysLeft = getTrialDaysRemaining();
  const percent = unlimited ? 100 : Math.min(100, Math.round((used / Math.max(limit, 1)) * 100));

  return (
    <Link
      to="/pricing"
      onClick={onNavigate}
      className="block rounded-xl border border-border bg-panel p-3 transition-colors hover:border-input"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold text-foreground">{trial ? 'Pro trial' : `${getPlanDisplayName()} plan`}</span>
        {trial && daysLeft !== null ? (
          <span className="text-xs font-medium text-primary tabular-nums">{daysLeft}d left</span>
        ) : (
          <Sparkles size={14} className="text-primary" />
        )}
      </div>
      <div className="mt-2.5">
        <Progress value={percent} className="h-1.5 bg-muted" />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span className="tabular-nums">
          {used} {unlimited ? 'QR codes' : `of ${limit} QR codes`}
        </span>
        <span className="font-medium text-foreground/80">{trial || subscription?.planType === 'free' ? 'Upgrade' : 'Manage'}</span>
      </div>
    </Link>
  );
};

export default PlanUsageCard;
