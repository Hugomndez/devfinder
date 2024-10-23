import Link from 'next/link';
import { Suspense } from 'react';
import styles from './Header.module.css';
import ThemeButton from './ThemeButton';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <h1 aria-label='devFinder Home'>devFinder</h1>
      </Link>
      <Suspense fallback={null}>
        <ThemeButton />
      </Suspense>
    </header>
  );
}
