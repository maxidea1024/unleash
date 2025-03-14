import { styled } from '@mui/material';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import WarningAmber from '@mui/icons-material/WarningAmber';
import type { IIntegrationEvent } from 'interfaces/integrationEvent';

const StyledSuccessIcon = styled(CheckCircleOutline)(({ theme }) => ({
  color: theme.palette.success.main,
}));

const StyledFailedIcon = styled(ErrorOutline)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const StyledSuccessWithErrorsIcon = styled(WarningAmber)(({ theme }) => ({
  color: theme.palette.warning.main,
}));

export const IntegrationEventsStateIcon = ({ state }: IIntegrationEvent) => {
  if (state === 'success') {
    return <StyledSuccessIcon />;
  }

  if (state === 'failed') {
    return <StyledFailedIcon />;
  }

  return <StyledSuccessWithErrorsIcon />;
};
