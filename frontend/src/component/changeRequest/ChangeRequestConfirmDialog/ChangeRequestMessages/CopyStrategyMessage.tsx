import { Typography } from '@mui/material';
import { formatStrategyName } from 'utils/strategyNames';
import type { IFeatureStrategyPayload } from 'interfaces/strategy';

type CopyStrategyMessageProps = {
  payload?: IFeatureStrategyPayload;
  fromEnvironment?: string;
  environment?: string;
};

export const CopyStrategyMessage = ({
  payload,
  fromEnvironment,
  environment,
}: CopyStrategyMessageProps) => (
  <Typography>
    <strong>Copy {formatStrategyName(payload?.name || '')} strategy </strong>{' '}
    from {fromEnvironment} to {environment}
  </Typography>
);
