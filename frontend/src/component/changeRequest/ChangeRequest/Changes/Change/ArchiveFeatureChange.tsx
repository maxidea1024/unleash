import type { ReactNode } from 'react';
import { Box, styled } from '@mui/material';
import { ChangeItemWrapper } from './StrategyChange';

const ArchiveBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.error.main,
}));

type ArchiveFeatureChangeProps = {
  actions?: ReactNode;
};

export const ArchiveFeatureChange = ({
  actions,
}: ArchiveFeatureChangeProps) => (
  <ChangeItemWrapper>
    <ArchiveBox>Archiving feature</ArchiveBox>
    {actions}
  </ChangeItemWrapper>
);
