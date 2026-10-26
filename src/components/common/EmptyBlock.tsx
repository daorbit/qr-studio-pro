import React from 'react';
import { Inbox, type LucideIcon } from 'lucide-react';

interface EmptyBlockProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

const EmptyBlock: React.FC<EmptyBlockProps> = ({ title, description, icon: Icon = Inbox, action }) => (
  <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
      <Icon size={20} />
    </span>
    <div className="mt-4 text-[15px] font-semibold text-foreground">{title}</div>
    {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyBlock;
