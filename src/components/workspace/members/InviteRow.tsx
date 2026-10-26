import React from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { Mail, X } from 'lucide-react';
import type { WorkspaceInvite } from '@/types/workspace';
import { confirmAction } from '@/lib/notify';
import { ROLE_LABELS } from './roles';
import { MEMBER_GRID } from './memberGrid';

interface InviteRowProps {
  invite: WorkspaceInvite;
  canRevoke: boolean;
  onRevoke: (inviteId: string) => void;
}

const daysLeft = (iso: string) => Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000));

const InviteRow: React.FC<InviteRowProps> = ({ invite, canRevoke, onRevoke }) => (
  <div className={MEMBER_GRID}>
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-dashed border-input text-muted-foreground">
        <Mail size={15} />
      </span>
      <div className="min-w-0">
        <div className="truncate text-[13px] font-medium text-foreground">{invite.email}</div>
        <div className="text-xs text-muted-foreground">Expires in {daysLeft(invite.expiresAt)} days</div>
      </div>
    </div>
    <span className="pl-2.5 text-[12.5px] text-muted-foreground">{ROLE_LABELS[invite.role]}</span>
    <span className="hidden text-xs text-muted-foreground md:block">Pending</span>
    <div className="flex justify-end">
      {canRevoke && (
        <Tooltip label="Withdraw invitation">
          <ActionIcon
            aria-label={`Withdraw invitation for ${invite.email}`}
            onClick={() =>
              confirmAction({
                title: 'Withdraw this invitation?',
                body: `${invite.email} won't be able to use the link anymore.`,
                confirmLabel: 'Withdraw',
                danger: true,
                onConfirm: () => onRevoke(invite._id),
              })
            }
          >
            <X size={16} />
          </ActionIcon>
        </Tooltip>
      )}
    </div>
  </div>
);

export default InviteRow;
