import type { ComponentProps, ReactNode } from 'react';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Close from '@mui/icons-material/Close';
import { Chip, IconButton, styled } from '@mui/material';
import { FilterItemOperator } from './FilterItemOperator/FilterItemOperator';
import { FILTER_ITEM } from 'utils/testIds';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';

const StyledChip = styled(
  ({
    isActive,
    ...props
  }: { isActive: boolean } & ComponentProps<typeof Chip>) => (
    <Chip data-testid={FILTER_ITEM} {...props} />
  ),
)(({ theme, isActive = false }) => ({
  borderRadius: `${theme.shape.borderRadius}px`,
  padding: 0,
  fontSize: theme.typography.body2.fontSize,
  height: 'auto',
  ...(isActive
    ? {
        backgroundColor: theme.palette.secondary.light,
      }
    : {}),
}));

const StyledLabel = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontWeight: theme.typography.fontWeightBold,
}));

const StyledOptions = styled('button')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  maxWidth: '200px',
  [theme.breakpoints.up('md')]: {
    maxWidth: '800px',
  },
  border: 'none',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  height: theme.spacing(3),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(-1.25),
}));

const Arrow = () => (
  <ArrowDropDown
    fontSize='small'
    color='action'
    sx={(theme) => ({
      marginRight: theme.spacing(-1),
      marginLeft: theme.spacing(0.5),
    })}
  />
);

type FilterItemChipProps = {
  name: string;
  label: ReactNode;
  selectedDisplayOptions?: string[];
  operatorOptions: string[];
  operator: string;
  onChangeOperator: (value: string) => void;
  onClick?: () => void;
  onDelete?: () => void;
};

export const FilterItemChip = ({
  name,
  label,
  selectedDisplayOptions = [],
  operatorOptions,
  operator,
  onChangeOperator,
  onClick,
  onDelete,
}: FilterItemChipProps) => {
  const hasSelectedOptions = selectedDisplayOptions.length > 0;
  const maxExplicitOptions = 2;
  const explicitOptions = selectedDisplayOptions.slice(0, maxExplicitOptions);
  const remainingOptions = selectedDisplayOptions.length - maxExplicitOptions;
  const { trackEvent } = usePlausibleTracker();

  const onChange = (operator: string) => {
    onChangeOperator(operator);

    trackEvent('search-filter', {
      props: {
        label: name,
        operator: operator,
      },
    });
  };

  return (
    <StyledChip
      isActive={hasSelectedOptions}
      label={
        <StyledLabel>
          {label}
          {!hasSelectedOptions ? (
            <Arrow />
          ) : (
            <>
              <FilterItemOperator
                options={operatorOptions}
                value={operator}
                onChange={onChange}
              />
              <StyledOptions>
                {explicitOptions.join(', ')}
                {remainingOptions > 0 ? ` +${remainingOptions}` : ''}
              </StyledOptions>
            </>
          )}
          {onDelete && (
            <StyledIconButton
              aria-label='delete'
              color='primary'
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onDelete?.();
              }}
              size='small'
            >
              <Close fontSize='inherit' color='action' />
            </StyledIconButton>
          )}
        </StyledLabel>
      }
      color='primary'
      variant='outlined'
      onClick={onClick}
    />
  );
};
