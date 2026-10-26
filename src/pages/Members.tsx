import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { UserPlus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import PageHeader from '@/components/layout/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { useWorkspace } from '@/hooks/useWorkspace';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';
import { message } from '@/lib/notify';
import type { WorkspaceRole } from '@/types/workspace';
import MembersOverview from '@/components/workspace/members/MembersOverview';
import MembersTable from '@/components/workspace/members/MembersTable';
import InviteModal from '@/components/workspace/members/InviteModal';
import InviteLinkModal from '@/components/workspace/members/InviteLinkModal';
import { assignableRoles } from '@/components/workspace/members/roles';

const Members: React.FC = () => {
  const { user } = useAuth();
  const { workspace, role, canManage } = useWorkspace();
  const { members, invites, loading, invite, changeRole, removeMember, revokeInvite } = useWorkspaceMembers();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [fallbackLink, setFallbackLink] = useState<{ link: string; email: string } | null>(null);

  if (!workspace) return null;

  const handleInvite = async (email: string, inviteRole: WorkspaceRole) => {
    const result = await invite(email, inviteRole);
    if (!result) return false;
    if (result.emailSent) message.success(`Invitation sent to ${email}`);
    else setFallbackLink({ link: result.inviteUrl, email });
    return true;
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Members"
        description={`Who can reach ${workspace.name}, and what they can do.`}
        actions={
          canManage && (
            <Button leftSection={<UserPlus size={15} />} onClick={() => setInviteOpen(true)}>
              Invite someone
            </Button>
          )
        }
      />

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-[104px] rounded-xl" />
          <Skeleton className="h-[260px] rounded-xl" />
        </div>
      ) : (
        <>
          <MembersOverview
            workspaceName={workspace.name}
            members={members}
            invites={invites}
            myRole={role}
            maxMembers={workspace.plan.features.maxMembers ?? 1}
          />
          <MembersTable
            members={members}
            invites={invites}
            selfId={user?._id}
            actorRole={role}
            canManage={canManage}
            onRoleChange={changeRole}
            onRemove={removeMember}
            onRevoke={revokeInvite}
            onInvite={() => setInviteOpen(true)}
          />
        </>
      )}

      <InviteModal
        opened={inviteOpen}
        workspaceName={workspace.name}
        roles={assignableRoles(role)}
        onClose={() => setInviteOpen(false)}
        onSend={handleInvite}
      />
      <InviteLinkModal link={fallbackLink?.link ?? null} email={fallbackLink?.email ?? ''} onClose={() => setFallbackLink(null)} />
    </div>
  );
};

export default Members;
