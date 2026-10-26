import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CalendarRange } from 'lucide-react';
import type { WeeklyData } from '@/types/analytics';
import ChartPanel from './chart/ChartPanel';
import ChartTooltip from './chart/ChartTooltip';
import { AXIS_PROPS, GRID_PROPS, PRIMARY_COLOR } from './chart/chartTheme';

const WeekdayChart: React.FC<{ weeklyData: WeeklyData[] }> = ({ weeklyData }) => (
  <ChartPanel title="By weekday" description="Scans per day of the week" icon={CalendarRange} empty={!weeklyData.some((d) => d.scans > 0)}>
    <div className="h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyData} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid {...GRID_PROPS} />
          <XAxis dataKey="day" {...AXIS_PROPS} />
          <YAxis {...AXIS_PROPS} allowDecimals={false} width={40} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'hsl(var(--foreground) / 0.05)' }} />
          <Bar dataKey="scans" fill={PRIMARY_COLOR} radius={[4, 4, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </ChartPanel>
);

export default WeekdayChart;
