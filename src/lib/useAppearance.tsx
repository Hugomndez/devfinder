import { useEffect, useState } from 'react';

export function useAppearance() {
  const [appearance, setAppearance] = useState(global.window?.__colorScheme || 'light');
  const [appearanceMode, setAppearanceMode] = useState(
    global.window?.__colorSchemeMode || 'system'
  );

  const setTheme = global.window?.__setColorSchemeMode;
  const toggleAppearance = global.window?.__toggleColorScheme;

  useEffect(() => {
    global.window.__updateClientColorScheme = setAppearance;
  }, []);

  useEffect(() => {
    global.window.__updateClientColorSchemeMode = setAppearanceMode;
  }, []);

  return { appearance, appearanceMode, setTheme, toggleAppearance };
}
