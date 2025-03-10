import { Switch, type SwitchProps } from '@mui/material';
import React from 'react';
import { formatAccessText } from 'utils/formatAccessText';
import { TooltipResolver } from 'component/common/TooltipResolver/TooltipResolver';
import {
  useHasProjectEnvironmentAccess,
  useHasRootAccess,
} from 'hooks/useHasAccess';

type PermissionSwitchProps = SwitchProps & {
  permission: string | string[];
  tooltip?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  projectId?: string;
  environmentId?: string;
  checked: boolean;
};

type BasePermissionSwitchProps = PermissionSwitchProps & {
  access: boolean;
};

const ProjectenvironmentPermissionSwitch = React.forwardRef<
  HTMLButtonElement,
  PermissionSwitchProps & { projectId: string; environmentId: string }
>((props, ref) => {
  const access = useHasProjectEnvironmentAccess(
    props.permission,
    props.projectId,
    props.environmentId,
  );

  return <BasePermissionSwitch {...props} access={access} ref={ref} />;
});

const RootPermissionSwitch = React.forwardRef<
  HTMLButtonElement,
  PermissionSwitchProps
>((props, ref) => {
  const access = useHasRootAccess(
    props.permission,
    props.projectId,
    props.environmentId,
  );

  return <BasePermissionSwitch {...props} access={access} ref={ref} />;
});

const BasePermissionSwitch = React.forwardRef<
  HTMLButtonElement,
  BasePermissionSwitchProps
>((props, ref) => {
  const {
    access,
    permission,
    tooltip,
    disabled,
    projectId,
    environmentId,
    checked,
    onChange,
    ...rest
  } = props;

  return (
    <TooltipResolver
      title={formatAccessText(access, tooltip)}
      arrow
      variant='custom'
    >
      <span data-loading>
        <Switch
          data-testid='toggle-switch'
          onChange={onChange}
          disabled={disabled || !access}
          checked={checked}
          ref={ref}
          {...rest}
        />
      </span>
    </TooltipResolver>
  );
});

const PermissionSwitch = React.forwardRef<
  HTMLButtonElement,
  PermissionSwitchProps
>((props, ref) => {
  if (
    typeof props.projectId !== 'undefined' &&
    typeof props.environmentId !== 'undefined'
  ) {
    return (
      <ProjectenvironmentPermissionSwitch
        {...props}
        projectId={props.projectId}
        environmentId={props.environmentId}
        ref={ref}
      />
    );
  }
  return <RootPermissionSwitch {...props} ref={ref} />;
});

export default PermissionSwitch;
