import { useState, useEffect } from 'react';
import { Alert, styled } from '@mui/material';
import { Typography } from '@mui/material';
import type { IProclamationToast } from 'interfaces/uiConfig';

type ProclamationProps = {
  toast?: IProclamationToast;
};

const StyledProclamation = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledContent = styled(Typography)(({ theme }) => ({
  maxWidth: '800px',
}));

const StyledLink = styled('a')(({ theme }) => ({
  display: 'block',
  marginTop: theme.spacing(1),
  width: '100px',
}));

const renderProclamation = (id: string) => {
  if (!id) {
    return false;
  }

  if (localStorage) {
    const value = localStorage.getItem(id);
    if (value) {
      return false;
    }
  }

  return true;
};

const Proclamation = ({ toast }: ProclamationProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(renderProclamation(toast?.id || ''));
  }, [toast?.id]);

  const onClose = () => {
    if (localStorage) {
      localStorage.setItem(toast?.id || '', 'seen');
    }
    setShow(false);
  };

  if (!toast) {
    return null;
  }

  return show ? (
    <StyledProclamation severity={toast.severity} onClose={onClose}>
      <StyledContent variant='body2'>{toast.message}</StyledContent>
      <StyledLink href={toast.link} target='_blank' rel='noopener noreferrer'>
        View more
      </StyledLink>
    </StyledProclamation>
  ) : null;
};

export default Proclamation;
