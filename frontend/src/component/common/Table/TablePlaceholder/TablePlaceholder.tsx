import type React from 'react';
import { Box } from '@mui/material';

type TablePlaceholderProps = {
  children?: React.ReactNode;
};

export const TablePlaceholder = ({ children }: TablePlaceholderProps) => (
  <Box
    sx={{
      border: (theme) => `2px dashed ${theme.palette.divider}`,
      p: 8,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      mt: 2,
      width: '100%',
    }}
  >
    {children}
  </Box>
);
