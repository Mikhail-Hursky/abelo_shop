import { FC } from 'react';
import Link from 'next/link';
import { ROUTES } from '@shared/constants';

import styles from './Navigation.module.scss';

const urls = [
  'Home',
  'Hot Deals',
  'Categories',
  'Laptops',
  'Smartphones',
  'Cameras',
  'Accessories',
];

export const Navigation: FC = () => (
  <div className={styles.container}>
    <nav>
      <ol className={styles.wrapper}>
        {urls.map((text) => (
          <li key={text}>
            <Link href={ROUTES.HOME}>{text}</Link>
          </li>
        ))}
      </ol>
    </nav>
  </div>
);
