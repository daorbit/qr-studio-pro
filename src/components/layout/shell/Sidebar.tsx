import React from 'react';
import { PanelLeft } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import WorkspaceSwitcher from '@/components/workspace/WorkspaceSwitcher';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import SidebarNav from './SidebarNav';
import PlanUsageCard from './PlanUsageCard';
import AccountMenu from './AccountMenu';

interface SidebarProps {
  collapsed: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, onNavigate }) => {
  const { user } = useAuth();

  const toggle = onToggle && (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
        >
          <PanelLeft size={16} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{collapsed ? 'Expand' : 'Collapse'}</TooltipContent>
    </Tooltip>
  );

  return (
    <div className={cn('flex h-full flex-col py-3', collapsed ? 'items-center px-2' : 'px-3')}>
      <div className={cn('flex gap-1', collapsed ? 'flex-col items-center' : 'items-center')}>
        <div className={cn(!collapsed && 'min-w-0 flex-1')}>
          <WorkspaceSwitcher collapsed={collapsed} onNavigate={onNavigate} />
        </div>
        {toggle}
      </div>

      <div className="mt-4 flex-1 overflow-y-auto scrollbar-hide">
        <SidebarNav collapsed={collapsed} isAdmin={Boolean(user?.isAdmin)} onNavigate={onNavigate} />
      </div>

      <div className={cn('mt-3 flex flex-col gap-2', collapsed && 'items-center')}>
        {!collapsed && <PlanUsageCard onNavigate={onNavigate} />}
        <AccountMenu collapsed={collapsed} onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default Sidebar;
