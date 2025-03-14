import { useEffect, useState } from 'react';
import useSWR, { type SWRConfiguration } from 'swr';
import { formatApiPath } from 'utils/formatPath';
import type { IPublicSignupTokens } from 'interfaces/publicSignupTokens';

export const url = 'api/admin/invite-link/tokens';

const fetcher = async () => {
  const path = formatApiPath(url);
  const res = await fetch(path, {
    method: 'GET',
  });
  return await res.json();
};

export const useInviteTokens = (options: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IPublicSignupTokens>(url, fetcher, options);
  const [loading, setLoading] = useState(!error && !data);

  useEffect(() => {
    setLoading(!error && !data);
  }, [data, error]);

  return {
    data: data
      ? { tokens: data.tokens?.filter((token) => token.enabled) }
      : undefined,
    error,
    loading,
  };
};
