export const DEFAULT_AFTER_AUTH = '/dashboard';

export const getNextPath = (search: string): string => {
  const next = new URLSearchParams(search).get('next');
  return next && next.startsWith('/') && !next.startsWith('//') ? next : DEFAULT_AFTER_AUTH;
};

export const withNext = (path: string, search: string): string => {
  const next = new URLSearchParams(search).get('next');
  return next ? `${path}?next=${encodeURIComponent(next)}` : path;
};
