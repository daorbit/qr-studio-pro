import { useCallback, useState } from 'react';

const KEY = 'qc-sidebar-collapsed';

const read = () => {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

export const useSidebarCollapsed = () => {
  const [collapsed, setCollapsed] = useState(read);

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      try {
        localStorage.setItem(KEY, prev ? '0' : '1');
      } catch {
        return !prev;
      }
      return !prev;
    });
  }, []);

  return { collapsed, toggle };
};
