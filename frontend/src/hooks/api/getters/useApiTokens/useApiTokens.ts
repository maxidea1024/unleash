import useSWR, { type SWRConfiguration } from 'swr';
import { useCallback, useMemo } from 'react';
import { formatApiPath } from 'utils/formatPath';
import handleErrorResponses from '../httpErrorResponseHandler';

export interface IApiToken {
  createdAt: Date;
  username: string;
  secret: string;
  type: string;
  project?: string;
  projects?: string | string[];
  environment: string;
}

export const useApiTokens = (options: SWRConfiguration = {}) => {
  const path = formatApiPath(`api/admin/api-tokens`);
  const { data, error, mutate } = useSWR<IApiToken[]>(path, fetcher, options);

  const tokens = useMemo(() => {
    return data ?? [];
  }, [data]);

  const refetch = useCallback(() => {
    mutate().catch(console.warn);
  }, [mutate]);

  return {
    tokens,
    error,
    loading: !error && !data,
    refetch,
  };
};

// schema 체크는 어떻게 하는거지?
const fetcher = async (path: string): Promise<IApiToken[]> => {
  const res = await fetch(path).then(handleErrorResponses('Api tokens'));
  const data = await res.json();
  return data.tokens;
};
