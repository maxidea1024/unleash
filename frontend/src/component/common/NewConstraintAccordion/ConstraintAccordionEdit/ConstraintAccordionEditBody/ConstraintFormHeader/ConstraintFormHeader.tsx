import type React from 'react';
import { styled } from '@mui/material';

const StyledHeader = styled('h3')(({ theme }) => ({
  fontSize: theme.fontSizes.bodySize,
  fontWeight: theme.typography.fontWeightRegular,
}));

export const ConstraintFormHeader = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <StyledHeader {...rest}>{children}</StyledHeader>;
};
