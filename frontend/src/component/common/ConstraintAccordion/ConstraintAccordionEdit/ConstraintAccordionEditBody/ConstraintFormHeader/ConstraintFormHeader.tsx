import type React from 'react';
import { styled } from '@mui/material';

const StyledHeader = styled('h3')(({ theme }) => ({
  fontSize: theme.fontSizes.bodySize,
  fontWeight: theme.typography.fontWeightRegular,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(0.5),
}));

type ConstraintFormHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const ConstraintFormHeader = ({
  children,
  ...rest
}: ConstraintFormHeaderProps) => {
  return <StyledHeader {...rest}>{children}</StyledHeader>;
};
