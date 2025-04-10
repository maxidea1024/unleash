import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import { TooltipLink } from 'component/common/TooltipLink/TooltipLink';
import type { IRole } from 'interfaces/role';
import { useRole } from 'hooks/api/getters/useRole/useRole';
import { RoleDescription } from 'component/common/RoleDescription/RoleDescription';
import { PREDEFINED_ROLE_TYPES } from '@server/util/constants';

type RolePermissionsCellProps = {
  row: { original: IRole };
};

export const RolePermissionsCell = ({ row }: RolePermissionsCellProps) => {
  const { original: rowRole } = row;
  const { role } = useRole(rowRole.id.toString());

  if (!role || PREDEFINED_ROLE_TYPES.includes(role.type)) {
    return null;
  }

  return (
    <TextCell>
      <TooltipLink tooltip={<RoleDescription roleId={rowRole.id} tooltip />}>
        {role.permissions?.length === 1
          ? '1 permission'
          : `${role.permissions?.length} permissions`}
      </TooltipLink>
    </TextCell>
  );
};
