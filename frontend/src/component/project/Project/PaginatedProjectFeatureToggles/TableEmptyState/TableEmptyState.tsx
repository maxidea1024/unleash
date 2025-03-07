import { Box } from '@mui/material';
import { TablePlaceholder } from 'component/common/Table';

type TablePlaceholderProps = {
  query?: string;
};

export const TableEmptyState = ({ query }: TablePlaceholderProps) => {
  if ((query || '')?.length > 0) {
    return (
      <Box
        sx={(theme) => ({
          padding: theme.spacing(3),
        })}
      >
        <TablePlaceholder>
          No feature flags found matching &ldquo;
          {query}
          &rdquo;
        </TablePlaceholder>
      </Box>
    );
  }

  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing(3),
      })}
    >
      <TablePlaceholder>No feature flags available.</TablePlaceholder>
    </Box>
  );
};
