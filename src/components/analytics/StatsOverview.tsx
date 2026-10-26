import React from 'react';
import { CalendarDays, Eye, QrCode, TrendingUp } from 'lucide-react';
import type { ScanData } from '@/types/analytics';
import StatTile from '@/components/common/StatTile';
import TrendNote from './TrendNote';
import { formatNumber } from './chart/chartTheme';

interface StatsOverviewProps {
  displayedTotalScans: number;
  activeQRs: number;
  totalQRCodes: number;
  avgScansPerQR: number;
  scansOverTime: ScanData[];
}

const sumOf = (rows: ScanData[]) => rows.reduce((sum, r) => sum + (r.scans || 0), 0);

const StatsOverview: React.FC<StatsOverviewProps> = ({ displayedTotalScans, activeQRs, totalQRCodes, avgScansPerQR, scansOverTime }) => {
  const last7 = sumOf(scansOverTime.slice(-7));
  const prev7 = sumOf(scansOverTime.slice(-14, -7));
  const last30 = sumOf(scansOverTime);

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <StatTile icon={Eye} label="Total scans" value={formatNumber(displayedTotalScans || 0)} footnote={`${formatNumber(last30)} in the last 30 days`} />
      <StatTile
        icon={CalendarDays}
        label="Last 7 days"
        value={formatNumber(last7)}
        footnote={<TrendNote current={last7} previous={prev7} label="vs previous 7 days" />}
      />
      <StatTile icon={QrCode} label="Active codes" value={formatNumber(activeQRs || 0)} footnote={`of ${formatNumber(totalQRCodes || 0)} total`} />
      <StatTile icon={TrendingUp} label="Avg. scans per code" value={formatNumber(Math.round(avgScansPerQR || 0))} footnote="Across all codes" />
    </div>
  );
};

export default StatsOverview;
