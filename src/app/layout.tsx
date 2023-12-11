import { SpaceMono } from '@/fonts';
import { getTheme } from '@/lib/getTheme';
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: getTheme }} />
      </head>
      <body className={SpaceMono.className}>{children}</body>
    </html>
  );
}
