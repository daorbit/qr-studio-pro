import React from 'react';
import { Badge } from '@mantine/core';
import { CalendarDays, Users } from 'lucide-react';
import type { Workspace } from '@/types/workspace';
import { useDateFormatter } from '@/hooks/useDateFormatter';
import WorkspaceMark from './WorkspaceMark';
import { planLabel } from './planLabel';
import { ROLE_LABELS } from './members/roles';

const WorkspaceHero: React.FC<{ workspace: Workspace }> = ({ workspace }) => {
  const formatter = useDateFormatter();

  return (
    <section className="create-stage flex flex-wrap items-center gap-5 overflow-hidden rounded-xl border border-border px-5 py-6 sm:px-7">
      <WorkspaceMark name={workspace.name} size="lg" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="truncate text-xl font-bold tracking-[-0.02em] text-foreground">{workspace.name}</h2>
          <Badge color="orange">{planLabel(workspace.plan)}</Badge>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Users size={13} />
            {workspace.memberCount} {workspace.memberCount === 1 ? 'member' : 'members'}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={13} />
            Created {formatter.format(workspace.createdAt, { dateStyle: 'medium' })}
          </span>
          <span>You are {ROLE_LABELS[workspace.role]}</span>
        </div>
      </div>
    </section>
  );
};

export default WorkspaceHero;
