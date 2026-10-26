import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronsUpDown, LayoutGrid, Plus, Settings, UserPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWorkspace } from '@/hooks/useWorkspace';
import WorkspaceMark from './WorkspaceMark';
import { planLabel } from './planLabel';
import { cn } from '@/lib/utils';

interface WorkspaceSwitcherProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({ collapsed = false, onNavigate }) => {
  const navigate = useNavigate();
  const { workspaces, workspace, canManage, switchWorkspace } = useWorkspace();

  const go = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  const pick = (id: string) => {
    switchWorkspace(id);
    go('/dashboard');
  };

  if (!workspace) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Switch workspace"
        className={cn(
          'flex items-center gap-2.5 rounded-lg text-left transition-colors hover:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-foreground/[0.05]',
          collapsed ? 'h-10 w-10 justify-center' : 'w-full p-1.5'
        )}
      >
        <img src="/logo.png" alt="QR Studio" className={cn('shrink-0 object-contain', collapsed ? 'h-7 w-7' : 'h-9 w-9')} />
        {!collapsed && (
          <>
            <span className="flex-1 min-w-0">
              <span className="block text-[13px] font-semibold text-foreground truncate">{workspace.name}</span>
              <span className="block text-xs text-muted-foreground truncate">{planLabel(workspace.plan)}</span>
            </span>
            <ChevronsUpDown size={14} className="shrink-0 text-muted-foreground" />
          </>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent side={collapsed ? 'right' : 'bottom'} align="start" sideOffset={6} className="w-64 rounded-xl p-1.5">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Workspaces</DropdownMenuLabel>
        {workspaces.map((w) => (
          <DropdownMenuItem key={w._id} onSelect={() => pick(w._id)} className="gap-2.5 rounded-lg py-2">
            <WorkspaceMark name={w.name} size="sm" />
            <span className="flex-1 min-w-0 truncate">{w.name}</span>
            {w._id === workspace._id && <Check size={16} className="text-primary" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => go('/workspaces?new=1')} className="gap-2.5 rounded-lg">
          <Plus size={16} />
          New workspace
        </DropdownMenuItem>
        {canManage && (
          <DropdownMenuItem onSelect={() => go('/members')} className="gap-2.5 rounded-lg">
            <UserPlus size={16} />
            Invite members
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={() => go('/workspace')} className="gap-2.5 rounded-lg">
          <Settings size={16} />
          Workspace settings
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => go('/workspaces')} className="gap-2.5 rounded-lg">
          <LayoutGrid size={16} />
          All workspaces
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
