import React from 'react';
import { ActionIcon, Avatar, Menu, Select } from '@mantine/core';
import { MoreHorizontal, UserMinus } from 'lucide-react';
import type { WorkspaceMember, WorkspaceRole } from '@/types/workspace';
import { useDateFormatter } from '@/hooks/useDateFormatter';
import { confirmAction } from '@/lib/notify';
import { ROLE_LABELS, assignableRoles, canManageMember } from './roles';
import { MEMBER_GRID } from './memberGrid';

interface MemberRowProps {
  member: WorkspaceMember;
  actorRole: WorkspaceRole | null;
  isSelf: boolean;
  onRoleChange: (userId: string, role: WorkspaceRole) => void;
  onRemove: (userId: string) => void;
}

const MemberRow: React.FC<MemberRowProps> = ({ member, actorRole, isSelf, onRoleChange, onRemove }) => {
  const formatter = useDateFormatter();
  const manageable = !isSelf && canManageMember(actorRole, member.role);

  return (
    <div className={MEMBER_GRID}>
      <div className="flex min-w-0 items-center gap-3">
        <Avatar src={member.profilePicture} name={member.name} color="initials" radius="xl" size={34} />
        <div className="min-w-0">
          <div className="truncate text-[13px] font-medium text-foreground">
            {member.name}
            {isSelf && <span className="ml-1.5 font-normal text-muted-foreground">(you)</span>}
          </div>
          <div className="truncate text-xs text-muted-foreground">{member.email}</div>
        </div>
      </div>

      <div>
        {manageable ? (
          <Select
            size="xs"
            variant="unstyled"
            value={member.role}
            onChange={(role) => role && onRoleChange(member._id, role as WorkspaceRole)}
            data={assignableRoles(actorRole).map((r) => ({ value: r, label: ROLE_LABELS[r] }))}
            allowDeselect={false}
            aria-label={`Role for ${member.name}`}
            classNames={{ input: 'rounded-md pl-2.5 hover:bg-foreground/[0.05]' }}
          />
        ) : (
          <span className="pl-2.5 text-[12.5px] text-muted-foreground">{ROLE_LABELS[member.role]}</span>
        )}
      </div>

      <span className="hidden text-xs tabular-nums text-muted-foreground md:block">{formatter.format(member.joinedAt, { dateStyle: 'medium' })}</span>

      <div className="flex justify-end">
        {manageable && (
          <Menu position="bottom-end">
            <Menu.Target>
              <ActionIcon aria-label={`Actions for ${member.name}`}>
                <MoreHorizontal size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                color="red"
                leftSection={<UserMinus size={14} />}
                onClick={() =>
                  confirmAction({
                    title: `Remove ${member.name}?`,
                    body: 'They lose access to this workspace right away.',
                    confirmLabel: 'Remove',
                    danger: true,
                    onConfirm: () => onRemove(member._id),
                  })
                }
              >
                Remove from workspace
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default MemberRow;
