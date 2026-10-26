import React from 'react';
import { Avatar, Badge, UnstyledButton } from '@mantine/core';
import { useDateFormatter } from '@/hooks/useDateFormatter';
import type { AdminUser, AdminUserRow } from '@/store/slices/adminSlice';
import UserPlanBadges from './UserPlanBadges';
import AdminUserActions from './AdminUserActions';

interface AdminUserCardProps {
  record: AdminUserRow;
  onAvatarClick: (profilePicture: string | undefined, userName: string | undefined) => void;
  onManagePlan: (user: AdminUser) => void;
  onToggleBlock: (userId: string, blocked: boolean) => void;
  onDelete: (userId: string) => Promise<void>;
}

const AdminUserCard: React.FC<AdminUserCardProps> = ({ record, onAvatarClick, onManagePlan, onToggleBlock, onDelete }) => {
  const formatter = useDateFormatter();
  const { user } = record;

  return (
    <div className="mb-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <UnstyledButton onClick={() => onAvatarClick(user?.profilePicture, user?.name)} aria-label="View profile picture">
          <Avatar size={48} src={user?.profilePicture} name={user?.name} color="initials" />
        </UnstyledButton>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-foreground">{user?.name ?? user?.email ?? '—'}</div>
          <div className="truncate text-xs text-muted-foreground">{user?.email}</div>
          <div className="mt-2 flex flex-wrap items-center gap-1">
            <Badge color="gray">{record.qrcodes?.length ?? 0} QRs</Badge>
            <UserPlanBadges user={user} />
            {user?.blocked ? <Badge color="red">Blocked</Badge> : <Badge color="gray">Active</Badge>}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">{formatter.dateTime(user?.createdAt)}</div>
        </div>
      </div>
      <div className="mt-3 border-t border-border pt-3">
        <AdminUserActions user={user} size="xs" onManagePlan={onManagePlan} onToggleBlock={onToggleBlock} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default AdminUserCard;
