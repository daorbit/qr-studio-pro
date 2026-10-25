import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { UserPlus } from 'lucide-react';
import type { WorkspaceRole } from '@/types/workspace';
import { ROLE_DESCRIPTIONS, ROLE_LABELS, assignableRoles } from './roles';

interface InviteFormProps {
  actorRole: WorkspaceRole | null;
  onInvite: (email: string, role: WorkspaceRole) => Promise<boolean>;
}

const InviteForm: React.FC<InviteFormProps> = ({ actorRole, onInvite }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<WorkspaceRole>('editor');
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    const ok = await onInvite(email.trim(), role);
    setSending(false);
    if (ok) setEmail('');
  };

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
      <Input
        type="email"
        size="large"
        placeholder="teammate@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
      />
      <Select
        size="large"
        value={role}
        onChange={setRole}
        className="sm:w-40"
        popupMatchSelectWidth={260}
        options={assignableRoles(actorRole).map((r) => ({
          value: r,
          label: ROLE_LABELS[r],
          title: ROLE_DESCRIPTIONS[r],
        }))}
        optionRender={(option) => (
          <div className="py-0.5">
            <div className="text-sm font-medium">{option.label}</div>
            <div className="text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[option.value as keyof typeof ROLE_DESCRIPTIONS]}</div>
          </div>
        )}
      />
      <Button type="primary" size="large" htmlType="submit" loading={sending} icon={<UserPlus size={16} />}>
        Invite
      </Button>
    </form>
  );
};

export default InviteForm;
