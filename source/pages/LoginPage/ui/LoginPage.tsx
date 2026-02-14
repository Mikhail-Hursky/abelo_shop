'use client';

import { FC, SubmitEvent, useState } from 'react';
import { useUserStore } from '@entities/auth';
import { useRouter } from 'next/navigation';
import { CONFIG } from '@shared/constants';

import styles from './LoginPage.module.scss';

export const LoginPage: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { login, loading: isLoadingUser, errorMessage } = useUserStore((state) => state);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loading = isLoading || isLoadingUser;
  const disabledSubmit = !(
    username.length >= CONFIG.MIN_USERNAME_LENGTH && password.length >= CONFIG.MIN_PASSWORD_LENGTH
  );

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    await login(
      { username, password },
      () => {
        router.refresh();
      },
      () => {
        setIsLoading(false);
      },
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          autoComplete='username'
          placeholder='Username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />

        <input
          className={styles.input}
          autoComplete='password'
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />

        <button className={styles.submitButton} type='submit' disabled={loading || disabledSubmit}>
          {loading ? 'Loading...' : 'Login'}
        </button>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
};
