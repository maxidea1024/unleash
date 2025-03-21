import type React from 'react';
import { useState } from 'react';
import Close from '@mui/icons-material/Close';
import HelpOutline from '@mui/icons-material/HelpOutline';
import {
  Box,
  IconButton,
  Popper,
  Paper,
  ClickAwayListener,
  styled,
} from '@mui/material';
import { Feedback } from 'component/common/Feedback/Feedback';

type HelpPopperProps = {
  id: string;
  children?: React.ReactNode;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3, 3),
  maxWidth: '350px',
  borderRadius: `${theme.shape.borderRadiusMedium}px`,
  border: `1px solid ${theme.palette.neutral.border}`,
  fontSize: theme.typography.body2.fontSize,
}));

export const HelpPopper = ({ children, id }: HelpPopperProps) => {
  const [anchor, setAnchorEl] = useState<null | Element>(null);

  const onOpen = (event: React.FormEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const onClose = () => setAnchorEl(null);

  const open = Boolean(anchor);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: (theme) => theme.spacing(0.5),
        right: (theme) => theme.spacing(0.5),
      }}
    >
      <IconButton onClick={onOpen} aria-describedby={id} size='small'>
        <HelpOutline
          sx={{
            fontSize: (theme) => theme.typography.body1.fontSize,
          }}
        />
      </IconButton>

      <Popper
        id={id}
        open={open}
        anchorEl={anchor}
        sx={(theme) => ({ zIndex: theme.zIndex.tooltip })}
      >
        <ClickAwayListener onClickAway={onClose}>
          <StyledPaper elevation={3}>
            <IconButton
              onClick={onClose}
              sx={{ position: 'absolute', right: 4, top: 4 }}
            >
              <Close
                sx={{
                  fontSize: (theme) => theme.typography.body1.fontSize,
                }}
              />
            </IconButton>
            {children}
            <Feedback
              id={id}
              eventName='project_overview'
              localStorageKey='ProjectOverviewFeedback'
            />
          </StyledPaper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};
