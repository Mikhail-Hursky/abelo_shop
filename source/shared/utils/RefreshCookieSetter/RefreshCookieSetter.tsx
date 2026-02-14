'use client';

import { FC, useEffect } from 'react';

import { setCookie } from './setCookie';

interface RefreshCookieSetterProps {
  accessToken?: string;
  refreshToken?: string;
}

export const RefreshCookieSetter: FC<RefreshCookieSetterProps> = ({
  accessToken,
  refreshToken,
}) => {
  useEffect(() => {
    if (accessToken && refreshToken) {
      setCookie({
        accessToken,
        refreshToken,
      }).then();
    }
  }, [accessToken, refreshToken]);

  return null;
};
