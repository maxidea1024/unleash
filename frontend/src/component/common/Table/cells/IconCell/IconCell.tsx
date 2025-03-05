import { Box } from '@mui/material';
import type { ReactNode } from 'react';

type IconCellProps = {
  icon: ReactNode;
};

export const IconCell = ({ icon }: IconCellProps) => {
  return (
    <Box
      sx={{
        pl: 2,
        pr: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {icon}
    </Box>
  );
};
