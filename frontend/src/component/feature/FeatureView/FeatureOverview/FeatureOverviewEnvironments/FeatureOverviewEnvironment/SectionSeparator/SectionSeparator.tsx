import type React from 'react';
import { styled } from '@mui/material';

const SeparatorContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '1rem 0',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    height: 2,
    width: '100%',
    backgroundColor: theme.palette.divider,
  },
}));

const SeparatorContent = styled('span')(({ theme }) => ({
  fontSize: theme.fontSizes.bodySize,
  textAlign: 'center',
  padding: '0 1rem',
  background: theme.palette.envAccordion.expanded,
  position: 'relative',
  maxWidth: '80%',
  color: theme.palette.text.primary,
}));

export const SectionSeparator = ({
  children,
}: { children?: React.ReactNode }) => (
  <SeparatorContainer>
    <SeparatorContent>{children}</SeparatorContent>
  </SeparatorContainer>
);
