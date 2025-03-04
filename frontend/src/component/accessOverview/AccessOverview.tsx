import { IconButton } from '@mui/material';
import Download from '@mui/icons-material/Download';
import { useAccessOverviewApi } from 'hooks/api/actions/useAccessOverviewApi/useAccessOverviewApi';
import type { FC } from 'react';

export const AccessOverview: FC = () => {
  const { downloadCSV } = useAccessOverviewApi();

  return (
    <IconButton onClick={downloadCSV}>
      <Download />
    </IconButton>
  );
};
