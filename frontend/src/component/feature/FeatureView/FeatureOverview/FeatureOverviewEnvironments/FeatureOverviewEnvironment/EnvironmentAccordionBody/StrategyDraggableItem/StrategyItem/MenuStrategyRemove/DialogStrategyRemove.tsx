import type React from 'react';
import useFeatureStrategyApi from 'hooks/api/actions/useFeatureStrategyApi/useFeatureStrategyApi';
import { formatUnknownError } from 'utils/formatUnknownError';
import { Link, useNavigate } from 'react-router-dom';
import useToast from 'hooks/useToast';
import { formatFeaturePath } from '../../../../../../../../FeatureStrategy/FeatureStrategyEdit/FeatureStrategyEdit';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import { Alert, styled, Typography } from '@mui/material';
import { useFeature } from 'hooks/api/getters/useFeature/useFeature';
import { useChangeRequestApi } from 'hooks/api/actions/useChangeRequestApi/useChangeRequestApi';
import { useChangeRequestsEnabled } from 'hooks/useChangeRequestsEnabled';
import { usePendingChangeRequests } from 'hooks/api/getters/usePendingChangeRequests/usePendingChangeRequests';
import { useScheduledChangeRequestsWithStrategy } from 'hooks/api/getters/useScheduledChangeRequestsWithStrategy/useScheduledChangeRequestsWithStrategy';

type FeatureStrategyRemoveProps = {
  projectId: string;
  featureId: string;
  environmentId: string;
  strategyId: string;
  disabled?: boolean;
  icon?: boolean;
};

type ChangeRequest = {
  id: number;
  title?: string;
};

type ScheduledChangeRequestData = {
  changeRequests?: ChangeRequest[];
  projectId: string;
};

type FeatureStrategyRemoveDialogueProps = {
  onRemove: (event: React.FormEvent) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
  scheduledChangeRequestsForStrategy: ScheduledChangeRequestData;
};

const RemoveAlert = () => (
  <Alert severity='error'>
    Removing the strategy will change which users receive access to the feature.
  </Alert>
);

const AlertContainer = styled('div')(({ theme }) => ({
  '> * + *': {
    marginTop: theme.spacing(1),
  },
}));

type StrategyInScheduledChangeRequestsWarningProps = {
  changeRequests?: ChangeRequest[];
  projectId: string;
};

