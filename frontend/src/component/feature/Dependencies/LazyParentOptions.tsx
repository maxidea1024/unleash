import { useParentOptions } from 'hooks/api/getters/useFeatureDependencyOptions/useFeatureDependencyOptions';
import { REMOVE_DEPENDENCY_OPTION } from './constants';
import { StyledSelect } from './FeatureStatusOptions';

type LazyParentOptionsProps = {
  project: string;
  featureId: string;
  parent: string;
  onSelect: (parent: string) => void;
};

// Project can have 100s of parents. We want to read them only when the modal for dependencies opens.
export const LazyParentOptions = ({
  project,
  featureId,
  parent,
  onSelect,
}: LazyParentOptionsProps) => {
  const { parentOptions } = useParentOptions(project, featureId);

  const options = parentOptions
    ? [
        REMOVE_DEPENDENCY_OPTION,
        ...parentOptions.map((parent) => ({
          key: parent,
          label: parent,
        })),
      ]
    : [REMOVE_DEPENDENCY_OPTION];

  return (
    <StyledSelect
      fullWidth
      options={options}
      value={parent}
      onChange={onSelect}
    />
  );
};
