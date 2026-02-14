'use client';

import { FC } from 'react';

import { FirstLine } from './FirstLine';
import { SecondLine } from './SecondLine';
import { Navigation } from './Navigation';
import styles from './Header.module.scss';

export const Header: FC = () => (
  <header className={styles.container}>
    <FirstLine />
    <SecondLine />
    <Navigation />
  </header>
);
