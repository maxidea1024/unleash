import { ReactComponent as InitialStageIcon } from 'assets/icons/stage-initial.svg';
import { ReactComponent as PreLiveStageIcon } from 'assets/icons/stage-pre-live.svg';
import { ReactComponent as LiveStageIcon } from 'assets/icons/stage-live.svg';
import { ReactComponent as CompletedStageIcon } from 'assets/icons/stage-completed.svg';
import { ReactComponent as ArchivedStageIcon } from 'assets/icons/stage-archived.svg';
import type { LifecycleStage } from './LifecycleStage';

type FeatureLifecycleStageIconProps = {
  stage: Pick<LifecycleStage, 'name'>;
};

export const FeatureLifecycleStageIcon = ({
  stage,
}: FeatureLifecycleStageIconProps) => {
  if (stage.name === 'archived') {
    return <ArchivedStageIcon />;
  } else if (stage.name === 'pre-live') {
    return <PreLiveStageIcon />;
  } else if (stage.name === 'live') {
    return <LiveStageIcon />;
  } else if (stage.name === 'completed') {
    return <CompletedStageIcon />;
  } else {
    return <InitialStageIcon />;
  }
};
