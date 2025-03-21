import type React from 'react';
import type { KeyboardEvent } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from '@mui/material';
import { DIALOGUE_CONFIRM_ID } from 'utils/testIds';

const StyledDialog = styled(Dialog)(({ theme, maxWidth }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadiusLarge,
    maxWidth: !maxWidth ? theme.spacing(85) : undefined,
    backgroundColor: 'transparent',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.background.alternative,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3.5, 6),
  fontWeight: theme.fontWeight.medium,
}));

const StyledDialogBody = styled('div')(({ theme }) => ({
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(6),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  gap: theme.spacing(2),
  padding: 0,
}));

type DialogueProps = {
  primaryButtonText?: string;
  secondaryButtonText?: string;
  open: boolean;
  setOpen?: (status: boolean) => void;
  onClick?: (e: React.SyntheticEvent) => void;
  onClose?: (e: React.SyntheticEvent, reason?: string) => void;
  style?: object;
  title: string;
  fullWidth?: boolean;
  maxWidth?: 'lg' | 'sm' | 'xs' | 'md' | 'xl';
  disabledPrimaryButton?: boolean;
  formId?: string;
  permissionButton?: React.JSX.Element;
  customButton?: React.JSX.Element;
  children?: React.ReactNode;
};

export const Dialogue = ({
  children,
  open,
  setOpen,
  onClick,
  onClose,
  title,
  primaryButtonText,
  disabledPrimaryButton = false,
  secondaryButtonText,
  maxWidth,
  fullWidth = false,
  formId,
  permissionButton,
  customButton,
}: DialogueProps) => {
  const handleClick = formId
    ? (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (onClick) {
          onClick(e);
        }
      }
    : onClick;

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen?.(false);
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      onKeyDown={onKeyDown}
      role={'dialog'}
      fullWidth={fullWidth}
      aria-labelledby={'simple-modal-title'}
      aria-describedby={'simple-modal-description'}
      maxWidth={maxWidth}
    >
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledDialogBody>
        {children && <StyledDialogContent>{children}</StyledDialogContent>}
        <StyledDialogActions>
          {permissionButton ? (
            permissionButton
          ) : onClick ? (
            <Button
              form={formId}
              color='primary'
              variant='contained'
              onClick={handleClick}
              autoFocus={!formId}
              disabled={disabledPrimaryButton}
              data-testid={DIALOGUE_CONFIRM_ID}
              type={formId ? 'submit' : 'button'}
            >
              {primaryButtonText || "Yes, I'm sure"}
            </Button>
          ) : null}

          {onClose && (
            <Button onClick={onClose}>
              {secondaryButtonText || 'No, take me back'}
            </Button>
          )}

          {customButton && customButton}
        </StyledDialogActions>
      </StyledDialogBody>
    </StyledDialog>
  );
};
