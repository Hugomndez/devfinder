'use client';

import { useRouter } from 'next/navigation';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import styles from './search-form.module.css';

type SearchFormProps = {
  isError: boolean;
  message?: string;
};

const initialState = { username: '' };

export default function SearchForm(props: SearchFormProps) {
  const [formState, setFormState] = useState(initialState);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const encodedQuery = encodeURIComponent(formState.username);
    setFormState(initialState);
    router.push(`/?q=${encodedQuery}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormState((prev) => ({ ...prev, [name]: value.trim() }));
  };

  //Todo: Add loading state.

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}>
      <input
        type='text'
        name='username'
        value={formState.username}
        onChange={handleChange}
        placeholder='Search GitHub username…'
        autoFocus
        required
      />
      <SearchIconSVG />
      {props.isError && <span className={styles.error}>{props.message}</span>}
      <button
        type='submit'
        disabled={false}>
        {false ? <div className={styles.spinner} /> : 'Search'}
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
