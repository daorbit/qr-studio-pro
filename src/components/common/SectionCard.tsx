import React from 'react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, extra, children, className, bodyClassName }) => (
  <section className={cn('rounded-2xl border border-border bg-card', className)}>
    {(title || extra) && (
      <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          {title && <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">{title}</h3>}
          {description && <p className="mt-0.5 text-[13px] text-muted-foreground">{description}</p>}
        </div>
        {extra && <div className="flex shrink-0 items-center gap-2">{extra}</div>}
      </header>
    )}
    <div className={cn('p-5', bodyClassName)}>{children}</div>
  </section>
);

export default SectionCard;
