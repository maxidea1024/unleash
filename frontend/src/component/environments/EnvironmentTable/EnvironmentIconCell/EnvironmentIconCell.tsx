import { styled } from '@mui/material';
import { Box, IconButton } from '@mui/material';
import CloudCircle from '@mui/icons-material/CloudCircle';
import DragIndicator from '@mui/icons-material/DragIndicator';
import type { IEnvironment } from 'interfaces/environments';

const StyledCell = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingLeft: theme.spacing(0.5),
  minWidth: theme.spacing(6.5),
  cursor: 'grab',
}));

const DragIcon = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  cursor: 'inherit',
  transition: 'color 0.2s ease-in-out',
  color: theme.palette.action.active,
}));

const StyledCloudCircle = styled(CloudCircle, {
  shouldForwardProp: (prop) => prop !== 'deprecated',
})<{ deprecated?: boolean }>(({ theme, deprecated }) => ({
  color: deprecated ? theme.palette.neutral.border : theme.palette.primary.main,
}));

type EnvironmentIconCellProps = {
  environment: IEnvironment;
};

export const EnvironmentIconCell = ({
  environment,
}: EnvironmentIconCellProps) => (
  <StyledCell>
    <DragIcon size='large' disableRipple className='drag-icon'>
      <DragIndicator titleAccess='Drag to reorder' />
    </DragIcon>
    <StyledCloudCircle deprecated={!environment.enabled} />
  </StyledCell>
);
