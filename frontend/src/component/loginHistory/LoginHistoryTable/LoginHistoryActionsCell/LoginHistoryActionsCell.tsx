import Delete from '@mui/icons-material/Delete';
import { Box, styled } from '@mui/material';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { ADMIN } from 'component/providers/AccessProvider/permissions';

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

type LoginHistoryActionsCellProps = {
  onDelete: (event: React.SyntheticEvent) => void;
};

export const LoginHistoryActionsCell = ({
  onDelete,
}: LoginHistoryActionsCellProps) => {
  return (
    <StyledBox>
      <PermissionIconButton
        data-loading
        onClick={onDelete}
        permission={ADMIN}
        tooltipProps={{
          title: 'Remove event',
        }}
      >
        <Delete />
      </PermissionIconButton>
    </StyledBox>
  );
};
