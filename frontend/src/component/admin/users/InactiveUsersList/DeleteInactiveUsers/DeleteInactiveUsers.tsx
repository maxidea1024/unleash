import { Dialogue } from '../../../../common/Dialogue/Dialogue';
import useLoading from '../../../../../hooks/useLoading';
import { Alert, Typography } from '@mui/material';
import { DEL_INACTIVE_USERS_ERROR } from '../../../../../hooks/api/actions/useInactiveUsersApi/useInactiveUsersApi';
import type { IInactiveUser } from '../../../../../hooks/api/getters/useInactiveUsers/useInactiveUsers';
import { flexRow } from '../../../../../themes/themeStyles';

type DeleteInactiveUsersProps = {
  showDialog: boolean;
  closeDialog: () => void;
  inactiveUsersLoading: boolean;
  removeInactiveUsers: () => void;
  inactiveUserApiErrors: Record<string, string>;
  inactiveUsers: IInactiveUser[];
};

export const DeleteInactiveUsers = ({
  showDialog,
  closeDialog,
  inactiveUsersLoading,
  removeInactiveUsers,
  inactiveUserApiErrors,
  inactiveUsers,
}: DeleteInactiveUsersProps) => {
  const ref = useLoading(inactiveUsersLoading);
  return (
    <Dialogue
      open={showDialog}
      title={`Really delete all inactive users?`}
      onClose={closeDialog}
      onClick={removeInactiveUsers}
      primaryButtonText={'Delete all inactive users'}
      secondaryButtonText={'Cancel'}
    >
      <div ref={ref}>
        {Boolean(inactiveUserApiErrors[DEL_INACTIVE_USERS_ERROR]) && (
          <Alert data-loading severity='error' style={{ margin: '1rem 0' }}>
            {inactiveUserApiErrors[DEL_INACTIVE_USERS_ERROR]}
          </Alert>
        )}
        <div style={flexRow}>
          <Typography variant='subtitle1'>
            You will be deleting{' '}
            {inactiveUsers.length === 1
              ? `1 inactive user`
              : `${inactiveUsers.length} inactive users`}
          </Typography>
        </div>
      </div>
    </Dialogue>
  );
};
