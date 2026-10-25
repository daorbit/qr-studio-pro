import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, message } from 'antd';
import SEOHead from '@/components/SEOHead';
import LogoLoader from '@/components/common/LogoLoader';
import StandaloneShell from '@/components/workspace/StandaloneShell';
import WorkspaceMark from '@/components/workspace/WorkspaceMark';
import AuthHeader from '@/components/auth/AuthHeader';
import { ROLE_LABELS } from '@/components/workspace/members/roles';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';
import { fetchWorkspaces, workspaceSwitched } from '@/store/slices/workspaceSlice';
import { workspaceAPI } from '@/lib/workspaceApi';
import type { InvitePreview } from '@/types/workspace';

const errorText = (error: unknown, fallback: string) =>
  (error as { response?: { data?: { message?: string } } })?.response?.data?.message || fallback;

const AcceptInvite: React.FC = () => {
  const { token = '' } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, initialized } = useAuth();
  const [preview, setPreview] = useState<InvitePreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    workspaceAPI
      .previewInvite(token)
      .then(setPreview)
      .catch((err) => setError(errorText(err, 'This invitation is invalid or was already used.')));
  }, [token]);

  const accept = async () => {
    setAccepting(true);
    try {
      const result = await workspaceAPI.acceptInvite(token);
      await dispatch(fetchWorkspaces());
      dispatch(workspaceSwitched(result.workspaceId));
      message.success(result.message);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      message.error(errorText(err, 'Could not accept the invitation'));
    } finally {
      setAccepting(false);
    }
  };

  if (!initialized || (!preview && !error)) return <LogoLoader fullScreen />;

  const next = encodeURIComponent(`/invite/${token}`);

  return (
    <StandaloneShell>
      <SEOHead title="Join workspace" description="Accept your QR Studio workspace invitation." path="/invite" noindex />

      {error || !preview ? (
        <div className="text-center">
          <AuthHeader title="Invitation unavailable" subtitle={error ?? undefined} />
          <Link to="/sign-in" className="text-sm font-medium text-primary hover:underline underline-offset-4">
            Go to sign in
          </Link>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex justify-center">
            <WorkspaceMark name={preview.workspaceName} size="lg" />
          </div>
          <AuthHeader
            title={`Join ${preview.workspaceName}`}
            subtitle={`${preview.inviterName} invited you as ${ROLE_LABELS[preview.role].toLowerCase()}.`}
          />

          {preview.expired ? (
            <p className="text-center text-sm text-muted-foreground">This invitation has expired. Ask {preview.inviterName} to send a new one.</p>
          ) : user ? (
            <div className="space-y-3">
              {user.email.toLowerCase() !== preview.email && (
                <p className="rounded-xl border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
                  This invite was sent to <span className="font-medium text-foreground">{preview.email}</span>, but you&apos;re signed in as{' '}
                  <span className="font-medium text-foreground">{user.email}</span>.
                </p>
              )}
              <Button type="primary" block loading={accepting} onClick={accept} disabled={user.email.toLowerCase() !== preview.email}>
                Accept invitation
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button type="primary" block onClick={() => navigate(`/sign-in?next=${next}`)}>
                Sign in to accept
              </Button>
              <Button block onClick={() => navigate(`/signup?next=${next}`)}>
                Create an account
              </Button>
              <p className="pt-1 text-center text-xs text-muted-foreground">Use {preview.email} so the invite matches.</p>
            </div>
          )}
        </div>
      )}
    </StandaloneShell>
  );
};

export default AcceptInvite;
