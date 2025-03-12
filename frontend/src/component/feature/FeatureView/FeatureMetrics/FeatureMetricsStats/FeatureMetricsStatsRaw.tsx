import type { IFeatureMetricsRaw } from 'interfaces/featureToggle';
import { useMemo } from 'react';
import {
  FeatureMetricsStats,
  type FeatureMetricsStatsProps,
} from './FeatureMetricsStats';

type FeatureMetricsStatsRawProps = Omit<
  FeatureMetricsStatsProps,
  'totalYes' | 'totalNo'
> & {
  metrics: IFeatureMetricsRaw[];
};

export const FeatureMetricsStatsRaw = ({
  metrics,
  ...rest
}: FeatureMetricsStatsRawProps) => {
  const totalYes = useMemo(() => {
    return metrics.reduce((acc, m) => acc + m.yes, 0);
  }, [metrics]);

  const totalNo = useMemo(() => {
    return metrics.reduce((acc, m) => acc + m.no, 0);
  }, [metrics]);

  return (
    <FeatureMetricsStats {...rest} totalYes={totalYes} totalNo={totalNo} />
  );
};
