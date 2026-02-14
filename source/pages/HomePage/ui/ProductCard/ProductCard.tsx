import { FC } from 'react';
import Image from 'next/image';
import { Product } from '@entities/products/model';

import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  isAuth: boolean;
}

export const ProductCard: FC<ProductCardProps> = ({ product, isAuth }) => (
  <div className={styles.container}>
    <Image
      loading='lazy'
      className={styles.image}
      width={300}
      height={300}
      src={product.thumbnail}
      alt={product.title}
    />
    <div className={styles.title}>{product.title}</div>
    <div className={styles.category}>{product.category}</div>
    <div className={styles.price}>${product.price}</div>

    {isAuth && <button className={styles.button}>Add to cart</button>}
  </div>
);
