import { useState } from 'react';
import { Alert, Box, styled, Typography } from '@mui/material';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import GeneralSelect from 'component/common/GeneralSelect/GeneralSelect';
import useToast from 'hooks/useToast';
import type { FeatureSchema } from 'openapi';
import { formatUnknownError } from 'utils/formatUnknownError';
import useFeatureApi from 'hooks/api/actions/useFeatureApi/useFeatureApi';
import { useChangeRequestsEnabled } from 'hooks/useChangeRequestsEnabled';
import { useChangeRequestApi } from 'hooks/api/actions/useChangeRequestApi/useChangeRequestApi';
import { usePendingChangeRequests } from 'hooks/api/getters/usePendingChangeRequests/usePendingChangeRequests';

const StyledSelect = styled(GeneralSelect)(({ theme }) => ({
  minWidth: '450px',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
}));

const SpacedAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));

type ExportDialogProps = {
  showExportDialog: boolean;
  data: Pick<FeatureSchema, 'name' | 'environments'>[];
  onClose: () => void;
  onConfirm?: () => void;
  environments: string[];
  projectId: string;
};

export const BulkDisableDialog = ({
  showExportDialog,
  data,
  onClose,
  onConfirm,
  environments,
  projectId,
}: ExportDialogProps) => {
  const [selected, setSelected] = useState(environments[0]);
  const { bulkToggleFeaturesEnvironmentOff } = useFeatureApi();
  const { addChange } = useChangeRequestApi();
  const { setToastApiError, setToastData } = useToast();
  const { isChangeRequestConfigured } = useChangeRequestsEnabled(projectId);
  const { refetch: refetchChangeRequests } =
    usePendingChangeRequests(projectId);
  const alreadyDisabledCount = data.filter(
    (feature) =>
      feature.environments?.find((environment) => selected === environment.name)
        ?.enabled === false,
  ).length;

  const getOptions = () =>
    environments.map((env) => ({
      key: env,
      label: env,
    }));

  const onClick = async () => {
    try {
      if (isChangeRequestConfigured(selected)) {
        await addChange(
          projectId,
          selected,
          data.map((feature) => ({
            action: 'updateEnabled',
            feature: feature.name,
            payload: { enabled: false },
          })),
        );
        refetchChangeRequests();
        setToastData({
          text: 'Your disabled feature flags changes have been added to change request',
          type: 'success',
          title: 'Changes added to a draft',
        });
      } else {
        await bulkToggleFeaturesEnvironmentOff(
          projectId,
          data.map((feature) => feature.name),
          selected,
        );
        setToastData({
          text: 'Your feature flags have been disabled',
          type: 'success',
          title: 'Features disabled',
        });
      }
      onClose();
      onConfirm?.();
    } catch (e: unknown) {
      setToastApiError(formatUnknownError(e));
    }
  };

  const buttonText = isChangeRequestConfigured(selected)
    ? 'Add to change request'
    : 'Disable flags';

  return (
    <Dialogue
      open={showExportDialog}
      title='Disable feature flags'
      onClose={onClose}
      onClick={onClick}
      primaryButtonText={buttonText}
      secondaryButtonText='Cancel'
    >
      <Box>
        You have selected <b>{data.length}</b> feature flags to disable.
        <br />
        <br />
        <Typography>
          Select which environment to disable the features for:
        </Typography>
        <StyledSelect
          options={getOptions()}
          value={selected}
          onChange={(option: string) => setSelected(option)}
        />
        {isChangeRequestConfigured(selected) && (
          <SpacedAlert severity='warning'>
            Change requests are enabled for this environment.
          </SpacedAlert>
        )}
        {alreadyDisabledCount > 0 && (
          <SpacedAlert severity='info'>
            {alreadyDisabledCount} feature{' '}
            {alreadyDisabledCount > 1 ? 'flags are ' : 'flag is '}
            already disabled.
          </SpacedAlert>
        )}
      </Box>
    </Dialogue>
  );
};
