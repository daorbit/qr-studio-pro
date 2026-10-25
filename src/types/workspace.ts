import type { WhiteLabelConfig } from '@/context/authTypes';
import type { Subscription } from '@/types/payment';

export type WorkspaceRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface WorkspacePlan {
  planType: Subscription['planType'];
  status: Subscription['status'];
  isTrial: boolean;
  trialEndDate: string | null;
  endDate: string | null;
  features: Subscription['features'];
}

export interface Workspace {
  _id: string;
  name: string;
  logo: string | null;
  color: string;
  owner: string;
  role: WorkspaceRole;
  memberCount: number;
  removeWatermark: boolean;
  watermarkText: string;
  whiteLabel: WhiteLabelConfig;
  plan: WorkspacePlan;
  createdAt: string;
}

export interface WorkspaceMember {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  role: WorkspaceRole;
  joinedAt: string;
}

export interface WorkspaceInvite {
  _id: string;
  email: string;
  role: Exclude<WorkspaceRole, 'owner'>;
  expiresAt: string;
  createdAt?: string;
}

export interface InvitePreview {
  workspaceName: string;
  workspaceLogo: string | null;
  inviterName: string;
  email: string;
  role: Exclude<WorkspaceRole, 'owner'>;
  expired: boolean;
}

export type WorkspaceUpdate = Partial<Pick<Workspace, 'name' | 'logo' | 'color' | 'removeWatermark' | 'watermarkText'>> & {
  whiteLabel?: Partial<WhiteLabelConfig>;
};
