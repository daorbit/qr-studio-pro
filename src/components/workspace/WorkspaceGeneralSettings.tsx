import React, { useEffect, useState } from 'react';
import { Button, Card, Input, message } from 'antd';
import { Building2 } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';
import { useSubscription } from '@/context/SubscriptionContext';
import WorkspaceMark from './WorkspaceMark';
import WorkspaceDangerZone from './WorkspaceDangerZone';
import { ROLE_LABELS } from './members/roles';

const WorkspaceGeneralSettings: React.FC = () => {
  const { workspace, role, canManage, updateWorkspace } = useWorkspace();
  const { getPlanDisplayName } = useSubscription();
  const [name, setName] = useState(workspace?.name ?? '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(workspace?.name ?? '');
  }, [workspace?.name]);

  if (!workspace) return null;

  const dirty = name.trim() && name.trim() !== workspace.name;

  const save = async () => {
    setSaving(true);
    try {
      await updateWorkspace({ name: name.trim() });
      message.success('Workspace renamed');
    } catch (error) {
      message.error(typeof error === 'string' ? error : 'Could not save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
        <Building2 size={18} />
        Workspace
      </h3>

      <div className="flex items-center gap-4 mb-6">
        <WorkspaceMark name={workspace.name} size="lg" />
        <div className="min-w-0">
          <div className="text-lg font-semibold text-foreground truncate">{workspace.name}</div>
          <div className="text-sm text-muted-foreground">
            {getPlanDisplayName()} plan · {workspace.memberCount} member{workspace.memberCount === 1 ? '' : 's'} · You are {role ? ROLE_LABELS[role] : ''}
          </div>
        </div>
      </div>

      <label className="block text-sm font-medium text-foreground mb-2">Workspace name</label>
      <div className="flex gap-2 mb-8">
        <Input size="large" value={name} maxLength={60} disabled={!canManage} onChange={(e) => setName(e.target.value)} />
        {canManage && (
          <Button type="primary" size="large" disabled={!dirty} loading={saving} onClick={save}>
            Save
          </Button>
        )}
      </div>

      <WorkspaceDangerZone />
    </Card>
  );
};

export default WorkspaceGeneralSettings;
