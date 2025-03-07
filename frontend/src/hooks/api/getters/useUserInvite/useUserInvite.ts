import { useEffect, useState } from 'react';
import useSWR, { type SWRConfiguration } from 'swr';
import { OK } from 'constants/statusCodes';
import useQueryParams from 'hooks/useQueryParams';
import { formatApiPath } from 'utils/formatPath';

export const useUserInvite = (options: SWRConfiguration = {}) => {
  const query = useQueryParams();
  const secret = query.get('invite') || '';
  const url = `/invite/${secret}/validate`;
  const { data, error } = useSWR<boolean>(
    url,
    getFetcher(secret, url),
    options,
  );
  const [loading, setLoading] = useState(!error && !data);

  useEffect(() => {
    setLoading(!error && data === undefined);
  }, [data, error]);

  return {
    secret,
    isValid: data,
    error,
    loading,
  };
};

const getFetcher = (token: string, url: string) => async () => {
  if (!token) {
    return Promise.resolve(false);
  }

  const path = formatApiPath(url);
  const response = await fetch(path, {
    method: 'GET',
  });
  return response.status === OK;
};
