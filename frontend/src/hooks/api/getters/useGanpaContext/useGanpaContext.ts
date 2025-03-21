import useSWR, { type SWRConfiguration } from 'swr';
import { formatApiPath } from 'utils/formatPath';
import handleErrorResponses from '../httpErrorResponseHandler';
import type { IGanpaContextDefinition } from 'interfaces/context';

interface IGanpaContextOutput {
  context: IGanpaContextDefinition[];
  refetch: () => void;
  loading: boolean;
  error?: Error;
}

const useGanpaContext = (
  options: SWRConfiguration = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
  },
): IGanpaContextOutput => {
  const CONTEXT_CACHE_KEY = 'api/admin/context';

  const { data, mutate, error, isValidating } = useSWR(
    CONTEXT_CACHE_KEY,
    fetcher,
    options,
  );

  return {
    context: data || [],
    error,
    loading: isValidating && !error && !data,
    refetch: mutate,
  };
};

const fetcher = () => {
  const path = formatApiPath(`api/admin/context`);
  return fetch(path, {
    method: 'GET',
  })
    .then(handleErrorResponses('Context variables'))
    .then((res) => res.json());
};

export default useGanpaContext;
