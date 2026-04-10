import { useState, useCallback } from 'react';

export function useTheme() {
  const [dark, setDark] = useState(true);
  const toggle = useCallback(() => {
    setDark((d) => {
      const next = !d;
      document.documentElement.dataset.theme = next ? '' : 'light';
      return next;
    });
  }, []);
  return { dark, toggle };
}
