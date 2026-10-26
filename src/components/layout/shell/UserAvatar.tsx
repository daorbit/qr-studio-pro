import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string;
  src?: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, src, className }) => (
  <Avatar className={cn('h-8 w-8 shrink-0 rounded-full', className)}>
    {src && <AvatarImage src={src} alt="" />}
    <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
      {name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() || 'U'}
    </AvatarFallback>
  </Avatar>
);

export default UserAvatar;
