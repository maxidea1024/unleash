import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { Box, styled } from '@mui/material';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { ADMIN } from 'component/providers/AccessProvider/permissions';

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

type ServiceAccountsActionsCellProps = {
  onEdit: (event: React.SyntheticEvent) => void;
  onDelete: (event: React.SyntheticEvent) => void;
};

export const ServiceAccountsActionsCell = ({
  onEdit,
  onDelete,
}: ServiceAccountsActionsCellProps) => {
  return (
    <StyledBox>
      <PermissionIconButton
        data-loading
        onClick={onEdit}
        permission={ADMIN}
        tooltipProps={{
          title: 'Edit service account',
        }}
      >
        <Edit />
      </PermissionIconButton>
      <PermissionIconButton
        data-loading
        onClick={onDelete}
        permission={ADMIN}
        tooltipProps={{
          title: 'Remove service account',
        }}
      >
        <Delete />
      </PermissionIconButton>
    </StyledBox>
  );
};
