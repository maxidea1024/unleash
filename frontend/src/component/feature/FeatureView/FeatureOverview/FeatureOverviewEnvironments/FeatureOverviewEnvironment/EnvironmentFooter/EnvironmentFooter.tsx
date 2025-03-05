import type { IFeatureEnvironmentMetrics } from 'interfaces/featureToggle';
import { FeatureMetricsStats } from 'component/feature/FeatureView/FeatureMetrics/FeatureMetricsStats/FeatureMetricsStats';
import { SectionSeparator } from '../SectionSeparator/SectionSeparator';

type EnvironmentFooterProps = {
  environmentMetric?: IFeatureEnvironmentMetrics;
};

export const EnvironmentFooter = ({
  environmentMetric,
}: EnvironmentFooterProps) => {
  if (!environmentMetric) {
    return null;
  }

  return (
    <>
      <SectionSeparator>Feature flag exposure</SectionSeparator>

      <div>
        <FeatureMetricsStats
          totalYes={environmentMetric.yes}
          totalNo={environmentMetric.no}
          hoursBack={1}
        />
      </div>
    </>
  );
};
