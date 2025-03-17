import type React from 'react';
import type { DragEventHandler, ReactNode } from 'react';
import DragIndicator from '@mui/icons-material/DragIndicator';
import { Box, IconButton, styled } from '@mui/material';
import type { IFeatureStrategy } from 'interfaces/strategy';
import {
  formatStrategyName,
  getFeatureStrategyIcon,
} from 'utils/strategyNames';
import StringTruncator from 'component/common/StringTruncator/StringTruncator';
import type { PlaygroundStrategySchema } from 'openapi';
import { Badge } from '../Badge/Badge';
import { Link } from 'react-router-dom';

const DragIcon = styled(IconButton)({
  padding: 0,
  cursor: 'inherit',
  transition: 'color 0.2s ease-in-out',
});

const StyledIndexLabel = styled('div')(({ theme }) => ({
  fontSize: theme.typography.fontSize,
  color: theme.palette.text.secondary,
  position: 'absolute',
  display: 'none',
  right: 'calc(100% + 6px)',
  top: theme.spacing(2.5),
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  fontSize: theme.typography.fontSize,
  fontWeight: 'normal',
  color: theme.palette.text.secondary,
  display: 'none',
  top: theme.spacing(2.5),
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const StyledCustomTitle = styled('div')(({ theme }) => ({
  fontWeight: 'normal',
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const StyledHeaderContainer = styled('div')({
  flexDirection: 'column',
  justifyContent: 'center',
  verticalAlign: 'middle',
});

const StyledContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{ disabled?: boolean }>(({ theme, disabled }) => ({
  borderRadius: theme.shape.borderRadiusMedium,
  border: `1px solid ${theme.palette.divider}`,
  '& + &': {
    marginTop: theme.spacing(2),
  },
  background: disabled
    ? theme.palette.envAccordion.disabled
    : theme.palette.background.paper,
}));

const StyledHeader = styled('div', {
  shouldForwardProp: (prop) => prop !== 'draggable' && prop !== 'disabled',
})<{ draggable: boolean; disabled: boolean }>(
  ({ theme, draggable, disabled }) => ({
    padding: theme.spacing(0.5, 2),
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontWeight: theme.typography.fontWeightMedium,
    paddingLeft: draggable ? theme.spacing(1) : theme.spacing(2),
    color: disabled ? theme.palette.text.secondary : theme.palette.text.primary,
  }),
);

type StrategyItemContainerProps = {
  strategy: IFeatureStrategy | PlaygroundStrategySchema;
  onDragStart?: DragEventHandler<HTMLButtonElement>;
  onDragEnd?: DragEventHandler<HTMLButtonElement>;
  actions?: ReactNode;
  orderNumber?: number;
  className?: string;
  style?: React.CSSProperties;
  description?: string;
  children?: React.ReactNode;
};

export const StrategyItemContainer = ({
  strategy,
  onDragStart,
  onDragEnd,
  actions,
  children,
  orderNumber,
  style = {},
  description,
}: StrategyItemContainerProps) => {
  const Icon = getFeatureStrategyIcon(strategy.name);

  const StrategyHeaderLink: React.FC<{ children?: React.ReactNode }> =
    'links' in strategy
      ? ({ children }) => <Link to={strategy.links.edit}>{children}</Link>
      : ({ children }) => <> {children} </>;

  return (
    <Box sx={{ position: 'relative' }}>
      {orderNumber !== undefined && (
        <StyledIndexLabel>{orderNumber}</StyledIndexLabel>
      )}
      <StyledContainer disabled={strategy?.disabled || false} style={style}>
        <StyledHeader
          draggable={Boolean(onDragStart)}
          disabled={Boolean(strategy?.disabled)}
        >
          {Boolean(onDragStart) && (
            <DragIcon
              draggable
              disableRipple
              size='small'
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              sx={{ cursor: 'move' }}
            >
              <DragIndicator
                titleAccess='Drag to reorder'
                cursor='grab'
                sx={{ color: 'action.active' }}
              />
            </DragIcon>
          )}
          <Icon
            sx={{
              fill: (theme) => theme.palette.action.disabled,
            }}
          />
          <StyledHeaderContainer>
            <StrategyHeaderLink>
              <StringTruncator
                maxWidth='400'
                maxLength={15}
                text={formatStrategyName(String(strategy.name))}
              />
              {Boolean(strategy.title) && (
                <StyledCustomTitle>
                  {formatStrategyName(String(strategy.title))}
                </StyledCustomTitle>
              )}
            </StrategyHeaderLink>
            {Boolean(description) && (
              <StyledDescription>{description}</StyledDescription>
            )}
          </StyledHeaderContainer>

          {Boolean(strategy?.disabled) && (
            <Badge color='disabled'>Disabled</Badge>
          )}
          <Box
            sx={{
              marginLeft: 'auto',
              display: 'flex',
              minHeight: (theme) => theme.spacing(6),
              alignItems: 'center',
            }}
          >
            {actions}
          </Box>
        </StyledHeader>
        <Box sx={{ p: 2 }}>{children}</Box>
      </StyledContainer>
    </Box>
  );
};
