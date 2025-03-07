import type React from 'react';
import { Box, styled, type SxProps, type Theme } from '@mui/material';

const StyledWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'lineClamp',
})<{ lineClamp?: number }>(({ theme, lineClamp }) => ({
  padding: theme.spacing(1, 2),
  display: '-webkit-box',
  overflow: lineClamp ? 'hidden' : 'auto',
  WebkitLineClamp: lineClamp ? lineClamp : 'none',
  WebkitBoxOrient: 'vertical',
  wordBreak: 'break-all',
  [theme.breakpoints.down('sm')]: {
    wordBreak: 'normal',
  },
}));

const StyledSpan = styled('span')(() => ({
  display: 'inline-block',
  maxWidth: '100%',
}));

type TextCellProps = {
  value?: string | null;
  lineClamp?: number;
  'data-testid'?: string;
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
};

export const TextCell = ({
  value,
  children,
  lineClamp,
  sx,
  'data-testid': testid,
}: TextCellProps) => (
  <StyledWrapper lineClamp={lineClamp} sx={sx}>
    <StyledSpan data-loading='true' data-testid={testid}>
      {children ?? value}
    </StyledSpan>
  </StyledWrapper>
);
