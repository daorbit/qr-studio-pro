import React, { useMemo } from 'react';
import { Tooltip } from '@mantine/core';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChartPanel from './chart/ChartPanel';

interface HeatmapByTimeProps {
  scans: Array<{ createdAt: string }>;
  mode: 'real' | 'demo';
  className?: string;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const LEVELS = ['bg-foreground/[0.05]', 'bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary/80', 'bg-primary'];

const formatHour = (hour: number) => `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? 'am' : 'pm'}`;

const demoGrid = () =>
  DAYS.map((_, day) =>
    HOURS.map((hour) => {
      let value = Math.random() * 20;
      if (day >= 1 && day <= 5) value += 15;
      if (hour >= 9 && hour <= 18) value += 25;
      if (hour >= 10 && hour <= 14) value += 20;
      return Math.floor(value);
    })
  );

const HeatmapByTime: React.FC<HeatmapByTimeProps> = ({ scans, mode, className }) => {
  const grid = useMemo(() => {
    if (mode === 'demo') return demoGrid();
    const next: number[][] = DAYS.map(() => Array(24).fill(0));
    scans.forEach((scan) => {
      const date = new Date(scan.createdAt);
      next[date.getDay()][date.getHours()]++;
    });
    return next;
  }, [scans, mode]);

  const max = Math.max(...grid.flat(), 1);
  const total = grid.flat().reduce((sum, v) => sum + v, 0);
  const peak = grid.reduce(
    (best, row, day) => row.reduce((b, value, hour) => (value > b.value ? { day, hour, value } : b), best),
    { day: 0, hour: 0, value: 0 }
  );
  const level = (value: number) => (value === 0 ? 0 : Math.ceil((value / max) * 5));

  return (
    <ChartPanel
      title="When people scan"
      description="Scans by hour and day, in your local time"
      icon={Clock}
      className={className}
      empty={total === 0}
      extra={
        peak.value > 0 ? (
          <div className="text-right">
            <div className="text-[11px] text-muted-foreground">Peak</div>
            <div className="text-[13px] font-semibold text-foreground">
              {DAYS[peak.day]} {formatHour(peak.hour)}
            </div>
          </div>
        ) : null
      }
    >
      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          <div className="mb-1 grid grid-cols-[36px_repeat(24,minmax(0,1fr))] gap-[3px]">
            <span />
            {HOURS.map((hour) => (
              <span key={hour} className="text-center text-[10px] text-muted-foreground">
                {hour % 3 === 0 ? formatHour(hour) : ''}
              </span>
            ))}
          </div>
          {DAYS.map((day, dayIndex) => (
            <div key={day} className="mb-[3px] grid grid-cols-[36px_repeat(24,minmax(0,1fr))] gap-[3px]">
              <span className="self-center text-[11px] font-medium text-muted-foreground">{day}</span>
              {HOURS.map((hour) => {
                const value = grid[dayIndex][hour];
                return (
                  <Tooltip key={hour} label={`${day} ${formatHour(hour)} · ${value} ${value === 1 ? 'scan' : 'scans'}`} openDelay={0}>
                    <span className={cn('h-6 rounded-[4px] transition-shadow hover:ring-2 hover:ring-primary/40', LEVELS[level(value)])} />
                  </Tooltip>
                );
              })}
            </div>
          ))}
          <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-muted-foreground">
            Fewer
            {LEVELS.map((cls) => (
              <span key={cls} className={cn('h-3 w-3 rounded-[3px]', cls)} />
            ))}
            More
          </div>
        </div>
      </div>
    </ChartPanel>
  );
};

export default HeatmapByTime;
