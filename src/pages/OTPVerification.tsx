import React, { useState, useEffect } from 'react';
import { Button, message, Input } from 'antd';
import { ArrowLeft, Clock, Mail, KeyRound } from 'lucide-react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import OTPInput from '@/components/common/OTPInput';
import PasswordStrengthIndicator from '@/components/common/PasswordStrengthIndicator';
import SEOHead from '@/components/SEOHead';
import AuthShell from '@/components/auth/AuthShell';
import AuthHeader from '@/components/auth/AuthHeader';
import { isPasswordStrong } from '@/utils/passwordValidation';
import { DEFAULT_AFTER_AUTH } from '@/lib/authRedirect';

interface LocationState {
  email?: string;
  name?: string;
  password?: string;
  type?: 'verification' | 'reset';
  next?: string;
}

const CODE_TTL_SECONDS = 600;

const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

const errorText = (error: unknown, fallback: string) =>
  (error as { response?: { data?: { message?: string } } })?.response?.data?.message || fallback;

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuth();
  const state = (location.state ?? {}) as LocationState;
  const isReset = state.type === 'reset';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(CODE_TTL_SECONDS);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!state.email) return <Navigate to="/signup" replace />;

  const resetReady = isPasswordStrong(newPassword) && newPassword === confirmPassword;
  const canSubmit = otp.length === 6 && (!isReset || resetReady);

  const handleVerify = async () => {
    if (!canSubmit || !state.email) return;
    setLoading(true);
    try {
      if (isReset) {
        const result = await authAPI.verifyResetOTP(state.email, otp, newPassword);
        if (!result.success) throw new Error();
        message.success('Your password has been reset');
        navigate('/sign-in');
        return;
      }

      if (!state.name || !state.password) throw new Error();
      const result = await authAPI.verifyEmailOTP(state.email, otp);
      if (!result.success || !result.verificationToken) throw new Error();
      await signup(state.name, state.email, state.password, result.verificationToken);
      navigate(state.next || DEFAULT_AFTER_AUTH, { replace: true });
    } catch (error) {
      message.error(errorText(error, isReset ? 'Password reset failed' : 'Verification failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!state.email) return;
    setResendLoading(true);
    try {
      if (isReset) await authAPI.sendResetOTP(state.email);
      else await authAPI.sendVerificationOTP(state.email);
      message.success('We sent you a new code');
      setTimeLeft(CODE_TTL_SECONDS);
      setOtp('');
    } catch (error) {
      message.error(errorText(error, 'Failed to resend the code'));
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthShell>
      <SEOHead title="Verify Your Account" description="Verify your QR Studio account with OTP." path="/otp-verification" noindex />

      <button
        type="button"
        onClick={() => navigate(isReset ? '/forgot-password' : '/signup')}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {isReset ? <KeyRound size={22} /> : <Mail size={22} />}
      </div>

      <AuthHeader
        title={isReset ? 'Reset your password' : 'Check your email'}
        subtitle={
          <>
            Enter the 6-digit code we sent to <span className="font-medium text-foreground">{state.email}</span>
          </>
        }
      />

      <div className="space-y-5">
        <OTPInput length={6} value={otp} onChange={setOtp} onComplete={setOtp} disabled={loading} loading={loading} />

        {isReset && (
          <div className="space-y-4">
            <div>
              <label htmlFor="otp-new-password" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
                New password
              </label>
              <Input.Password
                id="otp-new-password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
              <PasswordStrengthIndicator password={newPassword} className="mt-2.5" />
            </div>
            <div>
              <label htmlFor="otp-confirm-password" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
                Confirm password
              </label>
              <Input.Password
                id="otp-confirm-password"
                autoComplete="new-password"
                placeholder="Repeat the new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <PasswordStrengthIndicator
                password={confirmPassword ? newPassword : ''}
                confirmPassword={confirmPassword}
                showMatch
                showRequirements={false}
                className="mt-2.5"
              />
            </div>
          </div>
        )}

        <Button type="primary" block loading={loading} disabled={!canSubmit} onClick={handleVerify}>
          {isReset ? 'Reset password' : 'Verify and continue'}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Clock size={14} />
            {timeLeft > 0 ? `Expires in ${formatTime(timeLeft)}` : 'Code expired'}
          </span>
          <Button type="link" size="small" onClick={handleResend} loading={resendLoading} disabled={timeLeft > CODE_TTL_SECONDS - 30} className="!h-auto !p-0 font-semibold">
            Resend code
          </Button>
        </div>
      </div>
    </AuthShell>
  );
};

export default OTPVerification;
