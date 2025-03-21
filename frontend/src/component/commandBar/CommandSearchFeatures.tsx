import {
  CommandResultGroup,
  type ICommandResultGroupItem,
} from './RecentlyVisited/CommandResultGroup';
import { useFeatureSearch } from 'hooks/api/getters/useFeatureSearch/useFeatureSearch';
import { useEffect } from 'react';

export type ICommandQueryCounter = {
  query: string;
  count: number;
};

type CommandBarProps = {
  searchString: string;
  setSearchedFlagCount: (count: ICommandQueryCounter) => void;
  onClick: () => void;
  setSearchLoading: (loading: boolean) => void;
};

export const CommandSearchFeatures = ({
  searchString,
  setSearchedFlagCount,
  onClick,
  setSearchLoading,
}: CommandBarProps) => {
  const { features = [], loading } = useFeatureSearch(
    {
      query: searchString,
      limit: '3',
    },
    {
      revalidateOnFocus: false,
    },
    'command-bar-cache',
  );

  const flags: ICommandResultGroupItem[] = features.map((feature) => ({
    name: feature.name,
    link: `/projects/${feature.project}/features/${feature.name}`,
    description: feature.description,
  }));

  useEffect(() => {
    setSearchedFlagCount({ count: flags.length, query: searchString });
  }, [loading]);

  useEffect(() => {
    setSearchLoading(loading);
  }, [loading]);

  return (
    !loading && (
      <CommandResultGroup
        groupName={'Flags'}
        icon={'flag'}
        items={flags}
        onClick={onClick}
      />
    )
  );
};
