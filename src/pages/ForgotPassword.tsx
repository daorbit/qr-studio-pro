import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "@/lib/api";
import SEOHead from "@/components/SEOHead";
import AuthShell from "@/components/auth/AuthShell";
import AuthHeader from "@/components/auth/AuthHeader";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      message.error("Enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await authAPI.sendResetOTP(value);
      message.success("We sent a reset code to your email");
      navigate("/otp-verification", { state: { email: value, type: "reset" } });
    } catch (error) {
      const serverMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      message.error(serverMessage || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <SEOHead title="Reset Password" description="Reset your QR Studio account password securely." path="/forgot-password" noindex />

      <Link to="/sign-in" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={14} />
        Back to sign in
      </Link>

      <AuthHeader title="Forgot your password?" subtitle="Enter your email and we'll send you a code to reset it." />

      <form onSubmit={handleSendOTP} className="space-y-4" aria-label="Reset password form" noValidate>
        <div>
          <label htmlFor="forgot-email" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
            Email
          </label>
          <Input id="forgot-email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Send reset code
        </Button>
      </form>
    </AuthShell>
  );
};

export default ForgotPassword;
