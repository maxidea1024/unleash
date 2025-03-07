import { Grid } from '@mui/material';
import type React from 'react';

type GridColProps = {
  vertical?: boolean;
  children?: React.ReactNode;
};

export const GridCol = ({ children, vertical = false }: GridColProps) => {
  return (
    <Grid
      container={vertical}
      item
      display='flex'
      alignItems={vertical ? 'start' : 'center'}
      direction={vertical ? 'column' : undefined}
    >
      {children}
    </Grid>
  );
};
