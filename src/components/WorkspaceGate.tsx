import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { fetchWorkspaces } from '@/store/slices/workspaceSlice';
import { useWorkspace } from '@/hooks/useWorkspace';
import LogoLoader from '@/components/common/LogoLoader';

const WorkspaceGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { workspaces, workspace, loaded, switchWorkspace } = useWorkspace();

  useEffect(() => {
    if (!loaded) dispatch(fetchWorkspaces());
  }, [dispatch, loaded]);

  const onlyWorkspace = loaded && !workspace && workspaces.length === 1 ? workspaces[0]._id : null;

  useEffect(() => {
    if (onlyWorkspace) switchWorkspace(onlyWorkspace);
  }, [onlyWorkspace, switchWorkspace]);

  if (!loaded || onlyWorkspace) return <LogoLoader fullScreen />;
  if (workspaces.length === 0) return <Navigate to="/onboarding" replace />;
  if (!workspace) return <Navigate to="/workspaces" replace state={{ from: location.pathname }} />;

  return <>{children}</>;
};

export default WorkspaceGate;
