import { createStore } from 'zustand';
import { LoginRequest, User } from '@entities/auth/model';
import { authApi } from '@entities/auth/api';
import { AxiosError } from 'axios';

const defaultInitState: UserState = {
  user: null,
  loading: false,
  errorMessage: '',
};

export type UserState = {
  user: User | null;
  loading: boolean;
  errorMessage: string;
};

export type UserActions = {
  login: (user: LoginRequest, onSuccess: () => void, onError: () => void) => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

export type UserStore = UserState & UserActions;

export const createUserStore = (initState: UserState = defaultInitState) =>
  createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user: User | null) => set({ ...defaultInitState, user }),
    logout: async () => {
      await authApi.logout().then(() => {
        set(defaultInitState);
      });
    },
    login: async (credentials: LoginRequest, onSuccess: () => void, onError: () => void) => {
      set({ loading: true });
      await authApi
        .login(credentials)
        .then((response) => {
          set({ user: response.data, loading: false, errorMessage: '' });
          onSuccess();

          return response;
        })
        .catch((error) => {
          if (error instanceof AxiosError && error.response) {
            set({ loading: false, errorMessage: error.response.data.message, user: null });
          } else {
            set({ loading: false, errorMessage: error.message, user: null });
          }

          onError();
        });
    },
  }));
