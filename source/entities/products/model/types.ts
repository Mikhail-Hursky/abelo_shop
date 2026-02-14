export interface Product {
  id: 1;
  category: string;
  title: string;
  price: number;
  thumbnail: string;
}

export interface GetProductsResponse {
  products: Product[];
}
