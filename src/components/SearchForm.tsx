'use client';

import getUserData from '@/lib/getUserData';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import styles from './SearchForm.module.css';

export default function SearchForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = event.currentTarget.username.value.trim();
    const encodedQuery = encodeURIComponent(query);

    setIsLoading(true);

    router.push(`/?q=${encodedQuery}`);

    const { notFound, rateLimited } = await getUserData(query);

    setIsLoading(false);

    if (notFound) {
      setErrorMessage('No results');
      return;
    }
    if (rateLimited) {
      setErrorMessage('Rate limited');
      return;
    }

    setErrorMessage('');
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={styles.form}>
      <input
        type='text'
        name='username'
        placeholder='Search GitHub username…'
        autoFocus
        required
      />
      <SearchIconSVG />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
      <button
        type='submit'
        disabled={isLoading}>
        {isLoading ? <div className={styles.spinner} /> : 'Search'}
      </button>
    </form>
  );
}

function SearchIconSVG() {
  return (
    <svg
      height='24'
      width='25'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10.609 0c5.85 0 10.608 4.746 10.608 10.58 0 2.609-.952 5-2.527 6.847l5.112 5.087a.87.87 0 01-1.227 1.233l-5.118-5.093a10.58 10.58 0 01-6.848 2.505C4.759 21.16 0 16.413 0 10.58 0 4.747 4.76 0 10.609 0zm0 1.74c-4.891 0-8.87 3.965-8.87 8.84 0 4.874 3.979 8.84 8.87 8.84a8.855 8.855 0 006.213-2.537l.04-.047a.881.881 0 01.058-.053 8.786 8.786 0 002.558-6.203c0-4.875-3.979-8.84-8.87-8.84z'
        fill='#0079ff'
      />
    </svg>
  );
}
