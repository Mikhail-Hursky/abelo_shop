import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Header } from '@widgets/Header';
import { Footer } from '@widgets/Footer';
import { UserStoreProvider } from '@entities/auth';
import { getUserDataSSR } from '@entities/auth/utils/getUserDataSSR';
import { RefreshCookieSetter } from '@shared/utils/RefreshCookieSetter';
import './template.scss';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Abelohost Shop.',
  description: 'Abelohost Shop.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const data = await getUserDataSSR();
  const { userResponse, refreshResponse } = data || {};

  return (
    <html lang='en'>
      <body>
        <RefreshCookieSetter
          refreshToken={refreshResponse?.data.refreshToken}
          accessToken={refreshResponse?.data.accessToken}
        />
        <UserStoreProvider user={userResponse?.data || null}>
          <Header />
          {children}
          <Footer />
        </UserStoreProvider>
      </body>
    </html>
  );
}
