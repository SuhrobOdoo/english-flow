import { useState, useEffect, useCallback } from 'react';
import type { ThemeMode } from '../types/userProgress';
import { getUserSettings, saveUserSettings } from '../services/storage';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>('system');

  useEffect(() => {
    getUserSettings().then((settings) => {
      setThemeState(settings.theme);
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme-setting', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applySystem = (e: MediaQueryList | MediaQueryListEvent) => {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      };
      applySystem(mediaQuery);
      mediaQuery.addEventListener('change', applySystem);
      return () => mediaQuery.removeEventListener('change', applySystem);
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const setTheme = useCallback(async (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    const settings = await getUserSettings();
    await saveUserSettings({ ...settings, theme: newTheme });
  }, []);

  return { theme, setTheme };
}
