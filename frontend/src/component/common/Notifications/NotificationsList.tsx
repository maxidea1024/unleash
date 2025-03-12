import { List, styled } from '@mui/material';
import type React from 'react';

const StyledListContainer = styled(List)(({ theme }) => ({
  padding: theme.spacing(1, 1, 3, 1),
}));

export const NotificationsList = ({
  children,
}: { children?: React.ReactNode }) => {
  return (
    <StyledListContainer data-testid='NOTIFICATIONS_LIST'>
      {children}
    </StyledListContainer>
  );
};
