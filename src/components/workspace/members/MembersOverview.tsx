import React from 'react';
import { Avatar } from '@mantine/core';
import type { WorkspaceInvite, WorkspaceMember, WorkspaceRole } from '@/types/workspace';
import { cn } from '@/lib/utils';
import { ROLE_LABELS, ROLE_META, ROLE_ORDER } from './roles';

const STACK_LIMIT = 4;

interface MembersOverviewProps {
  workspaceName: string;
  members: WorkspaceMember[];
  invites: WorkspaceInvite[];
  myRole: WorkspaceRole | null;
  maxMembers: number;
}

const MembersOverview: React.FC<MembersOverviewProps> = ({ workspaceName, members, invites, myRole, maxMembers }) => {
  const shown = members.slice(0, STACK_LIMIT);
  const extra = members.length - shown.length;
  const counts = ROLE_ORDER.map((role) => ({ role, count: members.filter((m) => m.role === role).length })).filter((r) => r.count > 0);
  const seats = maxMembers === -1 ? 'Unlimited seats' : `${members.length + invites.length} of ${maxMembers} seats used`;
  const mine = myRole ? ROLE_META[myRole] : null;

  return (
    <section className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-xl border border-border bg-card px-5 py-5 shadow-soft sm:px-7 sm:py-6">
      <div className="flex min-w-0 items-center gap-4">
        <Avatar.Group spacing={10}>
          {shown.map((m) => (
            <Avatar key={m._id} src={m.profilePicture} name={m.name} color="initials" radius="xl" size={42} className="border-2 border-card" />
          ))}
          {extra > 0 && (
            <Avatar radius="xl" size={42} className="border-2 border-card">
              +{extra}
            </Avatar>
          )}
        </Avatar.Group>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[30px] font-bold leading-none tracking-[-0.03em] text-foreground">{members.length}</span>
            <span className="text-sm font-medium text-foreground">{members.length === 1 ? 'person has access' : 'people have access'}</span>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {workspaceName} · {seats}
            {invites.length > 0 && ` · ${invites.length} pending`}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {counts.map(({ role, count }) => (
          <span key={role} className="inline-flex h-[30px] items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3 text-xs text-muted-foreground">
            <span className={cn('h-[7px] w-[7px] rounded-full', ROLE_META[role].dot)} />
            {ROLE_LABELS[role]}
            <span className="font-semibold tabular-nums text-foreground">{count}</span>
          </span>
        ))}
      </div>

      {mine && myRole && (
        <div className="flex w-full items-center gap-3 border-t border-border pt-4 md:w-auto md:border-l md:border-t-0 md:pl-7 md:pt-0">
          <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', mine.tone)}>
            <mine.icon size={18} />
          </span>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Your access</span>
            <p className="text-sm font-semibold text-foreground">{ROLE_LABELS[myRole]}</p>
            <p className="text-xs text-muted-foreground">{mine.short}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MembersOverview;
