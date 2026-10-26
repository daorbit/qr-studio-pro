import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';
import { Navigate } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import LogoLoader from '@/components/common/LogoLoader';
import OnboardingBar from '@/components/onboarding/OnboardingBar';
import StepFooter from '@/components/onboarding/StepFooter';
import DetailsStep from '@/components/onboarding/DetailsStep';
import WorkspaceNameStep from '@/components/onboarding/WorkspaceNameStep';
import ChoiceGrid from '@/components/onboarding/ChoiceGrid';
import AppearanceStep from '@/components/onboarding/AppearanceStep';
import ReadyStep from '@/components/onboarding/ReadyStep';
import { REFERRAL_SOURCES, STEPS, STEP_INDEX, TEAM_SIZES, USE_CASES } from '@/components/onboarding/onboardingSteps';
import { useAppDispatch } from '@/store';
import { fetchWorkspaces } from '@/store/slices/workspaceSlice';
import { useWorkspace } from '@/hooks/useWorkspace';
import { useOnboardingFlow } from '@/hooks/useOnboardingFlow';
import '@/styles/auth.css';

const Onboarding: React.FC = () => {
  const dispatch = useAppDispatch();
  const { workspaces, loaded } = useWorkspace();
  const flow = useOnboardingFlow();
  const alreadySetUp = useRef<boolean | null>(null);

  useEffect(() => {
    if (!loaded) dispatch(fetchWorkspaces());
  }, [dispatch, loaded]);

  if (!loaded) return <LogoLoader fullScreen />;

  if (alreadySetUp.current === null) alreadySetUp.current = workspaces.length > 0 && !flow.hasRestoredProgress;
  if (alreadySetUp.current) return <Navigate to="/dashboard" replace />;

  const { step } = flow;
  const meta = STEPS[step];
  const back = step > 0 && step !== STEP_INDEX.ready ? () => flow.goTo(step - 1) : undefined;
  const canSkip = step > STEP_INDEX.workspace && step < STEP_INDEX.ready;
  const next = (index: number) => () => flow.goTo(index);

  return (
    <div className="flex h-[100dvh] flex-col bg-background">
      <SEOHead title="Set up" description="Set up your QR Studio workspace." path="/onboarding" noindex />
      <OnboardingBar steps={STEPS} current={step} onBack={back} onSkip={canSkip ? flow.skip : undefined} />

      <main className="flex-1 overflow-y-auto">
        <div className="auth-form mx-auto w-full max-w-[540px] px-5 sm:px-6 py-10 sm:py-16">
          <h1 className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground text-balance">
            {meta.title}
          </h1>
          <p className="mt-3 max-w-[44ch] text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">{meta.lede}</p>

          <div className="mt-9">
            {step === STEP_INDEX.details && (
              <DetailsStep value={flow.details} email={flow.user?.email} picture={flow.user?.profilePicture} onChange={flow.setDetails} />
            )}
            {step === STEP_INDEX.workspace && (
              <WorkspaceNameStep value={flow.wsName} locked={Boolean(flow.wsId)} onChange={flow.setWsName} onSubmit={flow.submitWorkspace} />
            )}
            {step === STEP_INDEX.use && <ChoiceGrid options={USE_CASES} selected={flow.useCases} onToggle={flow.toggleUseCase} />}
            {step === STEP_INDEX.team && (
              <ChoiceGrid
                options={TEAM_SIZES}
                selected={flow.teamSize ? [flow.teamSize] : []}
                onToggle={flow.setTeamSize}
                columns={1}
              />
            )}
            {step === STEP_INDEX.appearance && <AppearanceStep />}
            {step === STEP_INDEX.referral && (
              <ChoiceGrid options={REFERRAL_SOURCES} selected={flow.referral} onToggle={flow.toggleReferral} />
            )}
            {step === STEP_INDEX.ready && <ReadyStep workspaceName={flow.wsName} />}
          </div>

          {step === STEP_INDEX.details && <StepFooter onNext={flow.submitDetails} loading={flow.busy} />}
          {step === STEP_INDEX.workspace && (
            <StepFooter onBack={back} onNext={flow.submitWorkspace} loading={flow.busy} nextLabel={flow.wsId ? 'Continue' : 'Create workspace'} />
          )}
          {step === STEP_INDEX.use && <StepFooter onBack={back} onNext={next(STEP_INDEX.team)} disabled={!flow.useCases.length} />}
          {step === STEP_INDEX.team && <StepFooter onBack={back} onNext={next(STEP_INDEX.appearance)} disabled={!flow.teamSize} />}
          {step === STEP_INDEX.appearance && <StepFooter onBack={back} onNext={next(STEP_INDEX.referral)} />}
          {step === STEP_INDEX.referral && (
            <StepFooter onBack={back} onNext={flow.submitReferral} loading={flow.busy} nextLabel={flow.referral.length ? 'Continue' : 'Skip'} />
          )}
          {step === STEP_INDEX.ready && (
            <StepFooter
              onNext={() => flow.finish('/create')}
              nextLabel="Create a QR code"
              secondary={
                <Button type="text" onClick={() => flow.finish('/dashboard')} className="max-sm:!hidden">
                  Go to dashboard
                </Button>
              }
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
