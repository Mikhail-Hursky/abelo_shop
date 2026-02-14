export interface LoginRequest {
  username: string;
  password: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends RefreshResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
