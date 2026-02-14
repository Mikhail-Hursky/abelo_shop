import { axiosInstance } from '@shared/api';
import { AxiosResponse } from 'axios';
import { GetProductsResponse } from '@entities/products/model/types';

const limit = 12;

export const productApi = {
  getProducts: (): Promise<AxiosResponse<GetProductsResponse>> =>
    axiosInstance.get<GetProductsResponse>(
      `/products?limit=${limit}&select=category,title,price,thumbnail`,
    ),
};
