import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { Analytics } from "@vercel/analytics/react";
import { store } from "./store";
import { ThemeProvider } from "./context/ThemeContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { useTheme } from "./hooks/useTheme";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import RouteChangeListener from "./components/RouteChangeListener";
import GlobalDialogs from "./components/layout/GlobalDialogs";
import { hslToRgb } from "./utils/colorUtils";
import LogoLoader from "./components/common/LogoLoader";

// Lazy load all other pages
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const OTPVerification = lazy(() => import("./pages/OTPVerification"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateQR = lazy(() => import("./pages/CreateQR"));
const MainAnalytics = lazy(() => import("./pages/Analytics"));
const QRAnalytics = lazy(() => import("./pages/QRAnalytics"));
const CompareQRCodesPage = lazy(() => import("./pages/CompareQRCodes"));
const Redirector = lazy(() => import("./pages/Redirector"));
const QRUnavailable = lazy(() => import("./pages/QRUnavailable"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Contact = lazy(() => import("./pages/Contact"));
const Submissions = lazy(() => import("./pages/Submissions"));
const AdminDataPage = lazy(() => import("./pages/AdminData"));
const Profile = lazy(() => import("./pages/Profile"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const CancellationsAndRefunds = lazy(() => import("./pages/CancellationsAndRefunds"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Workspaces = lazy(() => import("./pages/Workspaces"));
const AcceptInvite = lazy(() => import("./pages/AcceptInvite"));

const queryClient = new QueryClient();

const LazyFallback = () => (
  <div className="min-h-screen bg-background" />
);

const AppContent = () => {
  const { mode, currentTheme, theme: themeConfig } = useTheme();
  
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const effectiveMode = mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode;
  
  const primaryColor = hslToRgb(themeConfig.colors.primary);

  const antTheme = {
    algorithm: effectiveMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: primaryColor,
      borderRadius: 8,
      borderRadiusLG: 12,
      fontFamily: "'Google Sans Flex', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
      boxShadow: 'none',
      ...(effectiveMode === 'dark' ? {
        colorBgBase: '#0b0c0e',
        colorBgContainer: '#16171a',
        colorBgElevated: '#1c1d21',
        colorBorder: '#28292e',
        colorBorderSecondary: '#222327',
        colorText: '#f2f2f4',
        colorTextSecondary: '#8a8c95',
      } : {
        colorBgLayout: '#f5f5f7',
        colorBorder: '#dcdce1',
        colorBorderSecondary: '#e5e5ea',
        colorText: '#1d1d1f',
        colorTextSecondary: '#6e6e78',
      }),
    },
  };

  return (
    <ConfigProvider theme={antTheme}>
      <TooltipProvider>
        <BrowserRouter>
          <RouteChangeListener />
          <Suspense fallback={<LazyFallback />}>
            <Routes>
              <Route path="/" element={<Navigate to="/sign-in" replace />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/otp-verification" element={<OTPVerification />} />
              <Route path="/invite/:token" element={<AcceptInvite />} />
              <Route
                path="/onboarding"
                element={<ProtectedRoute requireWorkspace={false}><Onboarding /></ProtectedRoute>}
              />
              <Route
                path="/workspaces"
                element={<ProtectedRoute requireWorkspace={false}><Workspaces /></ProtectedRoute>}
              />
              <Route
                path="/dashboard"
                element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
              />
              <Route
                path="/create"
                element={<ProtectedRoute><CreateQR /></ProtectedRoute>}
              />
              <Route
                path="/edit/:id"
                element={<ProtectedRoute><CreateQR /></ProtectedRoute>}
              />
              <Route
                path="/analytics"
                element={<ProtectedRoute><MainAnalytics /></ProtectedRoute>}
              />
              <Route
                path="/analytics/:id"
                element={<ProtectedRoute><QRAnalytics /></ProtectedRoute>}
              />
              <Route
                path="/compare"
                element={<ProtectedRoute><CompareQRCodesPage /></ProtectedRoute>}
              />
              <Route
                path="/settings"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
              />
              <Route
                path="/settings/profile"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
              />
              <Route
                path="/settings/theme"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
              />
              <Route
                path="/settings/watermark"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
              />
              <Route
                path="/settings/whitelabel"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
              />
              <Route
                path="/settings/workspace"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
              />
              <Route
                path="/settings/members"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
              />
              <Route
                path="/settings/subscription"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
              />
              <Route
                path="/settings/security"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
              />
              <Route
                path="/pricing"
                element={<ProtectedRoute><PricingPage /></ProtectedRoute>}
              />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/refunds" element={<CancellationsAndRefunds />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/submissions" element={<AdminRoute><Submissions /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><AdminDataPage /></AdminRoute>} />
              <Route path="/admin/subscriptions" element={<AdminRoute><AdminDataPage /></AdminRoute>} />
              <Route path="/admin/audit-logs" element={<AdminRoute><AdminDataPage /></AdminRoute>} />
              <Route path="/admin/plan-pricing" element={<AdminRoute><AdminDataPage /></AdminRoute>} />

              {/* Public redirect route for scanned QR codes */}
              <Route path="/r/:id" element={<Redirector />} />
              <Route path="/r" element={<Redirector />} />

              {/* QR unavailable when expired or scan limit reached */}
              <Route path="/qr/unavailable/:id" element={<QRUnavailable />} />

              <Route path="*" element={<NotFound />}/>
            </Routes>
          </Suspense>
          
          <GlobalDialogs />
        </BrowserRouter>
        
        <Toaster />
        <Sonner />
        <Analytics />
      </TooltipProvider>
    </ConfigProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SubscriptionProvider>
          <AppContent />
        </SubscriptionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
