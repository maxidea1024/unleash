import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { Box, styled } from '@mui/material';
import { PREDEFINED_ROLE_TYPES } from '@server/util/constants';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import type { IRole } from 'interfaces/role';

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

type RolesActionsCellProps = {
  role: IRole;
  onEdit: (event: React.SyntheticEvent) => void;
  onDelete: (event: React.SyntheticEvent) => void;
};

export const RolesActionsCell = ({
  role,
  onEdit,
  onDelete,
}: RolesActionsCellProps) => {
  const defaultRole = PREDEFINED_ROLE_TYPES.includes(role.type);

  return (
    <StyledBox>
      <PermissionIconButton
        data-loading
        onClick={onEdit}
        permission={ADMIN}
        disabled={defaultRole}
        tooltipProps={{
          title: defaultRole
            ? 'You cannot edit a predefined role'
            : 'Edit role',
        }}
      >
        <Edit />
      </PermissionIconButton>
      <PermissionIconButton
        data-loading
        onClick={onDelete}
        permission={ADMIN}
        disabled={defaultRole}
        tooltipProps={{
          title: defaultRole
            ? 'You cannot remove a predefined role'
            : 'Remove role',
        }}
      >
        <Delete />
      </PermissionIconButton>
    </StyledBox>
  );
};
