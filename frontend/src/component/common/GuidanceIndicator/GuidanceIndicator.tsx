import { styled, useTheme } from '@mui/material';
import type React from 'react';
import type { FC } from 'react';

const StyledIndicator = styled('div')(({ style, theme }) => ({
  width: '25px',
  height: '25px',
  borderRadius: '50%',
  color: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  ...style,
}));

interface IGuidanceIndicatorProps {
  style?: React.CSSProperties;
  type?: guidanceIndicatorType;
  children?: React.ReactNode;
}

type guidanceIndicatorType = 'primary' | 'secondary';

export const GuidanceIndicator: FC<IGuidanceIndicatorProps> = ({
  style,
  children,
  type,
}) => {
  const theme = useTheme();

  const defaults = {
    backgroundColor: theme.palette.background.alternative,
    color: theme.palette.common.white,
  };
  if (type === 'secondary') {
    defaults.backgroundColor = theme.palette.background.paper;
    defaults.color = theme.palette.text.secondary;
  }

  return (
    <StyledIndicator style={{ ...defaults, ...style }}>
      {children}
    </StyledIndicator>
  );
};
