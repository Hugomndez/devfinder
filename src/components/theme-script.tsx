import type { DetailedHTMLProps, ScriptHTMLAttributes } from 'react';
import { createConfig, script } from '../lib/theme-script';

type Props = DetailedHTMLProps<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;

export default function ThemeScript(props: Props) {
  const config = createConfig({
    defaultColorSchemeMode: 'system',
    forceDefault: false,
    attribute: 'data-color-scheme',
    storageType: 'sessionStorage',
    storageKey: 'colorScheme',
    enableColorScheme: false,
    metaTagThemeColor: {
      light: '#f5f7ff',
      dark: '#141d2e',
    },
  });

  return (
    <script
      {...props}
      dangerouslySetInnerHTML={{ __html: `(${script})(${JSON.stringify(config)});` }}
    />
  );
}
