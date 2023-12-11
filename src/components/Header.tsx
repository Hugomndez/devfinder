import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from './Header.module.css';

const ThemeButton = dynamic(() => import('../components/ThemeButton'), {
  ssr: false,
});

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <h1>devFinder</h1>
      </Link>
      <ThemeButton />
    </header>
  );
}
