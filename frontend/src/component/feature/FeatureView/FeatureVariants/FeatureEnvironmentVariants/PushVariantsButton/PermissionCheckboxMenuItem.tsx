import { useHasProjectEnvironmentAccess } from 'hooks/useHasAccess';
import { Checkbox, MenuItem } from '@mui/material';

type PermissionCheckboxMenuItemProps = {
  permission: string | string[];
  projectId: string;
  environment: string;
  checked: boolean;
  onClick: () => void;
};

export const PermissionCheckboxMenuItem = ({
  permission,
  projectId,
  environment,
  checked,
  onClick,
  ...props
}: PermissionCheckboxMenuItemProps) => {
  const hasPermissions = useHasProjectEnvironmentAccess(
    permission,
    projectId,
    environment,
  );

  return (
    <MenuItem disabled={!hasPermissions} onClick={onClick} {...props}>
      <Checkbox checked={checked} />
      {environment}
    </MenuItem>
  );
};
