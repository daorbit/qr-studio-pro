import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import ChartTooltip from './ChartTooltip';
import { SURFACE_COLOR, foldSlices, formatNumber, type Slice } from './chartTheme';

interface DonutBreakdownProps {
  data: Slice[];
  centerLabel?: string;
  unit?: string;
}

const DonutBreakdown: React.FC<DonutBreakdownProps> = ({ data, centerLabel = 'Total', unit = 'scans' }) => {
  const slices = foldSlices(data);
  const total = slices.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row lg:flex-col xl:flex-row">
      <div className="relative h-40 w-40 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={slices} dataKey="value" nameKey="name" innerRadius="68%" outerRadius="100%" stroke={SURFACE_COLOR} strokeWidth={2} isAnimationActive={false}>
              {slices.map((s) => (
                <Cell key={s.name} fill={s.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip unit={unit} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold tracking-[-0.02em] text-foreground">{formatNumber(total)}</span>
          <span className="text-[11px] text-muted-foreground">{centerLabel}</span>
        </div>
      </div>

      <ul className="w-full min-w-0 space-y-2">
        {slices.map((s) => (
          <li key={s.name} className="flex items-center gap-2 text-[13px]">
            <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ backgroundColor: s.color }} />
            <span className="min-w-0 flex-1 truncate capitalize text-foreground">{s.name}</span>
            <span className="tabular-nums text-muted-foreground">{total ? Math.round((s.value / total) * 100) : 0}%</span>
            <span className="w-10 text-right font-medium tabular-nums text-foreground">{formatNumber(s.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonutBreakdown;
