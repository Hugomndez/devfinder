'use client';
import { useEffect, useState } from 'react';

const ThemeButton = () => {
  const [theme, setTheme] = useState(global.window?.__theme || 'light');

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    global.window?.__setPreferredTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
  }, []);

  return <button onClick={toggleTheme}>{isDark ? 'LIGHT' : 'DARK'}</button>;
};

export default ThemeButton;
