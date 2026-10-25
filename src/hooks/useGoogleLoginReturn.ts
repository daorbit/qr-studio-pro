import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { message } from 'antd';
import { useAppDispatch } from '@/store';
import { googleSignIn } from '@/store/slices/authSlice';

const ERROR_MESSAGES: Record<string, string> = {
  not_configured: 'Google sign-in is not configured yet.',
  blocked: 'Account is blocked, contact support.',
  no_email: 'Google did not share a verified email address.',
  invalid_state: 'The Google sign-in link expired. Please try again.',
};

/**
 * Finishes Google sign-in when the backend redirects back with ?googleLogin=...
 * @returns whether the returned token is still being exchanged for the user
 */
export const useGoogleLoginReturn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [processing, setProcessing] = useState(false);
  const handled = useRef(false);

  useEffect(() => {
    const status = searchParams.get('googleLogin');
    if (!status || handled.current) return;
    handled.current = true;

    const token = searchParams.get('token');
    const reason = searchParams.get('reason') || '';
    setSearchParams({}, { replace: true });

    if ((status === 'ok' || status === 'created') && token) {
      setProcessing(true);
      dispatch(googleSignIn({ token }))
        .unwrap()
        .then(() => navigate('/dashboard'))
        .catch(() => undefined)
        .finally(() => setProcessing(false));
      return;
    }

    if (status === 'cancelled') {
      message.info('Google sign-in was cancelled');
      return;
    }

    message.error(ERROR_MESSAGES[reason] || 'Google sign-in failed. Please try again.');
  }, [searchParams, setSearchParams, dispatch, navigate]);

  return processing;
};
