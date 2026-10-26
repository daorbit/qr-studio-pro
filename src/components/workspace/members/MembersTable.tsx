import React, { useState } from 'react';
import { Button, SegmentedControl, TextInput } from '@mantine/core';
import { Search, UserPlus } from 'lucide-react';
import type { WorkspaceInvite, WorkspaceMember, WorkspaceRole } from '@/types/workspace';
import MemberRow from './MemberRow';
import InviteRow from './InviteRow';
import { MEMBER_GRID } from './memberGrid';

type View = 'members' | 'invites';

interface MembersTableProps {
  members: WorkspaceMember[];
  invites: WorkspaceInvite[];
  selfId?: string;
  actorRole: WorkspaceRole | null;
  canManage: boolean;
  onRoleChange: (userId: string, role: WorkspaceRole) => void;
  onRemove: (userId: string) => void;
  onRevoke: (inviteId: string) => void;
  onInvite: () => void;
}

const matches = (query: string, ...fields: string[]) => {
  const q = query.trim().toLowerCase();
  return !q || fields.some((f) => f.toLowerCase().includes(q));
};

const MembersTable: React.FC<MembersTableProps> = ({ members, invites, selfId, actorRole, canManage, onRoleChange, onRemove, onRevoke, onInvite }) => {
  const [view, setView] = useState<View>('members');
  const [query, setQuery] = useState('');

  const shownMembers = members.filter((m) => matches(query, m.name, m.email));
  const shownInvites = invites.filter((i) => matches(query, i.email));
  const rows = view === 'members' ? shownMembers.length : shownInvites.length;
  const solo = view === 'members' && members.length === 1 && invites.length === 0 && canManage && !query;

  return (
    <>
      <div className="mb-3.5 mt-8 flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl
          value={view}
          onChange={(v) => setView(v as View)}
          data={[
            { value: 'members', label: `Members · ${members.length}` },
            { value: 'invites', label: `Invitations · ${invites.length}` },
          ]}
        />
        <TextInput
          placeholder={view === 'members' ? 'Search by name or email' : 'Search by email'}
          leftSection={<Search size={15} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          className="w-full sm:w-72"
          aria-label="Search members"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
        <div className={`${MEMBER_GRID} border-b border-border py-2.5 text-xs font-medium text-muted-foreground`}>
          <span>{view === 'members' ? 'Member' : 'Email'}</span>
          <span>Role</span>
          <span className="hidden md:block">{view === 'members' ? 'Joined' : 'Status'}</span>
          <span />
        </div>

        <div className="divide-y divide-border">
          {view === 'members'
            ? shownMembers.map((m) => (
                <MemberRow key={m._id} member={m} actorRole={actorRole} isSelf={m._id === selfId} onRoleChange={onRoleChange} onRemove={onRemove} />
              ))
            : shownInvites.map((inv) => <InviteRow key={inv._id} invite={inv} canRevoke={canManage} onRevoke={onRevoke} />)}
        </div>

        {rows === 0 && (
          <div className="px-5 py-9 text-center text-[12.5px] text-muted-foreground">
            {query ? 'No one matches that search.' : view === 'invites' ? 'No pending invitations.' : 'No members yet.'}
          </div>
        )}

        {solo && (
          <div className="flex items-center justify-between gap-3 border-t border-border bg-foreground/[0.02] px-5 py-3.5 text-xs text-muted-foreground">
            <span>You&apos;re the only one here. Invite teammates to share this workspace.</span>
            <Button size="xs" variant="light" leftSection={<UserPlus size={14} />} onClick={onInvite}>
              Invite
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MembersTable;
