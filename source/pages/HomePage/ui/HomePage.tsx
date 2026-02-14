'use client';

import { FC } from 'react';
import { Product } from '@entities/products/model';
import { ProductCard } from '@pages/HomePage/ui/ProductCard';
import { useUserStore } from '@entities/auth';

import styles from './HomePage.module.scss';

interface HomePageProps {
  products: Product[];
}

export const HomePage: FC<HomePageProps> = ({ products }) => {
  const user = useUserStore((state) => state.user);

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Latest Products</h2>
        <article className={styles.listing}>
          {products.length
            ? products.map((product) => (
                <ProductCard key={product.id} product={product} isAuth={!!user} />
              ))
            : 'Not found'}
        </article>
      </div>
    </main>
  );
};
