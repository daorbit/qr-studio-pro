import React from 'react';
import { Link } from 'react-router-dom';

const AuthLegal: React.FC = () => (
  <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
    By continuing you agree to our{' '}
    <Link to="/terms-and-conditions" className="underline underline-offset-2 hover:text-foreground">Terms</Link> and{' '}
    <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</Link>.
  </p>
);

export default AuthLegal;
