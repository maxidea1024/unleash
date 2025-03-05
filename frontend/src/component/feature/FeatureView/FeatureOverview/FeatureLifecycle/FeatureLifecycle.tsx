import { FeatureLifecycleStageIcon } from './FeatureLifecycleStageIcon';
import { FeatureLifecycleTooltip } from './FeatureLifecycleTooltip';
import useFeatureLifecycleApi from 'hooks/api/actions/useFeatureLifecycleApi/useFeatureLifecycleApi';
import { populateCurrentStage } from './populateCurrentStage';
import type { Lifecycle } from 'interfaces/featureToggle';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';

export interface LifecycleFeature {
  lifecycle?: Lifecycle;
  project: string;
  name: string;
  environments?: Array<{
    type: string;
    name: string;
    lastSeenAt?: string | null;
    enabled: boolean;
  }>;
}

type FeatureLifecycleProps = {
  onArchive: () => void;
  onComplete: () => void;
  onUncomplete: () => void;
  feature: LifecycleFeature;
};

export const FeatureLifecycle = ({
  feature,
  onComplete,
  onUncomplete,
  onArchive,
}: FeatureLifecycleProps) => {
  const currentStage = populateCurrentStage(feature);

  const { markFeatureUncompleted, loading } = useFeatureLifecycleApi();

  const { trackEvent } = usePlausibleTracker();

  const onUncompleteHandler = async () => {
    await markFeatureUncompleted(feature.name, feature.project);

    onUncomplete();

    trackEvent('feature-lifecycle', {
      props: {
        eventType: 'uncomplete',
      },
    });
  };

  return currentStage ? (
    <FeatureLifecycleTooltip
      stage={currentStage!}
      project={feature.project}
      onArchive={onArchive}
      onComplete={onComplete}
      onUncomplete={onUncompleteHandler}
      loading={loading}
    >
      <FeatureLifecycleStageIcon stage={currentStage!} />
    </FeatureLifecycleTooltip>
  ) : null;
};
