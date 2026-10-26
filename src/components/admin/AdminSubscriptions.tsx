import React, { useState } from 'react';
import { Alert, Tabs } from '@mantine/core';
import { AlertCircle } from 'lucide-react';
import useAdminSubscriptions from '@/hooks/useAdminSubscriptions';
import StatsCards from './subscription/StatsCards';
import SubscriptionTable from './subscription/SubscriptionTable';
import SearchHeader from './subscription/SearchHeader';
import PaymentTable from './subscription/PaymentTable';

const AdminSubscriptions: React.FC = () => {
  const {
    stats,
    subscriptions,
    payments,
    loading,
    error,
    page,
    limit,
    totalSubs,
    totalPayments,
    search,
    handleSearch,
    handleTableChange,
    refresh,
  } = useAdminSubscriptions();

  const [localSearch, setLocalSearch] = useState(search);

  const onSearch = () => {
    handleSearch(localSearch);
  };

  const searchProps = {
    searchValue: localSearch,
    onSearchChange: setLocalSearch,
    onSearch,
    onRefresh: refresh,
    loading,
  };

  return (
    <div>
      <StatsCards stats={stats} />

      {error && (
        <Alert color="red" title="Failed to load subscription data" icon={<AlertCircle size={16} />} className="mb-4">
          {error}
        </Alert>
      )}

      <Tabs defaultValue="subscriptions">
        <Tabs.List className="mb-4">
          <Tabs.Tab value="subscriptions">Subscriptions</Tabs.Tab>
          <Tabs.Tab value="payments">Payments</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="subscriptions">
          <SearchHeader title="Active Subscriptions" description="View all user subscriptions and their details" {...searchProps} />
          <SubscriptionTable
            subscriptions={subscriptions}
            loading={loading}
            page={page}
            limit={limit}
            total={totalSubs}
            onTableChange={handleTableChange}
          />
        </Tabs.Panel>

        <Tabs.Panel value="payments">
          <SearchHeader title="Payment History" description="Track all payment transactions" {...searchProps} />
          <PaymentTable
            payments={payments}
            loading={loading}
            page={page}
            limit={limit}
            total={totalPayments}
            onTableChange={handleTableChange}
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default AdminSubscriptions;
