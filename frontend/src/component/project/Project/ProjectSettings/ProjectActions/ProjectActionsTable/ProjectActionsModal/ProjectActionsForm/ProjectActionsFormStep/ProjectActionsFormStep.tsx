import { Box, Divider, styled } from '@mui/material';
import { Badge } from 'component/common/Badge/Badge';
import type { ReactNode } from 'react';

const StyledHeader = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const StyledResourceLink = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: 0,
  fontSize: theme.fontSizes.smallBody,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'verticalConnector',
})<{ verticalConnector?: boolean }>(({ theme, verticalConnector }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.elevation1,
  marginTop: verticalConnector ? 0 : theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMedium,
}));

const StyledVerticalConnector = styled(Divider)(({ theme }) => ({
  margin: 'auto',
  width: 1,
  height: theme.spacing(3),
}));

type ProjectActionsFormStepProps = {
  name: string;
  verticalConnector?: boolean;
  resourceLink?: ReactNode;
  children: ReactNode;
};

export const ProjectActionsFormStep = ({
  name,
  verticalConnector,
  resourceLink,
  children,
}: ProjectActionsFormStepProps) => (
  <>
    {verticalConnector && <StyledVerticalConnector orientation='vertical' />}
    <StyledBox verticalConnector={verticalConnector}>
      <StyledHeader>
        <Badge color='secondary'>{name}</Badge>
        <StyledResourceLink>{resourceLink}</StyledResourceLink>
      </StyledHeader>
      {children}
    </StyledBox>
  </>
);
