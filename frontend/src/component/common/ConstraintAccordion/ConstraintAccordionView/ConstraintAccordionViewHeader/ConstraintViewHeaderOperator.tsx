import type { IConstraint } from 'interfaces/strategy';
import { Tooltip, Box, styled } from '@mui/material';
import { stringOperators } from 'constants/operators';
import { ReactComponent as NegatedOnIcon } from 'assets/icons/not_operator_selected.svg';
import { ConstraintOperator } from '../../ConstraintOperator/ConstraintOperator';
import { StyledIconWrapper } from './StyledIconWrapper';
import { ReactComponent as CaseSensitive } from 'assets/icons/24_Text format.svg';
import { oneOf } from 'utils/oneOf';
import { useTheme } from '@mui/material';

const StyledHeaderValuesContainerWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  margin: 'auto 0',
}));

const StyledHeaderConstraintContainer = styled('div')(({ theme }) => ({
  minWidth: '152px',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    paddingRight: 0,
  },
}));

type ConstraintViewHeaderOperatorProps = {
  constraint: IConstraint;
  disabled?: boolean;
};

export const ConstraintViewHeaderOperator = ({
  constraint,
  disabled = false,
}: ConstraintViewHeaderOperatorProps) => {
  const theme = useTheme();

  return (
    <StyledHeaderValuesContainerWrapper>
      {Boolean(constraint.inverted) && (
        <Tooltip title={'Operator is negated'} arrow>
          <Box sx={{ display: 'flex' }}>
            <StyledIconWrapper isPrefix>
              <NegatedOnIcon />
            </StyledIconWrapper>
          </Box>
        </Tooltip>
      )}
      <StyledHeaderConstraintContainer>
        <ConstraintOperator
          constraint={constraint}
          hasPrefix={Boolean(constraint.inverted)}
          disabled={disabled}
        />
      </StyledHeaderConstraintContainer>
      {!constraint.caseInsensitive &&
        oneOf(stringOperators, constraint.operator) && (
          <Tooltip title='Case sensitive is active' arrow>
            <StyledIconWrapper>
              <CaseSensitive />
            </StyledIconWrapper>
          </Tooltip>
        )}
    </StyledHeaderValuesContainerWrapper>
  );
};
