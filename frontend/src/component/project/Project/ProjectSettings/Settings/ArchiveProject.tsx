import { Link, styled } from '@mui/material';
import { DELETE_PROJECT } from 'component/providers/AccessProvider/permissions';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { ArchiveProjectDialogue } from '../../ArchiveProject/ArchiveProjectDialogue';

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(4),
  gap: theme.spacing(2),
}));

const StyledButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: theme.spacing(3),
}));

type DeleteProjectProps = {
  projectId: string;
  featureCount: number;
};

export const ArchiveProject = ({
  projectId,
  featureCount,
}: DeleteProjectProps) => {
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const navigate = useNavigate();
  const disabled = featureCount > 0;

  return (
    <StyledContainer>
      <p>
        Before you can archive a project, you must first archive all of the
        feature flags associated with it.
      </p>
      {featureCount > 0 && (
        <p>
          Currently there {featureCount <= 1 ? 'is' : 'are'}{' '}
          <Link component={RouterLink} to='../..'>
            <strong>
              {featureCount} active feature{' '}
              {featureCount === 1 ? 'flag' : 'flags'}.
            </strong>
          </Link>
        </p>
      )}
      <StyledButtonContainer>
        <PermissionButton
          permission={DELETE_PROJECT}
          disabled={disabled}
          projectId={projectId}
          onClick={() => {
            setShowArchiveDialog(true);
          }}
          tooltipProps={{
            title: 'Archive project',
          }}
          data-loading
        >
          Archive project
        </PermissionButton>
      </StyledButtonContainer>
      <ArchiveProjectDialogue
        project={projectId}
        open={showArchiveDialog}
        onClose={() => {
          setShowArchiveDialog(false);
        }}
        onSuccess={() => {
          navigate('/projects');
        }}
      />
    </StyledContainer>
  );
};
