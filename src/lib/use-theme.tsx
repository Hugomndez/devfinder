'use client';
import { useSyncExternalStore } from 'react';

const toggle = global.window?.__theme.toggle;
const setTheme = global.window?.__theme.setTheme;
const getValue = global.window?.__theme.getValue;
const getMode = global.window?.__theme.getMode;
const subscribe = global.window?.__theme.subscribe;
const subscribeMode = global.window?.__theme.subscribeMode;
const initialValue = () => global.window?.__theme.getInitialValue;
const initialMode = () => global.window?.__theme.getInitialMode;

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getValue, initialValue);
  const mode = useSyncExternalStore(subscribeMode, getMode, initialMode);

  return { theme, mode, setTheme, toggle };
}
