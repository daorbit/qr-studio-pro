// Centralized config helpers
export const getAppOrigin = () => {
  // Prefer explicit env var VITE_APP_ORIGIN for builds (set in production to your deployed URL)
  // Fallback to window.location.origin when running in browser
  const envOrigin = "https://qr-craft-studio.vercel.app/";
  if (envOrigin && typeof envOrigin === 'string' && envOrigin.length > 0) return envOrigin.replace(/\/$/, '');
  if (typeof window !== 'undefined' && window.location && window.location.origin) return window.location.origin.replace(/\/$/, '');
  return 'https://example.com';
};

export const SUPPORT_EMAIL = 'winning11.in@gmail.com';
export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}`;

export default {
  getAppOrigin,
};
