import type React from 'react';
import { type FC, useState } from 'react';
import classnames from 'classnames';
import { styled, TextField, Typography } from '@mui/material';
import { trim } from 'component/common/util';
import { modalStyles } from 'component/admin/users/util';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import PasswordChecker, {
  PASSWORD_FORMAT_MESSAGE,
} from 'component/user/common/ResetPasswordForm/PasswordChecker';
import { useThemeStyles } from 'themes/themeStyles';
import PasswordMatcher from 'component/user/common/ResetPasswordForm/PasswordMatcher';
import type { IUser } from 'interfaces/user';
import useAdminUsersApi from 'hooks/api/actions/useAdminUsersApi/useAdminUsersApi';
import { UserAvatar } from 'component/common/UserAvatar/UserAvatar';
import useToast from 'hooks/useToast';
import { formatUnknownError } from 'utils/formatUnknownError';

const StyledUserAvatar = styled(UserAvatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  margin: 0,
}));

type ChangePasswordProps = {
  showDialog: boolean;
  closeDialog: () => void;
  user: IUser;
};

const ChangePassword = ({
  showDialog,
  closeDialog,
  user,
}: ChangePasswordProps) => {
  const [data, setData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>();
  const [validPassword, setValidPassword] = useState(false);
  const { classes: themeStyles } = useThemeStyles();
  const { changePassword } = useAdminUsersApi();
  const { setToastData, setToastApiError } = useToast();

  const updateField: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setError(undefined);
    setData({ ...data, [event.target.name]: trim(event.target.value) });
  };

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (data.password !== data.confirm) {
      return;
    }

    if (!validPassword) {
      setError(PASSWORD_FORMAT_MESSAGE);
      return;
    }

    try {
      await changePassword(user.id, data.password);
      setData({});
      closeDialog();
      setToastData({
        title: 'Password changed successfully',
        text: 'The user can now sign in using the new password.',
        type: 'success',
      });
    } catch (error: unknown) {
      const formattedError = formatUnknownError(error);
      setError(formattedError);
      setToastApiError(formattedError);
    }
  };

  const onCancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setData({});
    setError(undefined);
    closeDialog();
  };

  return (
    <Dialogue
      open={showDialog}
      onClick={submit}
      style={modalStyles}
      onClose={onCancel}
      primaryButtonText='Save'
      title='Update password'
      secondaryButtonText='Cancel'
      maxWidth='xs'
    >
      <form
        onSubmit={submit}
        className={classnames(
          themeStyles.contentSpacingY,
          themeStyles.flexColumn,
        )}
      >
        <Typography variant='subtitle1'>Changing password for user</Typography>
        <div className={themeStyles.flexRow}>
          <StyledUserAvatar user={user} variant='rounded' />
          <Typography variant='subtitle1' style={{ marginLeft: '1rem' }}>
            {user.username || user.email}
          </Typography>
        </div>
        <PasswordChecker password={data.password} callback={setValidPassword} />
        <TextField
          label='New password'
          name='password'
          type='password'
          value={data.password}
          error={Boolean(error)}
          helperText={error}
          onChange={updateField}
          variant='outlined'
          size='small'
        />
        <TextField
          label='Confirm password'
          name='confirm'
          type='password'
          value={data.confirm}
          onChange={updateField}
          variant='outlined'
          size='small'
        />
        <PasswordMatcher
          started={Boolean(data.password && data.confirm)}
          passwordsDoNotMatch={data.password !== data.confirm}
        />
      </form>
    </Dialogue>
  );
};

export default ChangePassword;
