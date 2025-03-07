import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/material';
import type React from 'react';

type WidgetFooterLinkProps = {
  to: string;
  children?: React.ReactNode;
};

export const WidgetFooterLink = ({ children, to }: WidgetFooterLinkProps) => {
  return (
    <Typography
      data-loading
      variant='body2'
      textAlign='center'
      sx={{
        paddingTop: (theme) => theme.spacing(2.5),
        marginTop: 'auto',
        justifySelf: 'flex-end',
      }}
    >
      <Link component={RouterLink} to={to}>
        {children}
      </Link>
    </Typography>
  );
};
