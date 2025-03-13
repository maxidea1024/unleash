import useSWR, { mutate, type SWRConfiguration } from 'swr';
import { useState, useEffect } from 'react';
import { formatApiPath } from 'utils/formatPath';
import type { ITagType } from 'interfaces/tags';
import handleErrorResponses from '../httpErrorResponseHandler';

const useTagTypes = (options: SWRConfiguration = {}) => {
  const KEY = `api/admin/tag-types`;

  const { data, error } = useSWR(KEY, fetcher, options); // TODO: 가져온 데이터의 스키마 검증은 어떻게 하는가?
  const [loading, setLoading] = useState(!error && !data);

  const refetch = () => {
    mutate(KEY);
  };

  useEffect(() => {
    setLoading(!error && !data);
  }, [data, error]);

  return {
    tagTypes: (data?.tagTypes as ITagType[]) || [],
    error,
    loading,
    refetch,
  };
};

const fetcher = async () => {
  const path = formatApiPath(`api/admin/tag-types`);
  const res = await fetch(path, {
    method: 'GET',
  }).then(handleErrorResponses('Tag types'));
  return res.json();
};

export default useTagTypes;
