import { Alert, styled } from '@mui/material';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import { formatUnknownError } from 'utils/formatUnknownError';
import useToast from 'hooks/useToast';
import useProjectApi from 'hooks/api/actions/useProjectApi/useProjectApi';
import useProjectOverview from 'hooks/api/getters/useProjectOverview/useProjectOverview';

const StyledParagraph = styled('p')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

type ArchivedFeatureReviveConfirmProps = {
  revivedFeatures: string[];
  projectId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
};

export const ArchivedFeatureReviveConfirm = ({
  revivedFeatures,
  projectId,
  open,
  setOpen,
  refetch,
}: ArchivedFeatureReviveConfirmProps) => {
  const { setToastData, setToastApiError } = useToast();
  const { reviveFeatures } = useProjectApi();
  const { project, loading } = useProjectOverview(projectId);

  const onReviveFeatureToggle = async () => {
    try {
      if (revivedFeatures.length === 0) {
        return;
      }
      await reviveFeatures(projectId, revivedFeatures);

      refetch();

      setToastData({
        type: 'success',
        title: "And we're back!",
        text: 'The feature flags have been revived.',
      });
    } catch (error: unknown) {
      setToastApiError(formatUnknownError(error));
    } finally {
      clearModal();
    }
  };

  const clearModal = () => {
    setOpen(false);
  };

  const title = `Revive feature flag${revivedFeatures.length > 1 ? 's' : ''}?`;
  const primaryBtnText = `Revive feature flag${revivedFeatures.length > 1 ? 's' : ''}`;

  return (
    <Dialogue
      title={title}
      open={open}
      primaryButtonText={primaryBtnText}
      secondaryButtonText='Cancel'
      onClick={onReviveFeatureToggle}
      onClose={clearModal}
      disabledPrimaryButton={loading || Boolean(project.archivedAt)}
    >
      {Boolean(project.archivedAt) ? (
        <Alert severity='warning'>
          Cannot revive feature flag in archived project (Project ID:{' '}
          {projectId})
        </Alert>
      ) : (
        <Alert severity='info'>
          Revived feature flags will be automatically disabled in all
          environments
        </Alert>
      )}

      {revivedFeatures.length > 1 ? (
        <>
          <StyledParagraph>
            You are about to revive feature flags:
          </StyledParagraph>
          <ul>
            {revivedFeatures.map((name) => (
              <li key={`revive-${name}`}>{name}</li>
            ))}
          </ul>
        </>
      ) : (
        <StyledParagraph>
          You are about to revive feature flag: {revivedFeatures[0]}
        </StyledParagraph>
      )}
    </Dialogue>
  );
};
