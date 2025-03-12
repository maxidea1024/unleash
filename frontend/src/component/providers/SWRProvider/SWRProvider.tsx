import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';
import { ResponseError } from 'utils/apiUtils';
import { useAuthUser } from 'hooks/api/getters/useAuth/useAuthUser';

export const SWRProvider = ({ children }: { children?: ReactNode }) => {
  const { refetchUser } = useAuthUser();

  const onError = (error: Error) => {
    if (error instanceof ResponseError && error.status === 401) {
      // Refetch the user's data if they appear to be logged out.
      // This may trigger a login page redirect in ProtectedRoute.
      refetchUser();
    }
  };

  return <SWRConfig value={{ onError }}>{children}</SWRConfig>;
};
