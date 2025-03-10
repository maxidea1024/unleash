import type { IFeatureStrategy } from 'interfaces/strategy';

export interface DisableEnableStrategyProps {
  projectId: string;
  featureId: string;
  environmentId: string;
  strategy: IFeatureStrategy;
  text?: boolean;
}
