import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import { TooltipLink } from 'component/common/TooltipLink/TooltipLink';
import { RoleDescription } from 'component/common/RoleDescription/RoleDescription';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { styled } from '@mui/material';

const StyledRoleDescriptions = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  '& > *:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(1),
  },
}));

type SingleRoleProps = {
  value: string;
  role: number;
  roles?: never;
};

type MultipleRolesProps = {
  value: string;
  roles: number[];
  role?: never;
};

type RoleCellProps = SingleRoleProps | MultipleRolesProps;

export const RoleCell = ({ role, roles, value }: RoleCellProps) => {
  const { isEnterprise } = useUiConfig();

  if (isEnterprise()) {
    const rolesArray = roles ? roles : [role];

    return (
      <TextCell>
        <TooltipLink
          tooltip={
            <StyledRoleDescriptions>
              {rolesArray.map((roleId) => (
                <RoleDescription key={roleId} roleId={roleId} tooltip />
              ))}
            </StyledRoleDescriptions>
          }
        >
          {value}
        </TooltipLink>
      </TextCell>
    );
  }

  return <TextCell>{value}</TextCell>;
};