const StrategyInScheduledChangeRequestsWarning = ({
  changeRequests,
  projectId,
}: StrategyInScheduledChangeRequestsWarningProps) => {
  if (changeRequests && changeRequests.length > 0) {
    return (
      <Alert severity='warning'>
        <p>
          This strategy is in use by at least one scheduled change request. If
          you remove it, those change requests can no longer be applied.
        </p>
        <p>The following scheduled change requests use this strategy:</p>
        <ul>
          {changeRequests.map(({ id, title }) => {
            const text = title ? `#${id} (${title})` : `#${id}`;
            return (
              <li key={id}>
                <Link
                  to={`/projects/${projectId}/change-requests/${id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  title={`Change request ${id}`}
                >
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </Alert>
    );
  } else if (changeRequests === undefined) {
    return (
      <Alert severity='warning'>
        <p>
          This strategy may be in use by one or more scheduled change requests.
          If you remove it, those change requests can no longer be applied.
        </p>
      </Alert>
    );
  }

  // all good, we have nothing to show
  return null;
};

type AlertsProps = {
  scheduledChangeRequestsForStrategy: ScheduledChangeRequestData;
};

const Alerts = ({ scheduledChangeRequestsForStrategy }: AlertsProps) => (
  <AlertContainer>
    <RemoveAlert />
    <StrategyInScheduledChangeRequestsWarning
      projectId={scheduledChangeRequestsForStrategy.projectId}
      changeRequests={scheduledChangeRequestsForStrategy.changeRequests}
    />
  </AlertContainer>
);

export const FeatureStrategyRemoveDialogue = ({
  onRemove,
  onClose,
  isOpen,
  scheduledChangeRequestsForStrategy,
}: FeatureStrategyRemoveDialogueProps) => {
  return (
    <Dialogue
      title='Are you sure you want to delete this strategy?'
      open={isOpen}
      primaryButtonText='Remove strategy'
      secondaryButtonText='Cancel'
      onClick={onRemove}
      onClose={onClose}
    >
      <Alerts
        scheduledChangeRequestsForStrategy={scheduledChangeRequestsForStrategy}
      />
    </Dialogue>
  );
};

const MsgContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1),
}));

export const SuggestFeatureStrategyRemoveDialogue = ({
  onRemove,
  onClose,
  isOpen,
  scheduledChangeRequestsForStrategy,
}: FeatureStrategyRemoveDialogueProps) => {
  return (
    <Dialogue
      title='Suggest changes'
      open={isOpen}
      primaryButtonText='Add suggestion to draft'
      secondaryButtonText='Cancel'
      onClick={onRemove}
      onClose={onClose}
    >
      <Alerts
        scheduledChangeRequestsForStrategy={scheduledChangeRequestsForStrategy}
      />
      <MsgContainer>
        <Typography variant='body2' color='text.secondary'>
          Your suggestion:
        </Typography>
      </MsgContainer>
      <Typography fontWeight='bold'>Remove strategy</Typography>
    </Dialogue>
  );
};

type RemoveProps = {
  projectId: string;
  featureId: string;
  environmentId: string;
  strategyId: string;
};

const useOnRemove = ({
  projectId,
  featureId,
  environmentId,
  strategyId,
}: RemoveProps) => {
  const { deleteStrategyFromFeature } = useFeatureStrategyApi();
  const { setToastData, setToastApiError } = useToast();
  const navigate = useNavigate();
  const { refetchFeature } = useFeature(projectId, featureId);

  const onRemove = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      await deleteStrategyFromFeature(
        projectId,
        featureId,
        environmentId,
        strategyId,
      );
      setToastData({
        title: 'Strategy deleted',
        type: 'success',
      });
      refetchFeature();
      navigate(formatFeaturePath(projectId, featureId));
    } catch (error: unknown) {
      setToastApiError(formatUnknownError(error));
    }
  };
  return onRemove;
};

const useOnSuggestRemove = ({
  projectId,
  featureId,
  environmentId,
  strategyId,
}: RemoveProps) => {
  const { addChange } = useChangeRequestApi();
  const { refetch: refetchChangeRequests } =
    usePendingChangeRequests(projectId);
  const { setToastData, setToastApiError } = useToast();
  const onSuggestRemove = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      await addChange(projectId, environmentId, {
        action: 'deleteStrategy',
        feature: featureId,
        payload: {
          id: strategyId,
        },
      });
      setToastData({
        title: 'Changes added to the draft!',
        type: 'success',
      });
      await refetchChangeRequests();
    } catch (error: unknown) {
      setToastApiError(formatUnknownError(error));
    }
  };
  return onSuggestRemove;
};

type DialogStrategyRemoveProps = FeatureStrategyRemoveProps & {
  isOpen: boolean;
  onClose: () => void;
};

export const DialogStrategyRemove = ({
  projectId,
  featureId,
  environmentId,
  strategyId,
  isOpen,
  onClose,
}: DialogStrategyRemoveProps) => {
  const { isChangeRequestConfigured } = useChangeRequestsEnabled(projectId);

  const { changeRequests } = useScheduledChangeRequestsWithStrategy(
    projectId,
    strategyId,
  );

  const changeRequestData = {
    changeRequests,
    projectId,
  };

  const onRemove = useOnRemove({
    featureId,
    projectId,
    strategyId,
    environmentId,
  });
  const onSuggestRemove = useOnSuggestRemove({
    featureId,
    projectId,
    strategyId,
    environmentId,
  });

  if (isChangeRequestConfigured(environmentId)) {
    return (
      <SuggestFeatureStrategyRemoveDialogue
        isOpen={isOpen}
        onClose={() => onClose()}
        onRemove={async (e) => {
          await onSuggestRemove(e);
          onClose();
        }}
        scheduledChangeRequestsForStrategy={changeRequestData}
      />
    );
  }

  return (
    <FeatureStrategyRemoveDialogue
      isOpen={isOpen}
      onClose={() => onClose()}
      onRemove={onRemove}
      scheduledChangeRequestsForStrategy={changeRequestData}
    />
  );
};
