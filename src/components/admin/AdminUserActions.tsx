import React from 'react';
import { Button, Group, type MantineSize } from '@mantine/core';
import { CreditCard } from 'lucide-react';
import { confirmAction } from '@/lib/notify';
import type { AdminUser } from '@/store/slices/adminSlice';

interface AdminUserActionsProps {
  user: AdminUser;
  size?: MantineSize;
  onManagePlan: (user: AdminUser) => void;
  onToggleBlock: (userId: string, blocked: boolean) => void;
  onDelete: (userId: string) => Promise<void>;
}

const AdminUserActions: React.FC<AdminUserActionsProps> = ({ user, size = 'sm', onManagePlan, onToggleBlock, onDelete }) => {
  const blocked = user.blocked ?? false;

  const handleDelete = () =>
    confirmAction({
      title: 'Delete user',
      body: 'Are you sure you want to delete this user? This will delete their QR codes.',
      danger: true,
      onConfirm: () => onDelete(user._id),
    });

  return (
    <Group gap="xs" wrap="nowrap">
      <Button size={size} variant="default" leftSection={<CreditCard size={14} />} onClick={() => onManagePlan(user)}>
        Plan
      </Button>
      {blocked ? (
        <Button size={size} variant="outline" color="red" onClick={() => onToggleBlock(user._id, blocked)}>
          Unblock
        </Button>
      ) : (
        <Button size={size} onClick={() => onToggleBlock(user._id, blocked)}>
          Block
        </Button>
      )}
      <Button size={size} variant="outline" color="red" onClick={handleDelete}>
        Delete
      </Button>
    </Group>
  );
};

export default AdminUserActions;
