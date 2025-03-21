import type React from 'react';
import { useMediaQuery } from '@mui/material';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import type { TooltipResolverProps } from '../TooltipResolver/TooltipResolver';
import type { OverridableStringUnion } from '@mui/types';
import type { ButtonPropsVariantOverrides } from '@mui/material/Button/Button';

type ResponsiveButtonProps = {
  Icon: React.ElementType;
  endIcon?: React.ReactNode;
  tooltipProps?: Omit<TooltipResolverProps, 'children'>;
  onClick: () => void;
  disabled?: boolean;
  permission: string | string[];
  projectId?: string;
  environmentId?: string;
  maxWidth: string;
  variant?: OverridableStringUnion<
    'text' | 'outlined' | 'contained',
    ButtonPropsVariantOverrides
  >;
  className?: string;
  children?: React.ReactNode;
};

const ResponsiveButton = ({
  Icon,
  onClick,
  maxWidth,
  disabled = false,
  children,
  permission,
  environmentId,
  projectId,
  endIcon,
  variant,
  ...rest
}: ResponsiveButtonProps) => {
  const smallScreen = useMediaQuery(`(max-width:${maxWidth})`);

  return smallScreen ? (
    <PermissionIconButton
      disabled={disabled}
      onClick={onClick}
      permission={permission}
      projectId={projectId}
      environmentId={environmentId}
      data-loading
      {...rest}
    >
      <Icon />
    </PermissionIconButton>
  ) : (
    <PermissionButton
      onClick={onClick}
      permission={permission}
      projectId={projectId}
      color='primary'
      variant={variant}
      disabled={disabled}
      environmentId={environmentId}
      endIcon={endIcon}
      data-loading
      {...rest}
    >
      {children}
    </PermissionButton>
  );
};

export default ResponsiveButton;
