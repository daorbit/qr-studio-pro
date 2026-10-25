import React from 'react';
import { Avatar } from 'antd';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import '@/styles/auth.css';

interface StandaloneShellProps {
  children: React.ReactNode;
  wide?: boolean;
}

const StandaloneShell: React.FC<StandaloneShellProps> = ({ children, wide = false }) => {
  const { user, signout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between px-5 sm:px-8 py-5">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="QR Studio" className="w-8 h-8 object-contain" />
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">QR Studio</span>
        </div>
        {user && (
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-muted-foreground">{user.email}</span>
            <Avatar size={30} src={user.profilePicture}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <button
              type="button"
              onClick={signout}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </header>

      <main className="auth-panel relative flex-1 flex items-start sm:items-center justify-center px-5 sm:px-8 pb-16 pt-6">
        <div className={`auth-form relative w-full ${wide ? 'max-w-3xl' : 'max-w-[440px]'}`}>{children}</div>
      </main>
    </div>
  );
};

export default StandaloneShell;
