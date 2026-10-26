import React from 'react';
import { Input } from 'antd';
import WorkspaceMark from '@/components/workspace/WorkspaceMark';

interface WorkspaceNameStepProps {
  value: string;
  locked: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const WorkspaceNameStep: React.FC<WorkspaceNameStepProps> = ({ value, locked, onChange, onSubmit }) => (
  <div className="space-y-5">
    <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-card p-3.5">
      <WorkspaceMark name={value || 'Workspace'} />
      <div className="min-w-0">
        <div className="text-[15px] font-medium text-foreground truncate">{value || 'Your workspace'}</div>
        <div className="text-xs text-muted-foreground">{locked ? 'Created' : "You'll be the owner"}</div>
      </div>
      <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">Pro trial</span>
    </div>

    <div>
      <label htmlFor="onb-workspace" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
        Workspace name
      </label>
      <Input
        id="onb-workspace"
        autoFocus
        maxLength={60}
        placeholder="Acme Inc."
        value={value}
        disabled={locked}
        onChange={(e) => onChange(e.target.value)}
        onPressEnter={onSubmit}
      />
      <p className="mt-2 text-xs text-muted-foreground">You can rename it later and create more workspaces for other clients or brands.</p>
    </div>
  </div>
);

export default WorkspaceNameStep;
