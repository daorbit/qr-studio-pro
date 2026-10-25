import React, { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { authAPI } from "@/lib/api";
import GoogleSignInButton from "@/components/common/GoogleSignInButton";
import PasswordStrengthIndicator from "@/components/common/PasswordStrengthIndicator";
import AuthShell from "@/components/auth/AuthShell";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthLegal from "@/components/auth/AuthLegal";
import { isPasswordStrong } from "@/utils/passwordValidation";
import { getNextPath, withNext } from "@/lib/authRedirect";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (user) navigate(getNextPath(search), { replace: true });
  }, [user, navigate, search]);

  const set = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      message.error("Fill in your name, email and password");
      return;
    }
    if (!isPasswordStrong(formData.password)) {
      message.error("Choose a stronger password");
      return;
    }

    setLoading(true);
    try {
      await authAPI.sendVerificationOTP(formData.email.trim());
      message.success("We sent a verification code to your email");
      navigate("/otp-verification", {
        state: {
          email: formData.email.trim(),
          name: formData.name.trim(),
          password: formData.password,
          type: "verification",
          next: getNextPath(search),
        },
      });
    } catch (error) {
      const serverMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      message.error(serverMessage || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell switchLink={{ to: withNext("/sign-in", search), label: "Have an account?", cta: "Sign in" }}>
      <SEOHead title="Sign Up" description="Create your free QR Studio account. Start generating custom QR codes with analytics and branding." path="/signup" />

      <AuthHeader title="Create your account" subtitle="Start free. Every new workspace gets a 3-month Pro trial." />

      <GoogleSignInButton label="Sign up with Google" text="signup_with" />

      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-4" aria-label="Sign up form" noValidate>
        <div>
          <label htmlFor="signup-name" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
            Full name
          </label>
          <Input id="signup-name" autoComplete="name" placeholder="Alex Morgan" value={formData.name} onChange={set("name")} />
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
            Work email
          </label>
          <Input id="signup-email" type="email" autoComplete="email" placeholder="you@company.com" value={formData.email} onChange={set("email")} />
        </div>

        <div>
          <label htmlFor="signup-password" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
            Password
          </label>
          <Input.Password id="signup-password" autoComplete="new-password" placeholder="At least 8 characters" value={formData.password} onChange={set("password")} />
          <PasswordStrengthIndicator password={formData.password} className="mt-2.5" />
        </div>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Create account
        </Button>
      </form>

      <AuthLegal />
    </AuthShell>
  );
};

export default SignUp;
