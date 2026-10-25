import React, { useEffect, useMemo, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Input, Button, message } from "antd";
import { Eye, EyeOff, Shield, Zap, Check, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { authAPI } from "@/lib/api";
import GoogleSignInButton from "@/components/common/GoogleSignInButton";
import {
  passwordRequirements, 
  getPasswordStrength, 
  getPasswordStrengthClasses,
  isPasswordStrong 
} from "@/utils/passwordValidation";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const passwordStrength = useMemo(() => getPasswordStrength(formData.password), [formData.password]);
  const allRequirementsMet = useMemo(
    () => isPasswordStrong(formData.password),
    [formData.password]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      message.error("Please fill in all required fields");
      return;
    }

    if (!allRequirementsMet) {
      message.error("Password does not meet all requirements");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Send OTP for email verification
      await authAPI.sendVerificationOTP(formData.email);
      
      message.success('Verification code sent to your email');
      
      // Navigate to OTP verification page with signup data
      navigate('/otp-verification', {
        state: {
          email: formData.email,
          name: formData.name,
          password: formData.password,
          type: 'verification'
        }
      });
    } catch (error: any) {
      console.error('Send OTP error:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to send verification code';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Sign Up" description="Create your free QR Studio account. Start generating custom QR codes with analytics and branding." path="/signup" />
      {/* SEO */}
      <header className="sr-only">
        <h1>Create a QR Studio account</h1>
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
              Create Account
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">Start your journey today</p>
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
          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Sign up form">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
              <Input
                size="large"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-11 rounded-lg"
              />
            </div>

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

              {/* Password strength bar */}
              {formData.password && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getPasswordStrengthClasses(passwordStrength.level).bar}`}
                        style={{ width: `${passwordStrength.percent}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium capitalize ${getPasswordStrengthClasses(passwordStrength.level).text}`}
                    >
                      {passwordStrength.level}
                    </span>
                  </div>

                  {/* Requirements checklist */}
                  <ul className="space-y-1">
                    {passwordRequirements.map((req) => {
                      const passed = req.test(formData.password);
                      return (
                        <li key={req.id} className="flex items-center gap-2 text-xs">
                          {passed ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-muted-foreground" />
                          )}
                          <span className={passed ? "text-green-500" : "text-muted-foreground"}>
                            {req.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Confirm Password</label>
              <Input
                size="large"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                className="h-11 rounded-lg"
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-11 text-sm font-semibold rounded-lg !mt-6"
            >
              Sign up
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="px-4 text-muted-foreground text-sm">Or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <GoogleSignInButton label="Sign up with Google" />

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <span className="text-muted-foreground text-sm">Already have an account? </span>
            <Link
              to="/sign-in"
              className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
            >
              Sign in
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

export default SignUp;

