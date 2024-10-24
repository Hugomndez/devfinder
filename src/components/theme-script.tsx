type Theme = 'light' | 'dark';

declare global {
  interface Window {
    __currentTheme: Theme;
    __onThemeChange: (theme: Theme) => void;
    __setThemePreference: (theme: Theme) => void;
  }
}

function code() {
  window.__onThemeChange = function () {};

  function setTheme(selectedTheme: Theme) {
    window.__currentTheme = selectedTheme;
    themePreference = selectedTheme;
    document.documentElement.dataset.theme = selectedTheme;
    window.__onThemeChange(selectedTheme);
  }

  var themePreference: Theme | null = null;

  try {
    themePreference = localStorage.getItem('theme') as Theme;
  } catch (_) {}

  window.__setThemePreference = function (preferredTheme) {
    setTheme(preferredTheme);
    try {
      localStorage.setItem('theme', preferredTheme);
    } catch (_) {}
  };

  var darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function setThemeBasedOnMediaQuery(e: MediaQueryListEvent) {
    window.__setThemePreference(e.matches ? 'dark' : 'light');
  }

  darkModeQuery.addEventListener('change', setThemeBasedOnMediaQuery);

  setTheme(themePreference || (darkModeQuery.matches ? 'dark' : 'light'));
}

export default function ThemeScript() {
  return (
    <script
      id='theme-script'
      dangerouslySetInnerHTML={{ __html: `(${code})();` }}
    />
  );
}
