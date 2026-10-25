import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import type { Workspace } from '@/types/workspace';
import { cn } from '@/lib/utils';
import WorkspaceMark from '../WorkspaceMark';
import { planLabel } from '../planLabel';
import { ROLE_LABELS } from '../members/roles';

interface WorkspaceTileProps {
  workspace: Workspace;
  active: boolean;
  onPick: (id: string) => void;
}

const WorkspaceTile: React.FC<WorkspaceTileProps> = ({ workspace, active, onPick }) => (
  <button
    type="button"
    onClick={() => onPick(workspace._id)}
    className={cn(
      'group flex w-full items-center gap-4 rounded-2xl border bg-card p-4 text-left transition-colors',
      active ? 'border-primary/50' : 'border-border hover:border-input'
    )}
  >
    <WorkspaceMark name={workspace.name} size="lg" />
    <span className="flex-1 min-w-0">
      <span className="block text-[15px] font-semibold text-foreground truncate">{workspace.name}</span>
      <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
        <span>{planLabel(workspace.plan)}</span>
        <span className="h-1 w-1 rounded-full bg-border" />
        <span>{ROLE_LABELS[workspace.role]}</span>
        <span className="h-1 w-1 rounded-full bg-border" />
        <span className="inline-flex items-center gap-1">
          <Users size={12} />
          {workspace.memberCount}
        </span>
      </span>
    </span>
    <ArrowRight size={18} className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
  </button>
);

export default WorkspaceTile;
