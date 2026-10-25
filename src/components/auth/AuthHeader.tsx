import React from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => (
  <div className="mb-7 text-center">
    <h1 className="text-[1.95rem] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground">{title}</h1>
    {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
  </div>
);

export default AuthHeader;
