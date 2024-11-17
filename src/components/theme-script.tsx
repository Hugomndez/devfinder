import { DetailedHTMLProps } from 'react';
import { appearanceScript, createConfig } from '../lib/appearanceScript';

type ThemeScriptProps = DetailedHTMLProps<
  React.ScriptHTMLAttributes<HTMLScriptElement>,
  HTMLScriptElement
>;

export default function ThemeScript(props: ThemeScriptProps) {
  const config = createConfig({
    defaultColorSchemeMode: 'system',
    forceDefault: false,
    attribute: 'data-color-scheme',
    storageType: 'localStorage',
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
      dangerouslySetInnerHTML={{ __html: `(${appearanceScript})(${JSON.stringify(config)});` }}
    />
  );
}
