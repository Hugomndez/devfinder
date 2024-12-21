type ColorScheme = 'light' | 'dark';
type PreferredThemeMode = 'system' | ColorScheme;

type MetaTagThemeColorType<
  ForceDefault extends boolean,
  Mode extends PreferredThemeMode,
> = ForceDefault extends true
  ? Mode extends ColorScheme
    ? string
    : Record<ColorScheme, string>
  : Record<ColorScheme, string>;

interface Config<ForceDefault extends boolean, Mode extends PreferredThemeMode> {
  defaultColorSchemeMode: Mode;
  forceDefault: ForceDefault;
  attribute: `data-${string}`;
  storageType: 'localStorage' | 'sessionStorage';
  storageKey: string;
  enableColorScheme: boolean;
  metaTagThemeColor: MetaTagThemeColorType<ForceDefault, Mode>;
}

declare global {
  interface Window {
    __theme: {
      getValue: () => ColorScheme;
      getMode: () => PreferredThemeMode;
      setTheme: (mode: PreferredThemeMode) => void;
      toggle: () => void;
    };
  }
}

/**
 * Creates and returns a configuration object with enforced types.
 *
 * @param config - The configuration object to be processed.
 * @returns A strongly-typed configuration object.
 */

export function createConfig<ForceDefault extends boolean, Mode extends PreferredThemeMode>(
  config: Config<ForceDefault, Mode>
): Config<ForceDefault, Mode> {
  return config;
}

export function script<ForceDefault extends boolean, Mode extends PreferredThemeMode>(
  config: Config<ForceDefault, Mode>
): void {
  'use strict';

  try {
    let currentColorScheme: ColorScheme;
    let preferredThemeMode: PreferredThemeMode;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const themeUpdateEvent = new Event('theme:change');

    function apply(mode: PreferredThemeMode) {
      const resolvedScheme = resolveColorScheme(mode);
      if (resolvedScheme === currentColorScheme && preferredThemeMode === mode) return;

      currentColorScheme = resolvedScheme;
      preferredThemeMode = mode;
      updateDOM(resolvedScheme);
      document.dispatchEvent(themeUpdateEvent);
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
      apply(resolvePreferredTheme());
    }

    function getStorageAPI() {
      return config.storageType === 'localStorage' ? localStorage : sessionStorage;
    }

    function persistPreferredTheme(mode: PreferredThemeMode) {
      getStorageAPI().setItem(config.storageKey, mode);
    }

    function getPreferredTheme() {
      const value = getStorageAPI().getItem(config.storageKey);
      return value === 'system' || value === 'light' || value === 'dark' ? value : null;
    }

    function getSystemColorScheme() {
      return mediaQuery.matches ? 'dark' : 'light';
    }

    function resolvePreferredTheme() {
      const storedMode = getPreferredTheme();
      if (storedMode) return storedMode;

      return config.defaultColorSchemeMode;
    }

    function resolveColorScheme(mode: PreferredThemeMode): ColorScheme {
      return mode === 'system' ? getSystemColorScheme() : mode;
    }

    mediaQuery.addEventListener('change', handleSystemColorSchemeChange);

    const api = {
      getValue: () => currentColorScheme,
      getMode: () => preferredThemeMode,
      setTheme: (mode: PreferredThemeMode) => {
        if (!config.forceDefault) {
          apply(mode);
          persistPreferredTheme(mode);
        }
      },
      toggle: () => {
        if (!config.forceDefault) {
          const nextScheme = currentColorScheme === 'light' ? 'dark' : 'light';
          apply(nextScheme);
          persistPreferredTheme(nextScheme);
        }
      },
    };

    if (!('__theme' in window)) {
      Object.defineProperty(window, '__theme', {
        value: api,
        writable: false,
        configurable: false,
      });
    }

    apply(resolvePreferredTheme());
  } catch (_) {}
}
