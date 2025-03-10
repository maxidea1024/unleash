import {
  getFeatureStrategyIcon,
  formatStrategyName,
} from 'utils/strategyNames';
import { styled, Tooltip } from '@mui/material';
import type { IFeatureStrategy } from 'interfaces/strategy';

type FeatureStrategyIconProps = {
  strategy: IFeatureStrategy;
};

export const FeatureStrategyIcon = ({ strategy }: FeatureStrategyIconProps) => {
  const Icon = getFeatureStrategyIcon(strategy.name);

  return (
    <Tooltip
      title={
        formatStrategyName(strategy.name) +
        (strategy.title ? ` - ${strategy.title}` : '')
      }
      arrow
    >
      <StyledIcon>
        <Icon />
      </StyledIcon>
    </Tooltip>
  );
};

const StyledIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.action.disabled,

  '& svg': {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
}));
