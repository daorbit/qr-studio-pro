import React, { useState } from 'react';
import { Button, Modal, TextInput } from '@mantine/core';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { deleteWorkspace, fetchWorkspaces, leaveWorkspace } from '@/store/slices/workspaceSlice';
import { useWorkspace } from '@/hooks/useWorkspace';
import { confirmAction, errorMessage, message } from '@/lib/notify';
import SettingsCard from '@/components/common/SettingsCard';

const WorkspaceDangerZone: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { workspace, isOwner } = useWorkspace();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [busy, setBusy] = useState(false);

  if (!workspace) return null;

  const finish = async (action: typeof deleteWorkspace | typeof leaveWorkspace, done: string) => {
    setBusy(true);
    try {
      await dispatch(action()).unwrap();
      await dispatch(fetchWorkspaces());
      message.success(done);
      navigate('/workspaces', { replace: true });
    } catch (error) {
      message.error(errorMessage(error));
    } finally {
      setBusy(false);
      setConfirmOpen(false);
    }
  };

  const handleClick = () => {
    if (isOwner) {
      setTyped('');
      setConfirmOpen(true);
      return;
    }
    confirmAction({
      title: `Leave ${workspace.name}?`,
      body: 'You will lose access until someone invites you again.',
      confirmLabel: 'Leave',
      danger: true,
      onConfirm: () => finish(leaveWorkspace, 'You left the workspace'),
    });
  };

  return (
    <>
    <SettingsCard
      tone="danger"
      icon={AlertTriangle}
      title={isOwner ? 'Delete workspace' : 'Leave workspace'}
      description={
        isOwner
          ? 'Permanently deletes every QR code, scan and setting in this workspace.'
          : 'You will lose access until someone invites you again.'
      }
      action={
        <Button color="red" variant="light" onClick={handleClick}>
          {isOwner ? 'Delete' : 'Leave'}
        </Button>
      }
    />
      <Modal opened={confirmOpen} onClose={() => setConfirmOpen(false)} title={`Delete ${workspace.name}?`} size={440}>
        <p className="mb-3 text-sm text-muted-foreground">
          This can&apos;t be undone. Type <span className="font-semibold text-foreground">{workspace.name}</span> to confirm.
        </p>
        <TextInput value={typed} onChange={(e) => setTyped(e.currentTarget.value)} placeholder={workspace.name} aria-label="Workspace name" />
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="default" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button color="red" disabled={typed !== workspace.name} loading={busy} onClick={() => finish(deleteWorkspace, 'Workspace deleted')}>
            Delete forever
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default WorkspaceDangerZone;
