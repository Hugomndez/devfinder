import ThemeScript from '@/components/theme-script';
import { SpaceMono } from '@/fonts';
import { APP_NAME } from '@/lib/constants';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Challenge by Frontend Mentor. Coded by @hugomndez.',
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f7ff' },
    { media: '(prefers-color-scheme: dark)', color: '#141d2e' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      dir='ltr'
      suppressHydrationWarning>
      <body className={SpaceMono.className}>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
