import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { Badge } from 'component/common/Badge/Badge';
import { styled } from '@mui/material';
import type { IRole } from 'interfaces/role';
import { HighlightCell } from 'component/common/Table/cells/HighlightCell/HighlightCell';
import { PREDEFINED_ROLE_TYPES } from '@server/util/constants';

const StyledBadge = styled(Badge)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

type RolesCellProps = {
  role: IRole;
};

export const RolesCell = ({ role }: RolesCellProps) => (
  <HighlightCell
    value={role.name}
    subtitle={role.description}
    afterTitle={
      <ConditionallyRender
        condition={PREDEFINED_ROLE_TYPES.includes(role.type)}
        show={<StyledBadge color='success'>Predefined</StyledBadge>}
      />
    }
  />
);
