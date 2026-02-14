import axios, { AxiosResponse } from 'axios';
import { CONFIG } from '@shared/constants';

import { User, LoginRequest, LoginResponse, RefreshResponse } from '../model/types';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  timeout: CONFIG.API_TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: (credentials: LoginRequest): Promise<AxiosResponse<LoginResponse>> =>
    apiClient.post<LoginResponse>('/api/auth/login', {
      ...credentials,
    }),

  getAuthUser: (token: string) => apiClient.get<User>('/api/auth/me?token=' + token),

  refreshToken: (token: string) =>
    apiClient.post<RefreshResponse>('/api/auth/refresh', {
      token,
    }),

  logout: () => apiClient.post('/api/auth/logout'),
};
