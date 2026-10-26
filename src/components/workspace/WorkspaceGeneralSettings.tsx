import React, { useEffect, useState } from 'react';
import { Button, TextInput } from '@mantine/core';
import { Building2 } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';
import { errorMessage, message } from '@/lib/notify';
import SettingsCard from '@/components/common/SettingsCard';

const WorkspaceGeneralSettings: React.FC = () => {
  const { workspace, canManage, updateWorkspace } = useWorkspace();
  const [name, setName] = useState(workspace?.name ?? '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(workspace?.name ?? '');
  }, [workspace?.name]);

  if (!workspace) return null;

  const dirty = Boolean(name.trim()) && name.trim() !== workspace.name;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dirty) return;
    setSaving(true);
    try {
      await updateWorkspace({ name: name.trim() });
      message.success('Workspace renamed');
    } catch (error) {
      message.error(errorMessage(error, 'Could not save'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsCard icon={Building2} title="General" description="The name everyone in this workspace sees.">
      <form onSubmit={save} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <TextInput
          label="Workspace name"
          value={name}
          maxLength={60}
          disabled={!canManage}
          onChange={(e) => setName(e.currentTarget.value)}
          className="flex-1"
        />
        {canManage && (
          <Button type="submit" disabled={!dirty} loading={saving}>
            Save
          </Button>
        )}
      </form>
    </SettingsCard>
  );
};

export default WorkspaceGeneralSettings;
