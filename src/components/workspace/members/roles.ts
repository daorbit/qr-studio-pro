import type { WorkspaceRole } from '@/types/workspace';

export const ROLE_LABELS: Record<WorkspaceRole, string> = {
  owner: 'Owner',
  admin: 'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
};

export const ROLE_DESCRIPTIONS: Record<Exclude<WorkspaceRole, 'owner'>, string> = {
  admin: 'Manage members, billing and branding',
  editor: 'Create, edit and delete QR codes',
  viewer: 'View QR codes and analytics',
};

export const assignableRoles = (actorRole: WorkspaceRole | null): Exclude<WorkspaceRole, 'owner'>[] =>
  actorRole === 'owner' ? ['admin', 'editor', 'viewer'] : ['editor', 'viewer'];

export const canManageMember = (actorRole: WorkspaceRole | null, targetRole: WorkspaceRole) =>
  targetRole !== 'owner' && (actorRole === 'owner' || (actorRole === 'admin' && targetRole !== 'admin'));
