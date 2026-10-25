import React, { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Input, Button, message } from "antd";
import { Eye, EyeOff, Shield, Zap } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useGoogleLoginReturn } from "@/hooks/useGoogleLoginReturn";
import LogoLoader from "@/components/common/LogoLoader";
import GoogleSignInButton from "@/components/common/GoogleSignInButton";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { user, signin } = useAuth();
  const googleLoading = useGoogleLoginReturn();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      message.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await signin(formData.email, formData.password);
      navigate("/dashboard");
    } catch {
      // errors shown in hook
    } finally {
      setLoading(false);
    }
  };

  if (googleLoading) {
    return <LogoLoader fullScreen message="Signing in with Google..." />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Sign In" description="Sign in to your QR Studio account. Access your QR codes, analytics, and design tools." path="/sign-in" noindex />
      {/* SEO */}
      <header className="sr-only">
        <h1>Sign in to QR Studio</h1>
      </header>

      {/* Logo Header */}
      <div className="px-6 sm:px-8 pt-6">
        <Link to="/" className="flex items-center gap-3 w-fit">
          <img src="/logo.png" alt="QR Studio logo" className="w-10 h-10 object-contain" />
          <span className="text-lg font-bold text-foreground">QR Studio</span>
        </Link>
      </div>

      <main className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 py-8 lg:py-0">
        <section className="max-w-[32rem] mx-auto w-full">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Welcome Back
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Today is a new day. It&apos;s your day. You shape it.
            </p>
          </div>

          {/* Features */}
          <div className="flex gap-4 sm:gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4" />
              <span>Fast</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Sign in form">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
              <Input
                size="large"
                type="email"
                placeholder="Example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-11 rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
              <Input
                size="large"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                className="h-11 rounded-lg"
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-11 text-sm font-semibold rounded-lg"
            >
              Sign in
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="px-4 text-muted-foreground text-sm">Or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <GoogleSignInButton label="Sign in with Google" />


          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-muted-foreground text-sm">Don&apos;t have an account? </span>
            <Link
              to="/signup"
              className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
            >
              Sign up
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 lg:py-6">
        <p className="text-muted-foreground text-xs">© 2026 ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
};

export default SignIn;

