export interface Product {
  id: number;
  category: string;
  title: string;
  price: number;
  thumbnail: string;
}

export interface GetProductsResponse {
  products: Product[];
}
