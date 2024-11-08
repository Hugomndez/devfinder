'use client';

import type { DataResponse } from '@/types';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { use, useState } from 'react';
import { useFormStatus } from 'react-dom';
import styles from './search-form.module.css';

type Props = {
  dataPromise: Promise<DataResponse>;
};

export default function SearchForm({ dataPromise }: Props) {
  const [formState, setFormState] = useState({ username: '' });
  const data = use(dataPromise);
  const router = useRouter();

  const searchAction = (payload: FormData) => {
    const username = payload.get('username') as string;
    const encodedQuery = encodeURIComponent(username).toLocaleLowerCase();
    router.push(`/?q=${encodedQuery}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormState((prev) => ({ ...prev, [name]: value.trim() }));
  };

  return (
    <form
      className={styles.form}
      action={searchAction}>
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
      {data.status === 'error' && <span className={styles.error}>{data.message}</span>}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}>
      {pending ? <div className={styles.spinner} /> : 'Search'}
    </button>
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
