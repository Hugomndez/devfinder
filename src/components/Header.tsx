import dynamic from 'next/dynamic';
import styles from './Header.module.css';

const ThemeButton = dynamic(() => import('../components/ThemeButton'), {
  ssr: false,
});

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>devfinder</h1>
      <ThemeButton />
    </header>
  );
}
