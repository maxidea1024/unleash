import type React from 'react';
import type { ReactNode } from 'react';
import CallMade from '@mui/icons-material/CallMade';
import SouthEast from '@mui/icons-material/SouthEast';
import { Box, Typography, styled } from '@mui/material';
import { flexRow } from 'themes/themeStyles';

const StyledTypographyCount = styled(Box)(({ theme }) => ({
  fontSize: theme.fontSizes.largeHeader,
}));

const StyledBoxChangeContainer = styled(Box)(({ theme }) => ({
  ...flexRow,
  flexDirection: 'column',
  alignItems: 'center',
  marginLeft: theme.spacing(2.5),
}));

const StyledTypographySubtext = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
}));

const StyledTypographyChange = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightBold,
}));

const RowContainer = styled(Box)(({ theme }) => ({
  ...flexRow,
}));

const StyledWidget = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  borderRadius: `${theme.shape.borderRadiusLarge}px`,
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(2),
  },
}));

type StatusBoxProps = {
  title: string;
  boxText: ReactNode;
  change?: number;
  percentage?: boolean;
  customChangeElement?: ReactNode;
  children?: React.ReactNode;
};

const resolveIcon = (change: number) => {
  if (change > 0) {
    return (
      <CallMade
        sx={{
          color: 'success.dark',
          height: 20,
          width: 20,
        }}
      />
    );
  }
  return (
    <SouthEast
      sx={{
        color: 'warning.dark',
        height: 20,
        width: 20,
      }}
    />
  );
};

const resolveColor = (change: number) => {
  if (change > 0) {
    return 'success.dark';
  }
  return 'warning.dark';
};

export const StatusBox = ({
  title,
  boxText,
  change,
  percentage,
  children,
  customChangeElement,
}: StatusBoxProps) => (
  <StyledWidget>
    <RowContainer>
      <Typography variant='h3' data-loading>
        {title}
      </Typography>
      {children}
    </RowContainer>
    <RowContainer>
      <StyledTypographyCount data-loading>{boxText}</StyledTypographyCount>
      {customChangeElement ? (
        <StyledBoxChangeContainer data-loading>
          {customChangeElement}
        </StyledBoxChangeContainer>
      ) : change !== undefined && change !== 0 ? (
        <StyledBoxChangeContainer data-loading>
          <Box
            sx={{
              ...flexRow,
            }}
          >
            {resolveIcon(change as number)}
            <StyledTypographyChange color={resolveColor(change as number)}>
              {(change as number) > 0 ? '+' : ''}
              {change}
              {percentage ? '%' : ''}
            </StyledTypographyChange>
          </Box>
          <StyledTypographySubtext>this month</StyledTypographySubtext>
        </StyledBoxChangeContainer>
      ) : (
        <StyledBoxChangeContainer>
          <StyledTypographySubtext data-loading>
            No change
          </StyledTypographySubtext>
        </StyledBoxChangeContainer>
      )}
    </RowContainer>
  </StyledWidget>
);
