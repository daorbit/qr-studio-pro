import React, { useState } from 'react';
import { Card, Skeleton, message } from 'antd';
import { Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useWorkspace } from '@/hooks/useWorkspace';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';
import type { WorkspaceRole } from '@/types/workspace';
import InviteForm from './InviteForm';
import InviteLinkModal from './InviteLinkModal';
import MemberRow from './MemberRow';
import InviteRow from './InviteRow';

const MembersPanel: React.FC = () => {
  const { user } = useAuth();
  const { workspace, role, canManage } = useWorkspace();
  const { members, invites, loading, invite, changeRole, removeMember, revokeInvite } = useWorkspaceMembers();
  const [fallbackLink, setFallbackLink] = useState<{ link: string; email: string } | null>(null);

  const maxMembers = workspace?.plan.features.maxMembers ?? 1;
  const seatsUsed = members.length + invites.length;
  const limitLabel = maxMembers === -1 ? 'Unlimited seats' : `${seatsUsed} of ${maxMembers} seats used`;

  const handleInvite = async (email: string, inviteRole: WorkspaceRole) => {
    const result = await invite(email, inviteRole);
    if (!result) return false;
    if (result.emailSent) message.success(`Invitation sent to ${email}`);
    else setFallbackLink({ link: result.inviteUrl, email });
    return true;
  };

  return (
    <Card className="shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Users size={18} />
            Members
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            People in {workspace?.name} share its QR codes, analytics and plan.
          </p>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground rounded-full border border-border px-2.5 py-1">{limitLabel}</span>
      </div>

      {canManage && (
        <div className="mb-6">
          <InviteForm actorRole={role} onInvite={handleInvite} />
        </div>
      )}

      {loading ? (
        <Skeleton active avatar paragraph={{ rows: 2 }} />
      ) : (
        <div className="divide-y divide-border">
          {members.map((member) => (
            <MemberRow
              key={member._id}
              member={member}
              actorRole={role}
              isSelf={member._id === user?._id}
              onRoleChange={changeRole}
              onRemove={removeMember}
            />
          ))}
        </div>
      )}

      {canManage && invites.length > 0 && (
        <div className="mt-6">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">Pending invitations</div>
          <div className="divide-y divide-border">
            {invites.map((pending) => (
              <InviteRow key={pending._id} invite={pending} onRevoke={revokeInvite} />
            ))}
          </div>
        </div>
      )}

      <InviteLinkModal link={fallbackLink?.link ?? null} email={fallbackLink?.email ?? ''} onClose={() => setFallbackLink(null)} />
    </Card>
  );
};

export default MembersPanel;
