import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { message } from '@/lib/notify';
import { authAPI } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useWorkspace } from '@/hooks/useWorkspace';
import { STEPS, STEP_INDEX } from '@/components/onboarding/onboardingSteps';
import type { DetailsValue } from '@/components/onboarding/DetailsStep';
import { suggestWorkspaceName } from '@/utils/workspaceName';

const PROGRESS_KEY = 'qc-onboarding';
const WORKSPACE_STEP = STEP_INDEX.workspace;
const REFERRAL_STEP = STEP_INDEX.referral;

interface Progress {
  wsId: string | null;
  wsName: string;
}

const readProgress = (): Progress | null => {
  try {
    const raw = sessionStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as Progress) : null;
  } catch {
    return null;
  }
};

const writeProgress = (progress: Progress | null) => {
  try {
    if (progress) sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    else sessionStorage.removeItem(PROGRESS_KEY);
  } catch {
    return;
  }
};

const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

export const useOnboardingFlow = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { user, updateUser } = useAuth();
  const { createWorkspace } = useWorkspace();

  const [restored] = useState(readProgress);
  const [details, setDetails] = useState<DetailsValue>({ name: user?.name ?? '', mobile: user?.mobile ?? '', country: user?.country ?? '' });
  const [wsName, setWsName] = useState(restored?.wsName || suggestWorkspaceName(user?.email, user?.name));
  const [wsId, setWsId] = useState<string | null>(restored?.wsId ?? null);
  const [useCases, setUseCases] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState<string | null>(null);
  const [referral, setReferral] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const requested = STEP_INDEX[params.get('step') ?? ''] ?? 0;
  const step = requested > WORKSPACE_STEP && !wsId ? WORKSPACE_STEP : requested;

  useEffect(() => {
    writeProgress({ wsId, wsName });
  }, [wsId, wsName]);

  const goTo = useCallback((index: number) => setParams({ step: STEPS[index].slug }, { replace: true }), [setParams]);

  const saveAnswers = useCallback(async () => {
    try {
      await authAPI.saveOnboarding({ useCases, teamSize, referralSources: referral });
    } catch {
      return;
    }
  }, [useCases, teamSize, referral]);

  const finish = useCallback((path: string) => {
    writeProgress(null);
    navigate(path, { replace: true });
  }, [navigate]);

  const submitDetails = async () => {
    const name = details.name.trim();
    if (!name) {
      message.error('Tell us your name');
      return;
    }
    setBusy(true);
    try {
      const response = await authAPI.updateProfile({ name, mobile: details.mobile.trim(), country: details.country.trim() });
      updateUser({ name: response.user?.name ?? name, mobile: details.mobile.trim(), country: details.country.trim() });
      goTo(WORKSPACE_STEP);
    } catch {
      message.error('Could not save your details');
    } finally {
      setBusy(false);
    }
  };

  const submitWorkspace = async () => {
    if (wsId) {
      goTo(WORKSPACE_STEP + 1);
      return;
    }
    if (!wsName.trim()) {
      message.error('Give your workspace a name');
      return;
    }
    setBusy(true);
    try {
      const created = await createWorkspace(wsName.trim());
      setWsId(created._id);
      goTo(WORKSPACE_STEP + 1);
    } catch (error) {
      message.error(typeof error === 'string' ? error : 'Could not create the workspace');
    } finally {
      setBusy(false);
    }
  };

  const submitReferral = async () => {
    setBusy(true);
    await saveAnswers();
    setBusy(false);
    goTo(REFERRAL_STEP + 1);
  };

  const skip = async () => {
    await saveAnswers();
    finish('/dashboard');
  };

  return {
    step,
    busy,
    user,
    hasRestoredProgress: Boolean(restored?.wsId),
    details,
    setDetails,
    wsName,
    setWsName,
    wsId,
    useCases,
    toggleUseCase: (value: string) => setUseCases((list) => toggle(list, value)),
    teamSize,
    setTeamSize,
    referral,
    toggleReferral: (value: string) => setReferral((list) => toggle(list, value)),
    goTo,
    submitDetails,
    submitWorkspace,
    submitReferral,
    skip,
    finish,
  };
};
