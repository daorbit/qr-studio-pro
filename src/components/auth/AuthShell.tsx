import React from 'react';
import { Link } from 'react-router-dom';
import AuthShowcase from './AuthShowcase';
import { SUPPORT_MAILTO } from '@/lib/config';
import '@/styles/auth.css';

interface AuthShellProps {
  children: React.ReactNode;
  switchLink?: { to: string; label: string; cta: string };
}

const AuthShell: React.FC<AuthShellProps> = ({ children, switchLink }) => (
  <div className="min-h-screen grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] bg-background">
    <AuthShowcase />

    <div className="relative flex flex-col">
      <header className="flex items-center px-5 sm:px-8 pt-6 lg:hidden">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="QR Studio" className="w-7 h-7 object-contain" />
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">QR Studio</span>
        </Link>
      </header>

      <main className="auth-panel flex-1 flex items-start sm:items-center justify-center px-5 sm:px-8 py-12">
        <div className="auth-form relative w-full max-w-[360px]">
          {children}
          {switchLink && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {switchLink.label}{' '}
              <Link to={switchLink.to} className="font-medium text-primary hover:underline underline-offset-4">
                {switchLink.cta}
              </Link>
            </p>
          )}
        </div>
      </main>

      <footer className="px-5 sm:px-8 pb-6 text-xs text-muted-foreground flex justify-center gap-5">
        <Link to="/terms-and-conditions" className="hover:text-foreground transition-colors">Terms</Link>
        <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy</Link>
        <a href={SUPPORT_MAILTO} className="hover:text-foreground transition-colors">Support</a>
      </footer>
    </div>
  </div>
);

export default AuthShell;
