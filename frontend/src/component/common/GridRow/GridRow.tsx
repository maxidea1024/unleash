import { Grid, styled, type SxProps, type Theme } from '@mui/material';
import type React from 'react';

const StyledGrid = styled(Grid)(({ theme }) => ({
  flexWrap: 'nowrap',
  gap: theme.spacing(1),
}));

type GridRowProps = {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
};

export const GridRow = ({ sx, children }: GridRowProps) => {
  return (
    <StyledGrid
      container
      item
      justifyContent='space-between'
      alignItems='center'
      sx={sx}
    >
      {children}
    </StyledGrid>
  );
};
