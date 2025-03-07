import { useMemo } from 'react';
import 'chartjs-adapter-date-fns';
import type { InstanceInsightsSchema } from 'openapi';
import {
  LineChart,
  NotEnoughData,
} from 'component/insights/components/LineChart/LineChart';
import { useProjectChartData } from 'component/insights/hooks/useProjectChartData';
import { usePlaceholderData } from 'component/insights/hooks/usePlaceholderData';
import type { GroupedDataByProject } from 'component/insights/hooks/useGroupedProjectTrends';

type UsersPerProjectChartProps = {
  projectFlagTrends: GroupedDataByProject<
    InstanceInsightsSchema['projectFlagTrends']
  >;
  isLoading?: boolean;
};

export const UsersPerProjectChart = ({
  projectFlagTrends,
  isLoading,
}: UsersPerProjectChartProps) => {
  const placeholderData = usePlaceholderData({
    type: 'constant',
  });

  const data = useProjectChartData(projectFlagTrends);
  const notEnoughData = useMemo(
    () => !isLoading && !data.datasets.some((d) => d.data.length > 1),
    [data, isLoading],
  );

  return (
    <LineChart
      data={notEnoughData || isLoading ? placeholderData : data}
      overrideOptions={{
        parsing: {
          yAxisKey: 'users',
          xAxisKey: 'date',
        },
      }}
      cover={notEnoughData ? <NotEnoughData /> : isLoading}
    />
  );
};
