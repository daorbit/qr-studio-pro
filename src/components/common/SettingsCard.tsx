import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: LucideIcon;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  flush?: boolean;
  tone?: 'default' | 'danger';
  className?: string;
  children?: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, description, icon: Icon, badge, action, flush, tone = 'default', className, children }) => (
  <section
    className={cn(
      'overflow-hidden rounded-xl border bg-card shadow-soft',
      tone === 'danger' ? 'border-destructive/30' : 'border-border',
      className
    )}
  >
    <header className={cn('flex items-start gap-4 px-5 py-4', children && 'border-b border-border', !children && 'items-center')}>
      {Icon && (
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border',
            tone === 'danger' ? 'border-destructive/25 bg-destructive/10 text-destructive' : 'border-primary/25 bg-primary/10 text-primary'
          )}
        >
          <Icon size={17} />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {badge}
        </div>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
    {children && <div className={flush ? '' : 'p-5'}>{children}</div>}
  </section>
);

export default SettingsCard;
