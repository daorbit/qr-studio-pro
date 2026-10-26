import React, { memo } from 'react';
import CountUp from 'react-countup';
import { CirclePause, Eye, QrCode, Zap, type LucideIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import StatTile from '@/components/common/StatTile';

interface StatsCardsProps {
  loading: boolean;
  stats: {
    total: number;
    totalScans: number;
    totalActive: number;
    inactive: number;
  };
}

const StatsCards: React.FC<StatsCardsProps> = memo(({ loading, stats }) => {
  const tiles: { label: string; value: number; icon: LucideIcon }[] = [
    { label: 'Total scans', value: Number(stats.totalScans) || 0, icon: Eye },
    { label: 'QR codes', value: Number(stats.total) || 0, icon: QrCode },
    { label: 'Active', value: Number(stats.totalActive) || 0, icon: Zap },
    { label: 'Paused', value: Math.max(0, Number(stats.inactive) || 0), icon: CirclePause },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {tiles.map(({ label, value, icon }) => (
        <StatTile
          key={label}
          icon={icon}
          label={label}
          value={loading ? <Skeleton className="h-7 w-16" /> : <CountUp end={value} duration={1.2} separator="," preserveValue />}
        />
      ))}
    </div>
  );
});

StatsCards.displayName = 'StatsCards';

export default StatsCards;
