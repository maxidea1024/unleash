import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
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

type CenteredNavLinkProps = {
  to: string;
  children?: React.ReactNode;
};

export const CenteredNavLink = ({ to, children }: CenteredNavLinkProps) => {
  return <StyledNavLink to={to}>{children}</StyledNavLink>;
};
