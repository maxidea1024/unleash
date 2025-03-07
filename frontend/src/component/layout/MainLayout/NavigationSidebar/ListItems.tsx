import type React from 'react';
import type { ReactNode } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { basePath } from 'utils/formatPath';
import SignOutIcon from '@mui/icons-material/ExitToApp';
import type { Theme } from '@mui/material/styles/createTheme';

const listItemButtonStyle = (theme: Theme) => ({
  borderRadius: theme.spacing(0.5),
  borderLeft: `${theme.spacing(0.5)} solid transparent`,
  '&.Mui-selected': {
    borderLeft: `${theme.spacing(0.5)} solid ${theme.palette.primary.main}`,
  },
});

const CappedText = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
});

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(4),
  margin: theme.spacing(0.25, 0),
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  margin: 0,
}));

type FullListItemProps = {
  href: string;
  text: string;
  badge?: ReactNode;
  onClick: () => void;
  selected?: boolean;
  children?: React.ReactNode;
};

export const FullListItem = ({
  href,
  text,
  badge,
  onClick,
  selected,
  children,
}: FullListItemProps) => {
  return (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton
        dense={true}
        component={Link}
        to={href}
        sx={listItemButtonStyle}
        selected={selected}
      >
        <StyledListItemIcon>{children}</StyledListItemIcon>
        <StyledListItemText>
          <CappedText>{text}</CappedText>
        </StyledListItemText>
        {badge}
      </ListItemButton>
    </ListItem>
  );
};

type ExternalFullListItemProps = {
  href: string;
  text: string;
  children?: React.ReactNode;
};

export const ExternalFullListItem = ({
  href,
  text,
  children,
}: ExternalFullListItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        dense={true}
        component={Link}
        to={href}
        sx={listItemButtonStyle}
        rel='noopener noreferrer'
        target='_blank'
      >
        <StyledListItemIcon>{children}</StyledListItemIcon>
        <StyledListItemText>
          <CappedText>{text}</CappedText>
        </StyledListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export const SignOutItem = () => {
  return (
    <form method='POST' action={`${basePath}/logout`}>
      <ListItem disablePadding>
        <ListItemButton
          dense={true}
          component='button'
          type='submit'
          sx={listItemButtonStyle}
        >
          <StyledListItemIcon>
            <SignOutIcon />
          </StyledListItemIcon>
          <StyledListItemText>
            <CappedText>Sign out</CappedText>
          </StyledListItemText>
        </ListItemButton>
      </ListItem>
    </form>
  );
};

type MiniListItemProps = {
  href: string;
  text: string;
  selected?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

export const MiniListItem = ({
  href,
  text,
  selected,
  onClick,
  children,
}: MiniListItemProps) => {
  return (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton
        dense={true}
        component={Link}
        to={href}
        sx={listItemButtonStyle}
        selected={selected}
      >
        <Tooltip title={text} placement='right'>
          <StyledListItemIcon>{children}</StyledListItemIcon>
        </Tooltip>
      </ListItemButton>
    </ListItem>
  );
};
