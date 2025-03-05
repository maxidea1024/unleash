import { styled } from '@mui/material';
import type React from 'react';
import { Link } from 'react-router-dom';

const StyledTabLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  textDecoration: 'none',
  color: 'inherit',
  padding: theme.spacing(0, 5),
  '&.active': {
    fontWeight: 'bold',
  },
}));

type CenteredTabLinkProps = {
  to: string;
  children?: React.ReactNode;
};

export const TabLink = ({ to, children }: CenteredTabLinkProps) => (
  <StyledTabLink to={to}>{children}</StyledTabLink>
);
