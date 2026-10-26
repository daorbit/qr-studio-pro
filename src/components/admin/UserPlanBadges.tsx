import React from 'react';
import { Badge, Group } from '@mantine/core';
import type { AdminUser } from '@/store/slices/adminSlice';
import { planColor } from './adminColors';

interface UserPlanBadgesProps {
  user?: AdminUser | null;
}

const UserPlanBadges: React.FC<UserPlanBadgesProps> = ({ user }) => {
  const plan = user?.subscriptionPlan || 'free';

  if (plan === 'trial') return <Badge color={planColor('trial')}>Trial</Badge>;

  return (
    <Group gap={4}>
      <Badge color={planColor(plan)} tt="capitalize">{plan}</Badge>
      {user?.isOnTrial && <Badge color={planColor('trial')}>Trial</Badge>}
    </Group>
  );
};

export default UserPlanBadges;
