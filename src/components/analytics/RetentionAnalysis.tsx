import React from 'react';
import { Loader } from '@mantine/core';
import { Repeat } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { RetentionData } from '@/types/analytics';
import ChartPanel from './chart/ChartPanel';
import ChartTooltip from './chart/ChartTooltip';
import { AXIS_PROPS, GRID_PROPS, SERIES_COLORS, formatNumber } from './chart/chartTheme';

interface RetentionProps {
  data?: RetentionData;
  loading?: boolean;
  qrCodeId?: string;
}

const RetentionAnalysis: React.FC<RetentionProps> = ({ data, loading }) => {
  const total = data?.totalScans || 0;
  const newScans = data?.newScans || 0;
  const returning = data?.returningScans || 0;
  const newShare = total ? (newScans / total) * 100 : 0;
  const metrics = [
    { label: 'Unique people', value: formatNumber(data?.uniqueScanners || 0) },
    { label: 'New', value: formatNumber(newScans) },
    { label: 'Returning', value: formatNumber(returning) },
    { label: 'Repeat rate', value: `${Number(data?.repeatRate || 0).toFixed(1)}%` },
  ];

  return (
    <ChartPanel title="Returning visitors" description="New versus repeat scanners" icon={Repeat} empty={!loading && !data}>
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader size="sm" />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-card px-3 py-2.5">
                <div className="text-[11px] text-muted-foreground">{m.label}</div>
                <div className="mt-0.5 text-lg font-bold tracking-[-0.02em] text-foreground">{m.value}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-[2px]" style={{ backgroundColor: SERIES_COLORS[0] }} />
                New {Math.round(newShare)}%
              </span>
              <span className="flex items-center gap-1.5">
                Returning {Math.round(100 - newShare)}%
                <span className="h-2 w-2 rounded-[2px]" style={{ backgroundColor: SERIES_COLORS[1] }} />
              </span>
            </div>
            <div className="flex h-2 gap-0.5 overflow-hidden rounded-full">
              <div className="rounded-full" style={{ width: `${newShare}%`, backgroundColor: SERIES_COLORS[0] }} />
              <div className="flex-1 rounded-full" style={{ backgroundColor: SERIES_COLORS[1] }} />
            </div>
          </div>

          {data?.dailyRetention && data.dailyRetention.length > 0 && (
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.dailyRetention} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid {...GRID_PROPS} />
                  <XAxis dataKey="date" {...AXIS_PROPS} minTickGap={20} />
                  <YAxis {...AXIS_PROPS} allowDecimals={false} width={40} />
                  <Tooltip content={<ChartTooltip unit="people" />} />
                  <Line type="monotone" dataKey="uniqueUsers" stroke={SERIES_COLORS[0]} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </ChartPanel>
  );
};

export default RetentionAnalysis;
