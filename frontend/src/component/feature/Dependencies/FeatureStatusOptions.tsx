import type { ParentValue } from './constants';
import { styled } from '@mui/material';
import GeneralSelect from '../../common/GeneralSelect/GeneralSelect';

export const StyledSelect = styled(GeneralSelect)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
}));

type FeatureStatusOptionsProps = {
  parentValue: ParentValue;
  onSelect: (parent: string) => void;
};

export const FeatureStatusOptions = ({
  onSelect,
  parentValue,
}: FeatureStatusOptionsProps) => {
  return (
    <StyledSelect
      fullWidth
      options={[
        { key: 'enabled', label: 'enabled' },
        {
          key: 'enabled_with_variants',
          label: 'enabled with variants',
        },
        { key: 'disabled', label: 'disabled' },
      ]}
      value={parentValue.status}
      onChange={onSelect}
    />
  );
};
