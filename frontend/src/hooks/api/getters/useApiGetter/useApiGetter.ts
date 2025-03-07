import useSWR, { type SWRConfiguration, type Key } from 'swr';
import { useCallback } from 'react';
import handleErrorResponses from '../httpErrorResponseHandler';

interface IUseApiGetterOutput<T> {
  data?: T;
  refetch: () => void;
  error?: Error | undefined;
  loading: boolean;
}

export const useApiGetter = <T>(
  cacheKey: Key,
  fetcher: () => Promise<T>,
  options?: SWRConfiguration,
): IUseApiGetterOutput<T> => {
  const { data, error, mutate } = useSWR<T>(cacheKey, fetcher, options);

  const refetch = useCallback(() => {
    mutate().catch(console.warn);
  }, [mutate]);

  return {
    data,
    error,
    refetch,
    loading: !error && !data,
  };
};

// TODO:
// 이걸 범용으로 사용하면 되는데, 개별로 만들고 있는 경우가 많다.
// 이 함수를 사용하는 형태로 바꿔주자.

export const fetcher = (path: string, errorTarget: string) => {
  return fetch(path)
    .then(handleErrorResponses(errorTarget))
    .then((res) => res.json());
};
