import { Modal, Backdrop, styled, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { SIDEBAR_MODAL_ID } from 'utils/testIds';
import type * as React from 'react';

const TRANSITION_DURATION = 250;

const ModalContentWrapper = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  height: '100vh',
  maxWidth: '98vw',
  overflow: 'auto',
  boxShadow: '0 0 1rem rgba(0, 0, 0, 0.25)',
});

const FixedWidthContentWrapper = styled(ModalContentWrapper)({
  width: 1300,
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  zIndex: 1,
  position: 'absolute',
  top: theme.spacing(3),
  right: theme.spacing(3),
}));

type SidebarModalProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  onClick?: (e: React.SyntheticEvent) => void;
  children: React.ReactElement<any, any>;
};

export const BaseModal = ({
  open,
  onClose,
  onClick,
  label,
  children,
}: SidebarModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      onClick={onClick}
      closeAfterTransition
      aria-label={label}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: TRANSITION_DURATION }}
      data-testid={SIDEBAR_MODAL_ID}
      sx={{ minHeight: '100vh' }}
    >
      <Fade timeout={TRANSITION_DURATION} in={open}>
        {children}
      </Fade>
    </Modal>
  );
};

export const SidebarModal = (props: SidebarModalProps) => {
  return (
    <BaseModal {...props}>
      <FixedWidthContentWrapper>{props.children}</FixedWidthContentWrapper>
    </BaseModal>
  );
};

export const DynamicSidebarModal = (props: SidebarModalProps) => {
  return (
    <BaseModal {...props}>
      <ModalContentWrapper>
        <Tooltip title='Close' arrow describeChild>
          <StyledIconButton onClick={props.onClose}>
            <CloseIcon />
          </StyledIconButton>
        </Tooltip>
        {props.children}
      </ModalContentWrapper>
    </BaseModal>
  );
};
