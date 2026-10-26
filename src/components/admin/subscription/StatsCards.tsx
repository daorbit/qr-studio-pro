import React from 'react';
import { DollarSign, Users, CreditCard, TrendingUp } from 'lucide-react';
import type { SubscriptionStats } from '@/store/slices/adminSlice';
import { formatStatsCurrency } from '@/utils/currencyFormatter';
import StatTile from '@/components/common/StatTile';

interface StatsCardsProps {
  stats: SubscriptionStats | null;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => (
  <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
    <StatTile label="Total Revenue" icon={DollarSign} value={formatStatsCurrency(stats?.totalRevenue || 0)} />
    <StatTile label="Active Subs" icon={Users} value={stats?.activeSubscriptions || 0} />
    <StatTile label="Payments" icon={CreditCard} value={stats?.totalPayments || 0} />
    <StatTile label="Conversion" icon={TrendingUp} value={`${(stats?.conversionRate || 0).toFixed(1)}%`} />
  </div>
);

export default StatsCards;
