import ThemeScript from '@/components/theme-script';
import { SpaceMono } from '@/fonts';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'devFinder',
  description: 'Challenge by Frontend Mentor. Coded by @hugomndez.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      dir='ltr'>
      <body className={SpaceMono.className}>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
