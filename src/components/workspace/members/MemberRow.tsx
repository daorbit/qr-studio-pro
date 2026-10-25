import React from 'react';
import { Avatar, Button, Popconfirm, Select } from 'antd';
import { Trash2 } from 'lucide-react';
import type { WorkspaceMember, WorkspaceRole } from '@/types/workspace';
import { ROLE_LABELS, assignableRoles, canManageMember } from './roles';

interface MemberRowProps {
  member: WorkspaceMember;
  actorRole: WorkspaceRole | null;
  isSelf: boolean;
  onRoleChange: (userId: string, role: WorkspaceRole) => void;
  onRemove: (userId: string) => void;
}

const MemberRow: React.FC<MemberRowProps> = ({ member, actorRole, isSelf, onRoleChange, onRemove }) => {
  const manageable = !isSelf && canManageMember(actorRole, member.role);

  return (
    <div className="flex items-center gap-3 py-3">
      <Avatar size={36} src={member.profilePicture}>
        {member.name.charAt(0).toUpperCase()}
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground truncate">
          {member.name}
          {isSelf && <span className="ml-2 text-xs text-muted-foreground">You</span>}
        </div>
        <div className="text-xs text-muted-foreground truncate">{member.email}</div>
      </div>
      {manageable ? (
        <Select
          value={member.role}
          onChange={(role) => onRoleChange(member._id, role)}
          className="w-28"
          options={assignableRoles(actorRole).map((r) => ({ value: r, label: ROLE_LABELS[r] }))}
        />
      ) : (
        <span className="w-28 text-sm text-muted-foreground text-right pr-3">{ROLE_LABELS[member.role]}</span>
      )}
      {manageable ? (
        <Popconfirm
          title={`Remove ${member.name}?`}
          description="They lose access to this workspace right away."
          okText="Remove"
          okButtonProps={{ danger: true }}
          onConfirm={() => onRemove(member._id)}
        >
          <Button type="text" icon={<Trash2 size={16} />} aria-label={`Remove ${member.name}`} />
        </Popconfirm>
      ) : (
        <span className="w-8" />
      )}
    </div>
  );
};

export default MemberRow;
