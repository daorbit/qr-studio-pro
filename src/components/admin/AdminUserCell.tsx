import React from 'react';
import { Avatar } from '@mantine/core';
import type { AdminUser } from '@/store/slices/adminSlice';

interface AdminUserCellProps {
  user?: AdminUser | null;
}

const AdminUserCell: React.FC<AdminUserCellProps> = ({ user }) => (
  <div className="flex min-w-0 items-center gap-3">
    <Avatar src={user?.profilePicture} name={user?.name} color="initials" size="sm" />
    <div className="min-w-0">
      <div className="truncate text-sm font-medium text-foreground">{user?.name || 'Unknown'}</div>
      <div className="truncate text-xs text-muted-foreground">{user?.email}</div>
    </div>
  </div>
);

export default AdminUserCell;
