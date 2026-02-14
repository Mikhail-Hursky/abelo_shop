'use client';

import { FC } from 'react';
import { useUserStore } from '@entities/auth';

import styles from './Footer.module.scss';

const year = new Date().getFullYear();

export const Footer: FC = () => {
  const user = useUserStore((state) => state.user);

  return (
    <footer className={styles.container}>
      {`${year} ${user ? `Logged as ${user.email}` : ''}`.trim()}
    </footer>
  );
};
