import { Typography } from '@mui/material';

type UpdateEnabledMessageProps = {
  enabled: boolean;
  featureName: string;
  environment: string;
};

export const UpdateEnabledMessage = ({
  enabled,
  featureName,
  environment,
}: UpdateEnabledMessageProps) => (
  <Typography data-testid='update-enabled-message'>
    <strong>{enabled ? 'Enable' : 'Disable'}</strong> feature flag{' '}
    <strong>{featureName}</strong> in <strong>{environment}</strong>
  </Typography>
);
