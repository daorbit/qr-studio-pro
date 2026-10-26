import React from 'react';
import { cn } from '@/lib/utils';

const QRStatusBadge: React.FC<{ active: boolean }> = ({ active }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium',
      active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-foreground/[0.06] text-muted-foreground'
    )}
  >
    <span className={cn('h-1.5 w-1.5 rounded-full', active ? 'bg-emerald-500' : 'bg-muted-foreground/60')} />
    {active ? 'Active' : 'Paused'}
  </span>
);

export default QRStatusBadge;
