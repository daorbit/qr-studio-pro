import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Activity, Smartphone } from 'lucide-react';
import type { DeviceData, ScanData } from '@/types/analytics';
import ChartPanel from './chart/ChartPanel';
import ChartTooltip from './chart/ChartTooltip';
import DonutBreakdown from './chart/DonutBreakdown';
import { AXIS_PROPS, GRID_PROPS, PRIMARY_COLOR, formatNumber } from './chart/chartTheme';

interface MainChartsProps {
  scansOverTime: ScanData[];
  deviceData: DeviceData[];
}

const MainCharts: React.FC<MainChartsProps> = ({ scansOverTime, deviceData }) => {
  const total = scansOverTime.reduce((sum, d) => sum + (d.scans || 0), 0);
  const peak = scansOverTime.reduce<ScanData | null>((best, d) => (!best || d.scans > best.scans ? d : best), null);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ChartPanel
        title="Scan activity"
        description="Daily scans over the last 30 days"
        icon={Activity}
        className="lg:col-span-2"
        empty={total === 0}
        emptyText="No scans in the last 30 days"
        extra={
          peak && peak.scans > 0 ? (
            <div className="text-right">
              <div className="text-[11px] text-muted-foreground">Busiest day</div>
              <div className="text-[13px] font-semibold text-foreground">
                {peak.date} · {formatNumber(peak.scans)}
              </div>
            </div>
          ) : null
        }
      >
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={scansOverTime} margin={{ top: 8, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="scanActivityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={PRIMARY_COLOR} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={PRIMARY_COLOR} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...GRID_PROPS} />
              <XAxis dataKey="date" {...AXIS_PROPS} interval="preserveStartEnd" minTickGap={24} />
              <YAxis {...AXIS_PROPS} allowDecimals={false} width={40} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeDasharray: '3 3' }} />
              <Area
                type="monotone"
                dataKey="scans"
                stroke={PRIMARY_COLOR}
                strokeWidth={2}
                fill="url(#scanActivityFill)"
                activeDot={{ r: 4, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartPanel>

      <ChartPanel title="Devices" description="What people scan with" icon={Smartphone} empty={!deviceData.some((d) => d.value > 0)}>
        <DonutBreakdown data={deviceData} />
      </ChartPanel>
    </div>
  );
};

export default MainCharts;
