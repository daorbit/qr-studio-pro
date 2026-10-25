import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  createWorkspace,
  fetchWorkspaces,
  selectActiveWorkspace,
  selectWorkspaces,
  selectWorkspacesLoaded,
  updateWorkspace,
  workspaceSwitched,
} from '@/store/slices/workspaceSlice';
import type { WorkspaceRole, WorkspaceUpdate } from '@/types/workspace';

const EDIT_ROLES: WorkspaceRole[] = ['owner', 'admin', 'editor'];
const MANAGE_ROLES: WorkspaceRole[] = ['owner', 'admin'];

export const useWorkspace = () => {
  const dispatch = useAppDispatch();
  const workspaces = useAppSelector(selectWorkspaces);
  const workspace = useAppSelector(selectActiveWorkspace);
  const loaded = useAppSelector(selectWorkspacesLoaded);

  const switchWorkspace = useCallback(
    (id: string) => {
      if (id !== workspace?._id) dispatch(workspaceSwitched(id));
    },
    [dispatch, workspace?._id]
  );

  const create = useCallback(async (name: string) => {
    const created = await dispatch(createWorkspace(name)).unwrap();
    dispatch(workspaceSwitched(created._id));
    return created;
  }, [dispatch]);

  const update = useCallback((data: WorkspaceUpdate) => dispatch(updateWorkspace(data)).unwrap(), [dispatch]);

  const reload = useCallback(() => dispatch(fetchWorkspaces()).unwrap(), [dispatch]);

  const role = workspace?.role ?? null;

  return useMemo(() => ({
    workspaces,
    workspace,
    loaded,
    role,
    canEdit: role ? EDIT_ROLES.includes(role) : false,
    canManage: role ? MANAGE_ROLES.includes(role) : false,
    isOwner: role === 'owner',
    switchWorkspace,
    createWorkspace: create,
    updateWorkspace: update,
    reloadWorkspaces: reload,
  }), [workspaces, workspace, loaded, role, switchWorkspace, create, update, reload]);
};
