import { Button, type ButtonProps } from '@mui/material';
import Lock from '@mui/icons-material/Lock';
import React from 'react';
import {
  TooltipResolver,
  type TooltipResolverProps,
} from 'component/common/TooltipResolver/TooltipResolver';
import { formatAccessText } from 'utils/formatAccessText';
import { useId } from 'hooks/useId';
import {
  useHasRootAccess,
  useHasProjectEnvironmentAccess,
} from 'hooks/useHasAccess';

export type PermissionButtonProps = Omit<ButtonProps, 'title'> & {
  permission: string | string[];
  onClick?: (e: any) => void;
  disabled?: boolean;
  projectId?: string;
  environmentId?: string;
  tooltipProps?: Omit<TooltipResolverProps, 'children'>;
  hideLockIcon?: boolean;
  children?: React.ReactNode;
};

type PermissionBaseButtonProps = PermissionButtonProps & {
  access: boolean;
};

export type ProjectPermissionButtonProps = PermissionButtonProps & {
  projectId: string;
  environmentId: string;
};

const getEndIcon = (
  access: boolean,
  fallBackIcon?: React.ReactNode,
  hideLockIcon?: boolean,
): React.ReactNode => {
  if (!access && !hideLockIcon) {
    return <Lock titleAccess='Locked' />;
  }

  if (fallBackIcon) {
    return fallBackIcon;
  }

  return null;
};

const ProjectEnvironmentPermissionButton = React.forwardRef<
  HTMLButtonElement,
  ProjectPermissionButtonProps
>((props, ref) => {
  const access = useHasProjectEnvironmentAccess(
    props.permission,
    props.projectId,
    props.environmentId,
  );

  return <BasePermissionButton {...props} access={access} ref={ref} />;
});

const RootPermissionButton = React.forwardRef<
  HTMLButtonElement,
  PermissionButtonProps
>((props, ref) => {
  const access = useHasRootAccess(
    props.permission,
    props.projectId,
    props.environmentId,
  );

  return <BasePermissionButton {...props} access={access} ref={ref} />;
});

const BasePermissionButton = React.forwardRef<
  HTMLButtonElement,
  PermissionBaseButtonProps
>(
  (
    {
      permission,
      access,
      variant = 'contained',
      color = 'primary',
      onClick,
      children,
      disabled,
      projectId,
      environmentId,
      tooltipProps,
      hideLockIcon,
      ...rest
    },
    ref,
  ) => {
    const id = useId();
    const endIcon = getEndIcon(access, rest.endIcon, hideLockIcon);

    return (
      <TooltipResolver
        {...tooltipProps}
        title={formatAccessText(access, tooltipProps?.title)}
        arrow
      >
        <span id={id}>
          <Button
            ref={ref}
            onClick={onClick}
            disabled={disabled || !access}
            aria-labelledby={id}
            variant={variant}
            color={color}
            {...rest}
            endIcon={endIcon}
          >
            {children}
          </Button>
        </span>
      </TooltipResolver>
    );
  },
);

const PermissionButton = React.forwardRef<
  HTMLButtonElement,
  PermissionButtonProps
>((props, ref) => {
  if (
    typeof props.projectId !== 'undefined' &&
    typeof props.environmentId !== 'undefined'
  ) {
    return (
      <ProjectEnvironmentPermissionButton
        {...props}
        environmentId={props.environmentId}
        projectId={props.projectId}
        ref={ref}
      />
    );
  }
  return <RootPermissionButton {...props} ref={ref} />;
});

export default PermissionButton;
