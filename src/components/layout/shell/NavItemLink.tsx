import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { NavItem } from './navConfig';

interface NavItemLinkProps {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
}

const NavItemLink: React.FC<NavItemLinkProps> = ({ item, active, collapsed, onNavigate }) => {
  const { to, label, icon: Icon } = item;

  const link = (
    <Link
      to={to}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      aria-label={collapsed ? label : undefined}
      className={cn(
        'group flex items-center gap-2.5 rounded-lg text-[13px] transition-colors duration-100',
        collapsed ? 'h-9 w-9 justify-center' : 'h-8 px-2',
        active ? 'bg-foreground/[0.08] font-semibold text-foreground' : 'font-medium text-foreground/80 hover:bg-foreground/[0.05] hover:text-foreground'
      )}
    >
      <Icon
        size={collapsed ? 18 : 16}
        className={cn('shrink-0 transition-colors', active ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground')}
      />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
};

export default NavItemLink;
