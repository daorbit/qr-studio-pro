import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { mantineTheme, mantineCssVariables } from "./theme/mantineTheme";
import { Analytics } from "@vercel/analytics/react";
import { store } from "./store";
import { ThemeProvider } from "./context/ThemeContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { useTheme } from "./hooks/useTheme";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AppShell from "./components/layout/AppShell";
import RouteChangeListener from "./components/RouteChangeListener";
import GlobalDialogs from "./components/layout/GlobalDialogs";
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
const WorkspacePage = lazy(() => import("./pages/WorkspacePage"));
const Members = lazy(() => import("./pages/Members"));

const queryClient = new QueryClient();

const LazyFallback = () => (
  <div className="min-h-screen bg-background" />
);

const AppContent = () => {
  const { mode } = useTheme();

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const effectiveMode = mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode;

  return (
    <MantineProvider theme={mantineTheme} cssVariablesResolver={mantineCssVariables} forceColorScheme={effectiveMode}>
      <Notifications position="bottom-right" limit={4} />
      <ModalsProvider>
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
              <Route element={<AppShell />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateQR />} />
                <Route path="/edit/:id" element={<CreateQR />} />
                <Route path="/analytics" element={<MainAnalytics />} />
                <Route path="/analytics/:id" element={<QRAnalytics />} />
                <Route path="/compare" element={<CompareQRCodesPage />} />
                <Route path="/settings" element={<Profile />} />
                <Route path="/settings/profile" element={<Profile />} />
                <Route path="/settings/theme" element={<Profile />} />
                <Route path="/settings/watermark" element={<Profile />} />
                <Route path="/settings/whitelabel" element={<Profile />} />
                <Route path="/settings/workspace" element={<Navigate to="/workspace" replace />} />
                <Route path="/settings/members" element={<Navigate to="/members" replace />} />
                <Route path="/settings/subscription" element={<Navigate to="/pricing?tab=history" replace />} />
                <Route path="/workspace" element={<WorkspacePage />} />
                <Route path="/members" element={<Members />} />
                <Route path="/settings/security" element={<Profile />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/admin/users" element={<AdminRoute><AdminDataPage /></AdminRoute>} />
                <Route path="/admin/subscriptions" element={<AdminRoute><AdminDataPage /></AdminRoute>} />
                <Route path="/admin/audit-logs" element={<AdminRoute><AdminDataPage /></AdminRoute>} />
                <Route path="/admin/plan-pricing" element={<AdminRoute><AdminDataPage /></AdminRoute>} />
              </Route>
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/refunds" element={<CancellationsAndRefunds />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

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
      </ModalsProvider>
    </MantineProvider>
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
