const KEY = 'qc-workspace';

export const readStoredWorkspace = (): string | null => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export const writeStoredWorkspace = (workspaceId: string | null) => {
  try {
    if (workspaceId) localStorage.setItem(KEY, workspaceId);
    else localStorage.removeItem(KEY);
  } catch {
    return;
  }
};
