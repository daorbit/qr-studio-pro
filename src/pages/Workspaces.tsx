import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import LogoLoader from '@/components/common/LogoLoader';
import StandaloneShell from '@/components/workspace/StandaloneShell';
import WorkspaceTile from '@/components/workspace/picker/WorkspaceTile';
import WorkspaceStep from '@/components/onboarding/WorkspaceStep';
import AuthHeader from '@/components/auth/AuthHeader';
import { useAppDispatch } from '@/store';
import { fetchWorkspaces } from '@/store/slices/workspaceSlice';
import { useAuth } from '@/hooks/useAuth';
import { useWorkspace } from '@/hooks/useWorkspace';

const Workspaces: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const { workspaces, workspace, loaded, switchWorkspace } = useWorkspace();
  const [creating, setCreating] = useState(params.get('new') === '1');

  const from = (location.state as { from?: string } | null)?.from;
  const target = from && from !== '/workspaces' ? from : '/dashboard';

  useEffect(() => {
    dispatch(fetchWorkspaces());
  }, [dispatch]);

  if (!loaded) return <LogoLoader fullScreen />;
  if (workspaces.length === 0) return <Navigate to="/onboarding" replace />;

  const pick = (id: string) => {
    switchWorkspace(id);
    navigate(target, { replace: true });
  };

  const closeCreate = () => {
    setCreating(false);
    if (params.has('new')) setParams({}, { replace: true });
  };

  if (creating) {
    return (
      <StandaloneShell>
        <SEOHead title="New workspace" description="Create a QR Studio workspace." path="/workspaces" noindex />
        <WorkspaceStep
          title="New workspace"
          subtitle="Keep clients, brands or teams apart. Each workspace has its own QR codes, members and plan."
          onDone={() => navigate('/dashboard', { replace: true })}
        />
        <button type="button" onClick={closeCreate} className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          Cancel
        </button>
      </StandaloneShell>
    );
  }

  return (
    <StandaloneShell>
      <SEOHead title="Choose a workspace" description="Pick a QR Studio workspace." path="/workspaces" noindex />
      <AuthHeader title="Choose a workspace" subtitle={user ? `Signed in as ${user.email}` : undefined} />

      <div className="space-y-2.5">
        {workspaces.map((w) => (
          <WorkspaceTile key={w._id} workspace={w} active={w._id === workspace?._id} onPick={pick} />
        ))}

        <button
          type="button"
          onClick={() => setCreating(true)}
          className="flex w-full items-center gap-4 rounded-2xl border border-dashed border-border p-4 text-left text-muted-foreground transition-colors hover:border-input hover:text-foreground"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <Plus size={20} />
          </span>
          <span className="text-[15px] font-semibold">New workspace</span>
        </button>
      </div>
    </StandaloneShell>
  );
};

export default Workspaces;
