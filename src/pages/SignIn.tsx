import React, { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { useGoogleLoginReturn } from "@/hooks/useGoogleLoginReturn";
import LogoLoader from "@/components/common/LogoLoader";
import GoogleSignInButton from "@/components/common/GoogleSignInButton";
import AuthShell from "@/components/auth/AuthShell";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthLegal from "@/components/auth/AuthLegal";
import { getNextPath, withNext } from "@/lib/authRedirect";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { user, signin } = useAuth();
  const googleLoading = useGoogleLoginReturn();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) navigate(getNextPath(search), { replace: true });
  }, [user, navigate, search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      message.error("Enter your email and password");
      return;
    }

    setLoading(true);
    try {
      await signin(email.trim(), password);
      navigate(getNextPath(search), { replace: true });
    } catch {
      return;
    } finally {
      setLoading(false);
    }
  };

  if (googleLoading) {
    return <LogoLoader fullScreen message="Signing in with Google..." />;
  }

  return (
    <AuthShell switchLink={{ to: withNext("/signup", search), label: "New to QR Studio?", cta: "Create an account" }}>
      <SEOHead title="Sign In" description="Sign in to your QR Studio account. Access your QR codes, analytics, and design tools." path="/sign-in" noindex />

      <AuthHeader title="Welcome back" subtitle="Sign in to your QR Studio workspace." />

      <GoogleSignInButton label="Continue with Google" />

      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-4" aria-label="Sign in form" noValidate>
        <div>
          <label htmlFor="signin-email" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
            Email
          </label>
          <Input
            id="signin-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="signin-password" className="text-[13px] font-semibold text-muted-foreground">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              Forgot password?
            </Link>
          </div>
          <Input.Password
            id="signin-password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Sign in
        </Button>
      </form>

      <AuthLegal />
    </AuthShell>
  );
};

export default SignIn;
