import type { ReactNode } from 'react';
import { Tooltip, type TooltipProps } from '@mui/material';
import { HtmlTooltip } from '../HtmlTooltip/HtmlTooltip';

export type TooltipResolverProps = Omit<TooltipProps, 'title'> & {
  title?: string | null;
  titleComponent?: ReactNode;
  variant?: 'default' | 'custom';
};

export const TooltipResolver = ({
  title,
  children,
  variant = 'default',
  titleComponent,
  ...rest
}: TooltipResolverProps) => {
  if (!title && !titleComponent) {
    return children;
  }

  if (variant === 'custom') {
    return (
      <HtmlTooltip {...rest} title={title || titleComponent} arrow>
        {children}
      </HtmlTooltip>
    );
  }

  return (
    <Tooltip {...rest} title={title || titleComponent} arrow>
      {children}
    </Tooltip>
  );
};
