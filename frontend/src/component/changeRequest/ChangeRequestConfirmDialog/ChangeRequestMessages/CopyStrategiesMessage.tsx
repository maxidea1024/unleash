import { styled, Typography } from '@mui/material';
import { formatStrategyName } from 'utils/strategyNames';
import type { IFeatureStrategyPayload } from 'interfaces/strategy';

const MsgContainer = styled('div')(({ theme }) => ({
  '&>*:nth-child(n)': {
    margin: theme.spacing(1, 0),
  },
}));

type CopyStrategiesMessageProps = {
  payload?: IFeatureStrategyPayload[];
  fromEnvironment?: string;
  environment?: string;
};

export const CopyStrategiesMessage = ({
  payload,
  fromEnvironment,
  environment,
}: CopyStrategiesMessageProps) => (
  <MsgContainer>
    <Typography>
      <strong>Copy: </strong>
    </Typography>
    {payload?.map((strategy) => (
      <Typography>
        <strong>
          {formatStrategyName(strategy?.name || '')} strategy{' '}
        </strong>{' '}
      </Typography>
    ))}
    <Typography>
      from {fromEnvironment} to {environment}
    </Typography>
  </MsgContainer>
);
