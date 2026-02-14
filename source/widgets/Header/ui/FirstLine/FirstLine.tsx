import { FC } from 'react';
import { useUserStore } from '@entities/auth';
import Link from 'next/link';
import cn from 'clsx';
import { ROUTES } from '@shared/constants';
import { useRouter } from 'next/navigation';

import styles from './FirstLine.module.scss';

export const FirstLine: FC = () => {
  const router = useRouter();
  const { user, logout, loading } = useUserStore((state) => state);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {user && <div className={styles.text}>{`${user.firstName} ${user.lastName}`}</div>}
        <Link
          className={cn(styles.link, {
            [styles.disabled]: loading,
          })}
          onClick={() => {
            if (user) {
              logout().then(() => {
                router.refresh();
              });
            }
          }}
          href={ROUTES.LOGIN}
        >
          {user ? 'Logout' : 'Login'}
        </Link>
      </div>
    </div>
  );
};
