import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Key from '@mui/icons-material/Key';
import Lock from '@mui/icons-material/Lock';
import LockReset from '@mui/icons-material/LockReset';
import { Box, styled } from '@mui/material';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { ADMIN } from 'component/providers/AccessProvider/permissions';

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

type UsersActionsCellProps = {
  onEdit: (event: React.SyntheticEvent) => void;
  onViewAccess?: (event: React.SyntheticEvent) => void;
  onChangePassword: (event: React.SyntheticEvent) => void;
  onResetPassword: (event: React.SyntheticEvent) => void;
  onDelete: (event: React.SyntheticEvent) => void;
  isScimUser?: boolean;
};

export const UsersActionsCell = ({
  onEdit,
  onViewAccess,
  onChangePassword,
  onResetPassword,
  onDelete,
  isScimUser,
}: UsersActionsCellProps) => {
  const scimTooltip =
    'This user is managed by your SCIM provider and cannot be changed manually';

  return (
    <StyledBox>
      <PermissionIconButton
        data-loading
        onClick={onEdit}
        permission={ADMIN}
        tooltipProps={{
          title: isScimUser ? scimTooltip : 'Edit user',
        }}
        disabled={isScimUser}
      >
        <Edit />
      </PermissionIconButton>

      {Boolean(onViewAccess) && (
        <PermissionIconButton
          data-loading
          onClick={onViewAccess!}
          permission={ADMIN}
          tooltipProps={{
            title: 'Access matrix',
          }}
        >
          <Key />
        </PermissionIconButton>
      )}

      <PermissionIconButton
        data-loading
        onClick={onChangePassword}
        permission={ADMIN}
        tooltipProps={{
          title: isScimUser ? scimTooltip : 'Change password',
        }}
        disabled={isScimUser}
      >
        <Lock />
      </PermissionIconButton>
      <PermissionIconButton
        data-loading
        onClick={onResetPassword}
        permission={ADMIN}
        tooltipProps={{
          title: isScimUser ? scimTooltip : 'Reset password',
        }}
        disabled={isScimUser}
      >
        <LockReset />
      </PermissionIconButton>
      <PermissionIconButton
        data-loading
        onClick={onDelete}
        permission={ADMIN}
        tooltipProps={{
          title: isScimUser ? scimTooltip : 'Remove user',
        }}
        disabled={isScimUser}
      >
        <Delete />
      </PermissionIconButton>
    </StyledBox>
  );
};
