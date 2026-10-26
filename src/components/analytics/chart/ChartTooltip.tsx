import React from 'react';
import { formatNumber } from './chartTheme';

interface ChartTooltipProps {
  active?: boolean;
  label?: React.ReactNode;
  payload?: { value?: number; name?: string; color?: string; payload?: { color?: string; name?: string } }[];
  unit?: string;
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, label, payload, unit = 'scans' }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const swatch = item.payload?.color ?? item.color;
  const heading = label ?? item.payload?.name ?? item.name;

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-float">
      {heading !== undefined && <div className="text-[11px] font-medium text-muted-foreground">{heading}</div>}
      <div className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
        {swatch && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: swatch }} />}
        {formatNumber(Number(item.value ?? 0))}
        <span className="font-normal text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
};

export default ChartTooltip;
