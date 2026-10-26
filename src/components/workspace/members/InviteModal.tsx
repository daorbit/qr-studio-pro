import React, { useState } from 'react';
import { Button, Modal, TextInput } from '@mantine/core';
import { Check, Mail, UserPlus } from 'lucide-react';
import type { WorkspaceRole } from '@/types/workspace';
import { cn } from '@/lib/utils';
import { ROLE_DESCRIPTIONS, ROLE_LABELS, ROLE_META } from './roles';

type InvitableRole = Exclude<WorkspaceRole, 'owner'>;

interface InviteModalProps {
  opened: boolean;
  workspaceName: string;
  roles: InvitableRole[];
  onClose: () => void;
  onSend: (email: string, role: WorkspaceRole) => Promise<boolean>;
}

const InviteModal: React.FC<InviteModalProps> = ({ opened, workspaceName, roles, onClose, onSend }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<InvitableRole>('editor');
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    const ok = await onSend(email.trim(), role);
    setSending(false);
    if (ok) {
      setEmail('');
      setRole('editor');
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={`Invite to ${workspaceName}`} size={480}>
      <form onSubmit={submit} className="space-y-5">
        <TextInput
          label="Email address"
          placeholder="teammate@company.com"
          type="email"
          size="md"
          required
          leftSection={<Mail size={16} />}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          description="They'll get a link. If they don't have an account yet, they can create one from it."
        />

        <div>
          <p className="mb-2 text-xs font-semibold text-foreground">Role</p>
          <div role="radiogroup" aria-label="Role" className="space-y-2">
            {roles.map((r) => {
              const meta = ROLE_META[r];
              const active = r === role;
              return (
                <button
                  key={r}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setRole(r)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors',
                    active ? 'border-primary bg-primary/[0.06] ring-1 ring-primary' : 'border-border bg-card hover:border-input'
                  )}
                >
                  <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]', meta.tone)}>
                    <meta.icon size={15} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-medium text-foreground">{ROLE_LABELS[r]}</span>
                    <span className="block text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[r]}</span>
                  </span>
                  <span
                    className={cn(
                      'mt-1.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] text-primary-foreground',
                      active ? 'border-primary bg-primary' : 'border-input'
                    )}
                  >
                    {active && <Check size={11} strokeWidth={3.5} />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <Button variant="subtle" color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={sending} leftSection={<UserPlus size={15} />}>
            Send invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteModal;
