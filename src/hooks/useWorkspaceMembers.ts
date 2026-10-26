import { useCallback, useEffect, useState } from 'react';
import { message } from '@/lib/notify';
import { workspaceAPI } from '@/lib/workspaceApi';
import { useWorkspace } from '@/hooks/useWorkspace';
import type { WorkspaceInvite, WorkspaceMember, WorkspaceRole } from '@/types/workspace';

const errorText = (error: unknown, fallback: string) =>
  (error as { response?: { data?: { message?: string } } })?.response?.data?.message || fallback;

export const useWorkspaceMembers = () => {
  const { workspace, reloadWorkspaces } = useWorkspace();
  const workspaceId = workspace?._id;
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [invites, setInvites] = useState<WorkspaceInvite[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    try {
      const data = await workspaceAPI.members();
      setMembers(data.members);
      setInvites(data.invites);
    } catch (error) {
      message.error(errorText(error, 'Could not load members'));
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    load();
  }, [load]);

  const invite = useCallback(async (email: string, role: WorkspaceRole) => {
    try {
      const result = await workspaceAPI.invite(email, role);
      setInvites((prev) => [result.invite, ...prev.filter((i) => i.email !== result.invite.email)]);
      return result;
    } catch (error) {
      message.error(errorText(error, 'Could not send the invitation'));
      return null;
    }
  }, []);

  const changeRole = useCallback(async (userId: string, role: WorkspaceRole) => {
    try {
      await workspaceAPI.updateMemberRole(userId, role);
      setMembers((prev) => prev.map((m) => (m._id === userId ? { ...m, role } : m)));
      message.success('Role updated');
    } catch (error) {
      message.error(errorText(error, 'Could not change the role'));
    }
  }, []);

  const removeMember = useCallback(async (userId: string) => {
    try {
      await workspaceAPI.removeMember(userId);
      setMembers((prev) => prev.filter((m) => m._id !== userId));
      reloadWorkspaces();
      message.success('Member removed');
    } catch (error) {
      message.error(errorText(error, 'Could not remove the member'));
    }
  }, [reloadWorkspaces]);

  const revokeInvite = useCallback(async (inviteId: string) => {
    try {
      await workspaceAPI.revokeInvite(inviteId);
      setInvites((prev) => prev.filter((i) => i._id !== inviteId));
      message.success('Invitation revoked');
    } catch (error) {
      message.error(errorText(error, 'Could not revoke the invitation'));
    }
  }, []);

  return { members, invites, loading, reload: load, invite, changeRole, removeMember, revokeInvite };
};
