export const SERIES_COLORS = ['var(--viz-1)', 'var(--viz-2)', 'var(--viz-3)', 'var(--viz-4)', 'var(--viz-5)'];
export const OTHER_COLOR = 'var(--viz-other)';
export const PRIMARY_COLOR = 'hsl(var(--primary))';
export const SURFACE_COLOR = 'hsl(var(--card))';

export const AXIS_PROPS = {
  stroke: 'hsl(var(--muted-foreground))',
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;

export const GRID_PROPS = {
  stroke: 'hsl(var(--border))',
  vertical: false,
} as const;

export interface Slice {
  name: string;
  value: number;
}

export const foldSlices = (slices: Slice[], max = SERIES_COLORS.length): (Slice & { color: string })[] => {
  const sorted = [...slices].filter((s) => s.value > 0).sort((a, b) => b.value - a.value);
  const head = sorted.slice(0, sorted.length > max ? max - 1 : max).map((s, i) => ({ ...s, color: SERIES_COLORS[i] }));
  if (sorted.length <= max) return head;
  const rest = sorted.slice(max - 1).reduce((sum, s) => sum + s.value, 0);
  return [...head, { name: 'Other', value: rest, color: OTHER_COLOR }];
};

export const formatNumber = (value: number) => value.toLocaleString();
