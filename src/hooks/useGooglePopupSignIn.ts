import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNextPath } from '@/lib/authRedirect';
import { message } from '@/lib/notify';
import { authAPI } from '@/lib/api';
import { GOOGLE_CLIENT_ID, GsiButtonOptions, loadGoogleIdentity } from '@/lib/googleIdentity';
import { useAppDispatch } from '@/store';
import { googleSignIn } from '@/store/slices/authSlice';

const errorMessage = (err: unknown) => {
  const data = (err as { response?: { data?: { message?: string } } })?.response?.data;
  return data?.message || 'Google sign-in failed. Please try again.';
};

export const useGooglePopupSignIn = (text: GsiButtonOptions['text']) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const holder = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const measure = () => setWidth(Math.round(el.getBoundingClientRect().width));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCredential = useCallback(
    async ({ credential }: { credential: string }) => {
      setBusy(true);
      try {
        const { token } = await authAPI.googleCredential(credential);
        await dispatch(googleSignIn({ token })).unwrap();
        window.google?.accounts.id.cancel();
        navigate(getNextPath(search));
      } catch (err) {
        message.error(errorMessage(err));
      } finally {
        setBusy(false);
      }
    },
    [dispatch, navigate, search]
  );

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !width) return;

    loadGoogleIdentity(() => {
      if (!window.google || !holder.current) return;
      holder.current.innerHTML = '';
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredential,
        use_fedcm_for_prompt: true,
        itp_support: true,
      });
      window.google.accounts.id.renderButton(holder.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text,
        shape: 'rectangular',
        logo_alignment: 'center',
        width,
      });
    });
  }, [handleCredential, text, width]);

  useEffect(() => () => window.google?.accounts.id.cancel(), []);

  return { holder, busy };
};
