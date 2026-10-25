import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import LogoLoader from '@/components/common/LogoLoader';
import StandaloneShell from '@/components/workspace/StandaloneShell';
import Stepper from '@/components/onboarding/Stepper';
import ProfileStep from '@/components/onboarding/ProfileStep';
import WorkspaceStep from '@/components/onboarding/WorkspaceStep';
import AppearanceStep from '@/components/onboarding/AppearanceStep';
import { useAppDispatch } from '@/store';
import { fetchWorkspaces } from '@/store/slices/workspaceSlice';
import { useWorkspace } from '@/hooks/useWorkspace';

const STEPS = ['Profile', 'Workspace', 'Appearance'];

const Onboarding: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { workspaces, loaded } = useWorkspace();
  const [step, setStep] = useState(0);
  const hadWorkspaceOnEntry = useRef<boolean | null>(null);

  useEffect(() => {
    if (!loaded) dispatch(fetchWorkspaces());
  }, [dispatch, loaded]);

  if (!loaded) return <LogoLoader fullScreen />;

  if (hadWorkspaceOnEntry.current === null) hadWorkspaceOnEntry.current = workspaces.length > 0;
  if (hadWorkspaceOnEntry.current) return <Navigate to="/dashboard" replace />;

  return (
    <StandaloneShell>
      <SEOHead title="Get started" description="Set up your QR Studio workspace." path="/onboarding" noindex />
      <Stepper steps={STEPS} current={step} />
      {step === 0 && <ProfileStep onDone={() => setStep(1)} />}
      {step === 1 && <WorkspaceStep onDone={() => setStep(2)} />}
      {step === 2 && <AppearanceStep onDone={() => navigate('/dashboard', { replace: true })} />}
    </StandaloneShell>
  );
};

export default Onboarding;
