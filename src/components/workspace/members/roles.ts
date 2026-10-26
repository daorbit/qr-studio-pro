import { Eye, Pencil, Shield, Star, type LucideIcon } from 'lucide-react';
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

export const ROLE_META: Record<WorkspaceRole, { icon: LucideIcon; short: string; tone: string; dot: string }> = {
  owner: { icon: Star, short: 'Full control, including deleting the workspace', tone: 'text-violet-500 bg-violet-500/10', dot: 'bg-violet-500' },
  admin: { icon: Shield, short: 'Manages people, billing and branding', tone: 'text-indigo-500 bg-indigo-500/10', dot: 'bg-indigo-500' },
  editor: { icon: Pencil, short: 'Creates and edits QR codes', tone: 'text-sky-500 bg-sky-500/10', dot: 'bg-sky-500' },
  viewer: { icon: Eye, short: 'Read-only access', tone: 'text-muted-foreground bg-foreground/[0.06]', dot: 'bg-muted-foreground' },
};

export const ROLE_ORDER: WorkspaceRole[] = ['owner', 'admin', 'editor', 'viewer'];

export const assignableRoles = (actorRole: WorkspaceRole | null): Exclude<WorkspaceRole, 'owner'>[] =>
  actorRole === 'owner' ? ['admin', 'editor', 'viewer'] : ['editor', 'viewer'];

export const canManageMember = (actorRole: WorkspaceRole | null, targetRole: WorkspaceRole) =>
  targetRole !== 'owner' && (actorRole === 'owner' || (actorRole === 'admin' && targetRole !== 'admin'));
