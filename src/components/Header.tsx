'use client';
import { revalidatePath } from 'next/cache';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from './Header.module.css';

const ThemeToggle = dynamic(() => import('./theme-toggle'), {
  ssr: false,
});

export default function Header() {
  return (
    <header className={styles.header}>
      <Link
        href='/'
        onClick={() => revalidatePath('/', 'page')}>
        <h1 aria-label='devFinder Home'>devFinder</h1>
      </Link>
      <ThemeToggle />
    </header>
  );
}
