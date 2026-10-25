import api from './api';
import type {
  InvitePreview,
  Workspace,
  WorkspaceInvite,
  WorkspaceMember,
  WorkspaceRole,
  WorkspaceUpdate,
} from '@/types/workspace';

export const workspaceAPI = {
  list: async (): Promise<Workspace[]> => {
    const response = await api.get('/workspaces');
    return response.data.workspaces;
  },

  create: async (name: string): Promise<Workspace> => {
    const response = await api.post('/workspaces', { name });
    return response.data.workspace;
  },

  update: async (data: WorkspaceUpdate): Promise<Workspace> => {
    const response = await api.patch('/workspaces/current', data);
    return response.data.workspace;
  },

  remove: async (): Promise<void> => {
    await api.delete('/workspaces/current');
  },

  leave: async (): Promise<void> => {
    await api.post('/workspaces/current/leave');
  },

  members: async (): Promise<{ members: WorkspaceMember[]; invites: WorkspaceInvite[] }> => {
    const response = await api.get('/workspaces/current/members');
    return response.data;
  },

  updateMemberRole: async (userId: string, role: WorkspaceRole): Promise<void> => {
    await api.patch(`/workspaces/current/members/${userId}`, { role });
  },

  removeMember: async (userId: string): Promise<void> => {
    await api.delete(`/workspaces/current/members/${userId}`);
  },

  invite: async (email: string, role: WorkspaceRole): Promise<{ invite: WorkspaceInvite; inviteUrl: string; emailSent: boolean }> => {
    const response = await api.post('/workspaces/current/invites', { email, role });
    return response.data;
  },

  revokeInvite: async (inviteId: string): Promise<void> => {
    await api.delete(`/workspaces/current/invites/${inviteId}`);
  },

  previewInvite: async (token: string): Promise<InvitePreview> => {
    const response = await api.get(`/workspaces/invites/${token}`);
    return response.data;
  },

  acceptInvite: async (token: string): Promise<{ workspaceId: string; message: string }> => {
    const response = await api.post(`/workspaces/invites/${token}/accept`);
    return response.data;
  },
};
