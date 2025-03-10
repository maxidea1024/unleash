import { Popover, styled } from '@mui/material';
import type { IGroupUser } from 'interfaces/group';

const StyledPopover = styled(Popover)(({ theme }) => ({
  pointerEvents: 'none',
  '.MuiPaper-root': {
    padding: theme.spacing(2),
  },
}));

const StyledName = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.fontSizes.smallBody,
  marginTop: theme.spacing(1),
}));

type GroupPopoverProps = {
  user: Partial<IGroupUser & { description?: string }> | undefined;
  open: boolean;
  anchorEl: HTMLElement | null;
  onPopoverClose(event: React.MouseEvent<HTMLElement>): void;
};

export const GroupPopover = ({
  user,
  open,
  anchorEl,
  onPopoverClose,
}: GroupPopoverProps) => {
  return (
    <StyledPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onPopoverClose}
      disableScrollLock={true}
      disableRestoreFocus={true}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <StyledName>{user?.name || user?.username}</StyledName>
      <div>{user?.description || user?.email}</div>
    </StyledPopover>
  );
};
