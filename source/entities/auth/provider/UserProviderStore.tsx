'use client';

import { type ReactNode, createContext, useState, useContext } from 'react';
import { useStore } from 'zustand';

import { User } from '../model';

import { UserStore, createUserStore } from './UserStore';

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreProviderContext = createContext<UserStoreApi | undefined>(undefined);

export interface UserStoreProviderProps {
  children: ReactNode;
  user: User | null;
}

export const UserStoreProvider = ({ children, user }: UserStoreProviderProps) => {
  const [store] = useState(() =>
    createUserStore({
      user,
      loading: false,
      errorMessage: '',
    }),
  );

  return (
    <UserStoreProviderContext.Provider value={store}>{children}</UserStoreProviderContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreProviderContext);

  if (!userStoreContext) {
    throw new Error(`useCounterStore must be used within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
