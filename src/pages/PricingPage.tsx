import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs } from '@mantine/core';
import { CreditCard, Receipt } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import PageHeader from '@/components/layout/PageHeader';
import { usePayment } from '@/hooks/usePayment';
import { useWorkspace } from '@/hooks/useWorkspace';
import { useQRCodes } from '@/hooks/useQRCodes';
import PricingPlans from '@/components/payment/PricingPlans';
import PlanOverview from '@/components/payment/billing/PlanOverview';
import PaymentHistory from '@/components/payment/billing/PaymentHistory';

type BillingTab = 'plans' | 'history';

const PricingPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const tab: BillingTab = params.get('tab') === 'history' ? 'history' : 'plans';
  const { subscription, plansLoading, subscriptionLoading } = usePayment();
  const { workspace } = useWorkspace();
  const { statsTotal } = useQRCodes();

  const setTab = (next: string | null) => setParams(next === 'history' ? { tab: 'history' } : {}, { replace: true });

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Plans and billing"
        description={workspace ? `What ${workspace.name} is on, what it could be on, and what it has paid.` : undefined}
      />

      {plansLoading || subscriptionLoading ? (
        <div className="space-y-5">
          <Skeleton className="h-[200px] rounded-xl" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[420px] rounded-xl" />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {subscription && (
            <PlanOverview
              subscription={subscription}
              qrCount={Number(statsTotal) || 0}
              memberCount={workspace?.memberCount ?? 1}
              onChangePlan={() => setTab('plans')}
            />
          )}

          <Tabs value={tab} onChange={setTab} keepMounted={false}>
            <Tabs.List className="mb-6">
              <Tabs.Tab value="plans" leftSection={<CreditCard size={15} />}>
                Plans
              </Tabs.Tab>
              <Tabs.Tab value="history" leftSection={<Receipt size={15} />}>
                Payment history
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="plans">
              <PricingPlans />
            </Tabs.Panel>
            <Tabs.Panel value="history">
              <PaymentHistory />
            </Tabs.Panel>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
