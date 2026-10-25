import React, { useState } from 'react';
import { Button, Input, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { deleteWorkspace, fetchWorkspaces, leaveWorkspace } from '@/store/slices/workspaceSlice';
import { useWorkspace } from '@/hooks/useWorkspace';

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
      message.error(typeof error === 'string' ? error : 'Something went wrong');
    } finally {
      setBusy(false);
      setConfirmOpen(false);
    }
  };

  return (
    <div className="rounded-xl border border-destructive/30 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-foreground">{isOwner ? 'Delete workspace' : 'Leave workspace'}</div>
          <div className="text-sm text-muted-foreground mt-0.5">
            {isOwner
              ? 'Permanently deletes every QR code, scan and setting in this workspace.'
              : 'You will lose access until someone invites you again.'}
          </div>
        </div>
        <Button danger onClick={() => (isOwner ? setConfirmOpen(true) : finish(leaveWorkspace, 'You left the workspace'))} loading={busy && !isOwner}>
          {isOwner ? 'Delete workspace' : 'Leave'}
        </Button>
      </div>

      <Modal
        open={confirmOpen}
        title={`Delete ${workspace.name}?`}
        okText="Delete forever"
        okButtonProps={{ danger: true, disabled: typed !== workspace.name, loading: busy }}
        onOk={() => finish(deleteWorkspace, 'Workspace deleted')}
        onCancel={() => setConfirmOpen(false)}
        centered
      >
        <p className="text-sm text-muted-foreground mb-3">
          This can&apos;t be undone. Type <span className="font-semibold text-foreground">{workspace.name}</span> to confirm.
        </p>
        <Input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={workspace.name} />
      </Modal>
    </div>
  );
};

export default WorkspaceDangerZone;
