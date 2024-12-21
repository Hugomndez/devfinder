'use client';
import { useSyncExternalStore } from 'react';

const toggle = global.window?.__theme.toggle;
const getSnapshot = global.window?.__theme.getValue;
const getServerSnapshot = () => null;

function subscribe(callback: () => void) {
  document.addEventListener('theme:change', callback);
  return () => document.removeEventListener('theme:change', callback);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return { theme, toggle };
}
