const PERSONAL_DOMAINS = ['gmail', 'yahoo', 'outlook', 'hotmail', 'icloud', 'proton', 'live'];

export const suggestWorkspaceName = (email?: string, name?: string) => {
  const domain = email?.split('@')[1]?.split('.')[0];
  if (domain && !PERSONAL_DOMAINS.includes(domain.toLowerCase())) return domain.charAt(0).toUpperCase() + domain.slice(1);
  return name ? `${name.split(' ')[0]}'s workspace` : '';
};
