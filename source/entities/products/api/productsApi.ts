import { axiosInstance } from '@shared/api';
import { AxiosResponse } from 'axios';
import { GetProductsResponse } from '@entities/products/model/types';
import { CONFIG } from '@shared/constants';

export const productApi = {
  getProducts: (): Promise<AxiosResponse<GetProductsResponse>> =>
    axiosInstance.get<GetProductsResponse>(
      `/products?limit=${CONFIG.PRODUCTS_PER_PAGE}&select=category,title,price,thumbnail`,
    ),
};
