import { Button, Link, Paper, styled } from '@mui/material';
import { basePath } from 'utils/formatPath';
import type { IUser } from 'interfaces/user';
import OpenInNew from '@mui/icons-material/OpenInNew';
import { Link as RouterLink } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMedium,
  boxShadow: theme.boxShadows.popup,
  position: 'absolute',
  zIndex: 5000,
  minWidth: theme.spacing(34),
  right: 0,
  marginTop: theme.spacing(0.25),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: '1rem',
  },
}));

const StyledLink = styled(Link<typeof RouterLink | 'a'>)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: 0,
  color: theme.palette.links,
  fontWeight: theme.fontWeight.medium,
  '&:hover, &:focus': {
    textDecoration: 'underline',
  },
  '& svg': {
    fontSize: theme.spacing(2.25),
  },
}));

const StyledLogoutButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: theme.spacing(5),
}));

const StyledDivider = styled('div')(({ theme }) => ({
  width: '100%',
  height: '1px',
  backgroundColor: theme.palette.divider,
  margin: theme.spacing(3, 0),
}));

type UserProfileContentProps = {
  id: string;
  showProfile: boolean;
  setShowProfile: (showProfile: boolean) => void;
  profile: IUser;
};

export const UserProfileContent = ({
  id,
  showProfile,
  setShowProfile,
  profile,
}: UserProfileContentProps) =>
  showProfile && (
    <StyledPaper className='dropdown-outline' id={id}>
      <StyledLink
        component={RouterLink}
        to='/profile'
        underline='hover'
        onClick={() => setShowProfile(false)}
      >
        View profile settings
      </StyledLink>

      <StyledDivider />

      <StyledLink
        component='a'
        href='https://www.getunleash.io/privacy-policy'
        underline='hover'
        rel='noopener noreferrer'
        target='_blank'
      >
        Privacy Policy <OpenInNew />
      </StyledLink>

      <StyledDivider />

      <form method='POST' action={`${basePath}/logout`}>
        <StyledLogoutButton type='submit' variant='outlined' color='primary'>
          Log out
        </StyledLogoutButton>
      </form>
    </StyledPaper>
  );
