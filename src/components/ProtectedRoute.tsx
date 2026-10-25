import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LogoLoader from '@/components/common/LogoLoader';
import WorkspaceGate from './WorkspaceGate';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireWorkspace?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireWorkspace = true }) => {
  const { user, loading, initialized } = useAuth();
  const location = useLocation();

  if (loading || !initialized) {
    return <LogoLoader fullScreen />;
  }

  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/sign-in?next=${next}`} replace />;
  }

  return requireWorkspace ? <WorkspaceGate>{children}</WorkspaceGate> : <>{children}</>;
};

export default ProtectedRoute;
