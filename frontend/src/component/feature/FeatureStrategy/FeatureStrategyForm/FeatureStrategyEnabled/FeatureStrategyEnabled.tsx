import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';
import type { IFeatureToggle } from 'interfaces/featureToggle';
import { formatFeaturePath } from '../../FeatureStrategyEdit/FeatureStrategyEdit';
import { useFeature } from 'hooks/api/getters/useFeature/useFeature';

type FeatureStrategyEnabledProps = {
  projectId: string;
  featureId: string;
  environmentId: string;
  isChangeRequest?: boolean;
};

export const FeatureStrategyEnabled = ({
  projectId,
  featureId,
  environmentId,
}: FeatureStrategyEnabledProps) => {
  const featurePagePath = formatFeaturePath(projectId, featureId);
  const { feature } = useFeature(projectId, featureId);

  const featurePageLink = <Link to={featurePagePath}>feature flag page</Link>;

  return isFeatureEnabledInEnvironment(feature, environmentId) ? (
    <Alert severity='success'>
      This feature flag is currently enabled in the{' '}
      <strong>{environmentId}</strong> environment. Any changes made here will
      be available to users as soon as you hit <strong>save</strong>.
    </Alert>
  ) : (
    <Alert severity='warning'>
      This feature flag is currently disabled in the{' '}
      <strong>{environmentId}</strong> environment. Any changes made here will
      not take effect until the flag has been enabled on the {featurePageLink}.
    </Alert>
  );
};

const isFeatureEnabledInEnvironment = (
  feature: IFeatureToggle,
  environmentId: string,
): boolean => {
  const environment = feature.environments.find((environment) => {
    return environment.name === environmentId;
  });

  if (!environment) {
    return false;
  }

  return environment.enabled;
};
