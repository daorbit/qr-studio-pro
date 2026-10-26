import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsUpDown, LayoutGrid, LogOut, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import UserAvatar from './UserAvatar';
import ThemeModeSwitch from './ThemeModeSwitch';

interface AccountMenuProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ collapsed, onNavigate }) => {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const go = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex items-center gap-2.5 rounded-lg text-left transition-colors hover:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-foreground/[0.05]',
          collapsed ? 'h-10 w-10 justify-center' : 'w-full p-1.5'
        )}
        aria-label="Account menu"
      >
        <UserAvatar name={user.name} src={user.profilePicture} />
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold text-foreground">{user.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{user.email}</span>
            </span>
            <ChevronsUpDown size={14} className="shrink-0 text-muted-foreground" />
          </>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent side={collapsed ? 'right' : 'top'} align={collapsed ? 'end' : 'start'} sideOffset={8} className="w-64 rounded-xl p-1.5">
        <DropdownMenuLabel className="flex items-center gap-2.5 py-2 font-normal">
          <UserAvatar name={user.name} src={user.profilePicture} />
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-foreground">{user.name}</span>
            <span className="block truncate text-xs text-muted-foreground">{user.email}</span>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => go('/settings/profile')} className="gap-2.5 rounded-lg">
          <User size={15} />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => go('/workspace')} className="gap-2.5 rounded-lg">
          <Settings size={15} />
          Workspace settings
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => go('/workspaces')} className="gap-2.5 rounded-lg">
          <LayoutGrid size={15} />
          Switch workspace
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 pb-1.5 pt-1">
          <div className="mb-1.5 text-xs font-medium text-muted-foreground">Theme</div>
          <ThemeModeSwitch />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={signout} className="gap-2.5 rounded-lg">
          <LogOut size={15} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
