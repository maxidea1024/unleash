import type { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { Badge } from 'component/common/Badge/Badge';
import { ChangeItemWrapper } from './StrategyChange';

type ToggleStatusChange = {
  enabled: boolean;
  actions?: ReactNode;
};

export const ToggleStatusChange: FC<ToggleStatusChange> = ({
  enabled,
  actions,
}) => {
  return (
    <ChangeItemWrapper>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        New status:{' '}
        <Badge
          sx={(theme) => ({ marginLeft: theme.spacing(1) })}
          color={enabled ? 'success' : 'error'}
        >
          {enabled ? ' Enabled' : 'Disabled'}
        </Badge>
      </Box>
      {actions}
    </ChangeItemWrapper>
  );
};
