import React, { useMemo, useState } from 'react';
import { usePayment } from '@/hooks/usePayment';
import EmptyBlock from '@/components/common/EmptyBlock';
import DurationToggle from './DurationToggle';
import PlanCard from './PlanCard';
import FeatureComparison from './FeatureComparison';
import { buildCatalog, planAction, yearlySavingPercent, type CatalogPlan, type Cycle } from './billing/planCatalog';

const PricingPlans: React.FC = () => {
  const { plans, subscription, processPayment } = usePayment();
  const [cycle, setCycle] = useState<Cycle>(1);
  const [processing, setProcessing] = useState<string | null>(null);

  const catalog = useMemo(() => (plans ? buildCatalog(plans) : []), [plans]);

  if (!plans) return <EmptyBlock title="We couldn't load the plans" description="Refresh the page to try again." />;

  const onTrial = subscription?.planType === 'trial';

  const handleSelect = async (plan: CatalogPlan) => {
    setProcessing(plan.key);
    await processPayment(plan.key, cycle);
    setProcessing(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">Choose a plan</h2>
          <p className="text-sm text-muted-foreground">Prices in INR. Switch to yearly billing to save.</p>
        </div>
        <DurationToggle selectedDuration={cycle} onDurationChange={setCycle} yearlySaving={yearlySavingPercent(catalog)} />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {catalog.map((plan) => (
          <PlanCard
            key={plan.key}
            plan={plan}
            cycle={cycle}
            action={planAction(plan, subscription)}
            featured={plan.key === 'pro' && !onTrial}
            onTrial={onTrial}
            loading={processing === plan.key}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <FeatureComparison catalog={catalog} currentKey={onTrial ? 'pro' : subscription?.planType} />
    </div>
  );
};

export default PricingPlans;
