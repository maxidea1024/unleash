import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import type { IUiConfig } from 'interfaces/uiConfig';

type IUseSegmentLimits = Pick<
  IUiConfig,
  'segmentValuesLimit' | 'strategySegmentsLimit'
>;

// TODO: Do we really need this? Can't we just get it directly from useUiConfig?
export const useSegmentLimits = (): IUseSegmentLimits => {
  const { uiConfig } = useUiConfig();

  return {
    segmentValuesLimit: uiConfig.segmentValuesLimit,
    strategySegmentsLimit: uiConfig.strategySegmentsLimit,
  };
};
