import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ADMIN_GROUP, NAV_GROUPS, findActivePath } from './navConfig';
import NavItemLink from './NavItemLink';

interface SidebarNavProps {
  collapsed: boolean;
  isAdmin: boolean;
  onNavigate?: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ collapsed, isAdmin, onNavigate }) => {
  const { pathname } = useLocation();
  const groups = useMemo(() => (isAdmin ? [...NAV_GROUPS, ADMIN_GROUP] : NAV_GROUPS), [isAdmin]);
  const activePath = findActivePath(groups, pathname);

  return (
    <nav className={cn('flex flex-col gap-5', collapsed && 'items-center gap-3')}>
      {groups.map((group, index) => (
        <div key={group.heading} className={cn('flex flex-col gap-0.5', collapsed && 'items-center')}>
          {collapsed ? (
            index > 0 && <span className="mb-2 h-px w-5 bg-border" />
          ) : (
            <div className="px-2 pb-1 text-xs font-medium text-muted-foreground">{group.heading}</div>
          )}
          {group.items.map((item) => (
            <NavItemLink key={item.to} item={item} active={activePath === item.to} collapsed={collapsed} onNavigate={onNavigate} />
          ))}
        </div>
      ))}
    </nav>
  );
};

export default SidebarNav;
