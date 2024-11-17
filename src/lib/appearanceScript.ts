type ColorScheme = 'light' | 'dark';
type ColorSchemeMode = 'system' | ColorScheme;

type MetaTagThemeColorType<
  ForceDefault extends boolean,
  Mode extends ColorSchemeMode
> = ForceDefault extends true
  ? Mode extends ColorScheme
    ? string
    : Record<ColorScheme, string>
  : Record<ColorScheme, string>;

interface Config<ForceDefault extends boolean, Mode extends ColorSchemeMode> {
  defaultColorSchemeMode: Mode;
  forceDefault: ForceDefault;
  attribute: `data-${string}`;
  storageType: 'localStorage' | 'sessionStorage';
  storageKey: string;
  enableColorScheme: boolean;
  metaTagThemeColor: MetaTagThemeColorType<ForceDefault, Mode>;
}

/**
 * Creates and returns a configuration object with enforced types.
 *
 * @param config - The configuration object to be processed.
 * @returns A strongly-typed configuration object.
 */

export function createConfig<ForceDefault extends boolean, Mode extends ColorSchemeMode>(
  config: Config<ForceDefault, Mode>
): Config<ForceDefault, Mode> {
  return config;
}

declare global {
  interface Window {
    __colorScheme: ColorScheme;
    __colorSchemeMode: ColorSchemeMode;
    __toggleColorScheme: () => void;
    __setColorSchemeMode: (mode: ColorSchemeMode) => void;
    __updateClientColorScheme: (colorScheme: ColorScheme) => void;
    __updateClientColorSchemeMode: (mode: ColorSchemeMode) => void;
  }
}

export function appearanceScript<ForceDefault extends boolean, Mode extends ColorSchemeMode>(
  config: Config<ForceDefault, Mode>
): void {
  'use strict';

  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function setColorSchemeMode(mode: ColorSchemeMode) {
      const resolvedScheme = resolveColorScheme(mode);
      if (resolvedScheme === window.__colorScheme && window.__colorSchemeMode === mode) return;

      window.__colorScheme = resolvedScheme;
      window.__colorSchemeMode = mode;
      window.__updateClientColorScheme(resolvedScheme);
      window.__updateClientColorSchemeMode(mode);
      updateDOM(resolvedScheme);
    }

    function updateDOM(colorScheme: ColorScheme) {
      document.documentElement.setAttribute(config.attribute, colorScheme);
      setColorScheme(colorScheme);
      setThemeColorMetaTag(colorScheme);
    }

    function setColorScheme(colorScheme: ColorScheme) {
      if (config.enableColorScheme) {
        document.documentElement.style.colorScheme = colorScheme;
      }
    }

    function setThemeColorMetaTag(colorScheme: ColorScheme) {
      const metaTags = document.head.querySelectorAll(
        'meta[name="theme-color"]'
      ) as NodeListOf<HTMLMetaElement>;

      const color =
        typeof config.metaTagThemeColor === 'string'
          ? config.metaTagThemeColor
          : config.metaTagThemeColor[colorScheme];

      if (metaTags.length === 0) {
        const newMetaTag = document.createElement('meta');
        newMetaTag.name = 'theme-color';
        newMetaTag.content = color;
        document.head.appendChild(newMetaTag);
      } else {
        metaTags.forEach((metaTag) => {
          metaTag.media ? metaTag.remove() : (metaTag.content = color);
        });
      }
    }

    function handleSystemColorSchemeChange() {
      setColorSchemeMode(resolveColorSchemeMode());
    }

    function getStorageAPI() {
      return config.storageType === 'localStorage' ? localStorage : sessionStorage;
    }

    function persistColorSchemeMode(mode: ColorSchemeMode) {
      getStorageAPI().setItem(config.storageKey, mode);
    }

    function getPersistedColorSchemeMode() {
      const value = getStorageAPI().getItem(config.storageKey);
      return value === 'system' || value === 'light' || value === 'dark' ? value : null;
    }

    function getSystemColorScheme() {
      return mediaQuery.matches ? 'dark' : 'light';
    }

    function resolveColorSchemeMode() {
      const storedMode = getPersistedColorSchemeMode();
      if (storedMode) return storedMode;

      return config.defaultColorSchemeMode;
    }

    function resolveColorScheme(mode: ColorSchemeMode): ColorScheme {
      return mode === 'system' ? getSystemColorScheme() : mode;
    }

    mediaQuery.addEventListener('change', handleSystemColorSchemeChange);

    window.__setColorSchemeMode = (mode: ColorSchemeMode) => {
      if (!config.forceDefault) {
        setColorSchemeMode(mode);
        persistColorSchemeMode(mode);
      }
    };

    window.__toggleColorScheme = () => {
      if (!config.forceDefault) {
        const nextScheme = window.__colorScheme === 'light' ? 'dark' : 'light';
        setColorSchemeMode(nextScheme);
        persistColorSchemeMode(nextScheme);
      }
    };

    window.__updateClientColorScheme = () => {};
    window.__updateClientColorSchemeMode = () => {};

    initialize();

    function initialize() {
      setColorSchemeMode(resolveColorSchemeMode());
    }
  } catch (_) {}
}
