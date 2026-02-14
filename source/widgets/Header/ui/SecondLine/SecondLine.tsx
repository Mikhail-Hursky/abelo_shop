import { FC } from 'react';

import styles from './SecondLine.module.scss';

export const SecondLine: FC = () => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        Abelohost Shop <span>.</span>
      </h1>
      <div className={styles.logo} />
    </div>
  </div>
);
