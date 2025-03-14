import useSWR from 'swr';
import { formatApiPath } from 'utils/formatPath';
import { defaultValue } from './defaultValue';
import type { IUiConfig } from 'interfaces/uiConfig';
import handleErrorResponses from '../httpErrorResponseHandler';
import { useMemo, useCallback } from 'react';

interface IUseUIConfigOutput {
  uiConfig: IUiConfig;
  loading: boolean;
  error?: Error;
  refetch: () => void;
  isOss: () => boolean;
  isPro: () => boolean;
  isEnterprise: () => boolean;
}

const useUiConfig = (): IUseUIConfigOutput => {
  const path = useMemo(() => formatApiPath(`api/admin/ui-config`), []);
  const { data, error, mutate } = useSWR<IUiConfig>(path, fetcher);

  const editionInfo = useMemo(() => {
    const isEnterprise =
      data?.environment?.toLowerCase() !== 'pro' &&
      Boolean(data?.versionInfo?.current?.enterprise);
    const isPro = data?.environment?.toLowerCase() === 'pro';
    const isOss = !data?.versionInfo?.current?.enterprise;

    return { isEnterprise, isPro, isOss };
  }, [data]);

  const uiConfig = useMemo<IUiConfig>(
    () => ({
      ...defaultValue,
      ...data,
      flags: { ...defaultValue.flags, ...data?.flags },
    }),
    [data],
  );

  return {
    uiConfig,
    loading: !error && !data,
    error,
    refetch: mutate,
    isOss: useCallback(() => editionInfo.isOss, [editionInfo]),
    isPro: useCallback(() => editionInfo.isPro, [editionInfo]),
    isEnterprise: useCallback(() => editionInfo.isEnterprise, [editionInfo]),
  };
};

const fetcher = (path: string) => {
  return fetch(path)
    .then(handleErrorResponses('configuration'))
    .then((res) => res.json());
};

export default useUiConfig;
