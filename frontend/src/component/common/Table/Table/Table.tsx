import { Table as MUITable, type TableProps } from '@mui/material';

type GanpaTableProps = TableProps & {
  rowHeight?: 'auto' | 'dense' | 'standard' | 'compact' | number;
};

export const Table = ({ rowHeight = 'auto', ...props }: GanpaTableProps) => (
  <MUITable
    sx={{
      position: 'relative',
      '& tbody tr': {
        height: (theme) =>
          ({
            auto: 'auto',
            standard: theme.shape.tableRowHeight,
            compact: theme.shape.tableRowHeightCompact,
            dense: theme.shape.tableRowHeightDense,
          })[rowHeight] ?? rowHeight,
      },
    }}
    {...props}
  />
);
