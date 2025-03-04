import type { FC } from 'react';
import { Alert } from '@mui/material';

type FeatureStrategyChangeRequestAlertProps = {
  environment?: string;
};

export const FeatureStrategyChangeRequestAlert: FC<
  FeatureStrategyChangeRequestAlertProps
> = ({ environment }) => (
  <Alert severity='info'>
    <strong>Change requests</strong> are enabled
    {environment ? ` for ${environment}` : ''}. Your changes needs to be
    approved before they will be live. All the changes you do now will be added
    into a draft that you can submit for review.
  </Alert>
);
