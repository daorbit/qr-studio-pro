import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { useAuth } from '@/hooks/useAuth';
import { useWorkspace } from '@/hooks/useWorkspace';
import AuthHeader from '@/components/auth/AuthHeader';
import WorkspaceMark from '@/components/workspace/WorkspaceMark';
import { suggestWorkspaceName } from '@/utils/workspaceName';

interface WorkspaceStepProps {
  onDone: () => void;
  title?: string;
  subtitle?: string;
  cta?: string;
}

const WorkspaceStep: React.FC<WorkspaceStepProps> = ({
  onDone,
  title = 'Create your workspace',
  subtitle = 'A workspace holds your QR codes, analytics and plan. Invite your team to it later.',
  cta = 'Create workspace',
}) => {
  const { user } = useAuth();
  const { createWorkspace } = useWorkspace();
  const [name, setName] = useState(() => suggestWorkspaceName(user?.email, user?.name));
  const [creating, setCreating] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      message.error('Give your workspace a name');
      return;
    }

    setCreating(true);
    try {
      await createWorkspace(name.trim());
      onDone();
    } catch (error) {
      message.error(typeof error === 'string' ? error : 'Could not create the workspace');
    } finally {
      setCreating(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <AuthHeader title={title} subtitle={subtitle} />
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
        <WorkspaceMark name={name || 'Workspace'} />
        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground truncate">{name || 'Your workspace'}</div>
          <div className="text-xs text-muted-foreground">You&apos;ll be the owner</div>
        </div>
      </div>
      <div>
        <label htmlFor="onb-workspace" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
          Workspace name
        </label>
        <Input id="onb-workspace" autoFocus maxLength={60} placeholder="Acme Inc." value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <Button type="primary" htmlType="submit" loading={creating} block>
        {cta}
      </Button>
    </form>
  );
};

export default WorkspaceStep;
