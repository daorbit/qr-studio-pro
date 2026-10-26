import React from 'react';
import { Loader } from '@mantine/core';
import { Clock } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { HourlyData, PeakTimesData } from '@/types/analytics';
import ChartPanel from './chart/ChartPanel';
import ChartTooltip from './chart/ChartTooltip';
import { AXIS_PROPS, GRID_PROPS, PRIMARY_COLOR } from './chart/chartTheme';

interface PeakTimesProps {
  data?: PeakTimesData;
  loading?: boolean;
  qrCodeId?: string;
}

const formatHour = (hour: number | string) => {
  if (typeof hour === 'string') return hour;
  return `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? 'am' : 'pm'}`;
};

const PeakTimesAnalysis: React.FC<PeakTimesProps> = ({ data, loading }) => {
  const hourly = Array.isArray(data?.hourlyData) ? data!.hourlyData : [];
  const rows = hourly.map((d: HourlyData) => ({ hour: formatHour(d.hour ?? 0), count: d.count || d.scans || 0 }));

  return (
    <ChartPanel
      title="Hours"
      description="Scans by hour of day"
      icon={Clock}
      empty={!loading && rows.length === 0}
      extra={
        data?.peakHour || data?.peakDay ? (
          <div className="text-right">
            <div className="text-[11px] text-muted-foreground">Peak</div>
            <div className="text-[13px] font-semibold text-foreground">{[data.peakDay, data.peakHour].filter(Boolean).join(' · ')}</div>
          </div>
        ) : null
      }
    >
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader size="sm" />
        </div>
      ) : (
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid {...GRID_PROPS} />
              <XAxis dataKey="hour" {...AXIS_PROPS} interval={2} />
              <YAxis {...AXIS_PROPS} allowDecimals={false} width={40} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'hsl(var(--foreground) / 0.05)' }} />
              <Bar dataKey="count" fill={PRIMARY_COLOR} radius={[3, 3, 0, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartPanel>
  );
};

export default PeakTimesAnalysis;
