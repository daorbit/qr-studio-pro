import React from 'react';
import { Avatar, Button, Popconfirm } from 'antd';
import { Mail, X } from 'lucide-react';
import type { WorkspaceInvite } from '@/types/workspace';
import { ROLE_LABELS } from './roles';

interface InviteRowProps {
  invite: WorkspaceInvite;
  onRevoke: (inviteId: string) => void;
}

const daysLeft = (iso: string) => Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000));

const InviteRow: React.FC<InviteRowProps> = ({ invite, onRevoke }) => (
  <div className="flex items-center gap-3 py-3">
    <Avatar size={36} icon={<Mail size={16} />} className="bg-muted text-muted-foreground" />
    <div className="flex-1 min-w-0">
      <div className="text-sm font-medium text-foreground truncate">{invite.email}</div>
      <div className="text-xs text-muted-foreground">
        Invited as {ROLE_LABELS[invite.role]} · expires in {daysLeft(invite.expiresAt)} days
      </div>
    </div>
    <Popconfirm title="Revoke this invitation?" okText="Revoke" okButtonProps={{ danger: true }} onConfirm={() => onRevoke(invite._id)}>
      <Button type="text" icon={<X size={16} />} aria-label={`Revoke invite for ${invite.email}`} />
    </Popconfirm>
  </div>
);

export default InviteRow;
