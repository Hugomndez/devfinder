import ThemeScript from '@/components/theme-script';
import { SpaceMono } from '@/fonts';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Challenge by Frontend Mentor. Coded by @hugomndez.',
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
