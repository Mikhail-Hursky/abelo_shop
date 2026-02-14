import { HomePage } from '@pages/HomePage';
import { productApi } from '@entities/products/api';

export default async function Home() {
  const productResponse = await productApi.getProducts();

  return <HomePage products={productResponse.data.products || []} />;
}
