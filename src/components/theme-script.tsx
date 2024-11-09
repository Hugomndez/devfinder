type Theme = 'light' | 'dark';

declare global {
  interface Window {
    __currentTheme: Theme;
    __onThemeChange: (theme: Theme) => void;
    __setThemePreference: (theme: Theme) => void;
    __toggleTheme: () => void;
  }
}

interface ThemeScriptConfig {
  localStorageKey: string;
  themeColor: Record<Theme, string>;
}

function themeScript(config: ThemeScriptConfig) {
  'use strict';

  try {
    var themePreference: Theme | null = null;
    var prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    window.__onThemeChange = function () {};

    window.__setThemePreference = function (preferredTheme) {
      setTheme(preferredTheme);
      localStorage.setItem(config.localStorageKey, preferredTheme);
    };

    window.__toggleTheme = function () {
      var newTheme: Theme = window.__currentTheme === 'dark' ? 'light' : 'dark';
      window.__setThemePreference(newTheme);
    };

    function determineTheme(): Theme {
      var defaultTheme: Theme = prefersDarkScheme.matches ? 'dark' : 'light';
      return themePreference || defaultTheme;
    }

    function setTheme(selectedTheme: Theme) {
      window.__currentTheme = selectedTheme;
      window.__onThemeChange(selectedTheme);
      themePreference = selectedTheme;
      document.documentElement.dataset.theme = selectedTheme;
      updateThemeColorMetaTag();
    }

    function init() {
      themePreference = localStorage.getItem(config.localStorageKey) as Theme;
      setTheme(determineTheme());
    }

    function updateThemeColorMetaTag() {
      var metaTags = document.querySelectorAll('meta[name="theme-color"]');
      var color = config.themeColor[determineTheme()];

      if (metaTags.length === 0) {
        var metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'theme-color');
        document.head.appendChild(metaTag);
        metaTag.setAttribute('content', color);
      }
      metaTags.forEach((metaTag) => {
        metaTag.setAttribute('content', color);
      });
    }

    function handleMediaQueryThemeChange(e: MediaQueryListEvent) {
      window.__setThemePreference(e.matches ? 'dark' : 'light');
    }

    prefersDarkScheme.addEventListener('change', handleMediaQueryThemeChange);

    init();
  } catch (_) {}
}

export default function ThemeScript() {
  const config: ThemeScriptConfig = {
    localStorageKey: 'theme',
    themeColor: {
      light: '#f5f7ff',
      dark: '#141d2e',
    },
  };

  return (
    <script
      id='theme-script'
      defer
      dangerouslySetInnerHTML={{ __html: `(${themeScript})(${JSON.stringify(config)});` }}
    />
  );
}
