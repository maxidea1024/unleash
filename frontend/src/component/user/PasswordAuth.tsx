import { type FormEventHandler, useState } from 'react';
import { Button, styled, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import useQueryParams from 'hooks/useQueryParams';
import AuthOptions from './common/AuthOptions/AuthOptions';
import DividerText from 'component/common/DividerText/DividerText';
import { Alert } from '@mui/material';
import { LOGIN_BUTTON, LOGIN_EMAIL_ID, LOGIN_PASSWORD_ID } from 'utils/testIds';
import PasswordField from 'component/common/PasswordField/PasswordField';
import { useAuthApi } from 'hooks/api/actions/useAuthApi/useAuthApi';
import { useAuthUser } from 'hooks/api/getters/useAuth/useAuthUser';
import type { IAuthEndpointDetailsResponse } from 'hooks/api/getters/useAuth/useAuthEndpoint';
import {
  AuthenticationError,
  BadRequestError,
  NotFoundError,
} from 'utils/apiUtils';
import { contentSpacingY } from 'themes/themeStyles';
import useToast from 'hooks/useToast';

const StyledAlert = styled(Alert)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: theme.spacing(1),
}));

const StyledDiv = styled('div')(({ theme }) => ({
  ...contentSpacingY(theme),
  display: 'flex',
  flexDirection: 'column',
}));

type PasswordAuthProps = {
  authDetails: IAuthEndpointDetailsResponse;
  redirect: string;
};

const PasswordAuth = ({ authDetails, redirect }: PasswordAuthProps) => {
  const navigate = useNavigate();
  const { refetchUser } = useAuthUser();
  const params = useQueryParams();
  const [username, setUsername] = useState(params.get('email') || '');
  const [password, setPassword] = useState('');
  const { passwordAuth } = useAuthApi();
  const [errors, setErrors] = useState<{
    usernameError?: string;
    passwordError?: string;
    apiError?: string;
  }>({});
  const { setToastData } = useToast();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    if (!username) {
      setErrors((prev) => ({
        ...prev,
        usernameError: 'This is a required field',
      }));
    }

    if (!password) {
      setErrors((prev) => ({
        ...prev,
        passwordError: 'This is a required field',
      }));
    }

    if (!password || !username) {
      return;
    }

    try {
      const data = await passwordAuth(authDetails.path, username, password);
      if (data.deletedSessions && data.activeSessions) {
        setToastData({
          type: 'success',
          title: 'Maximum Session Limit Reached',
          text: `You can have up to ${data.activeSessions} active sessions at a time. To allow this login, we’ve logged out ${data.deletedSessions} session(s) from other browsers.`,
        });
      }

      refetchUser();

      navigate(redirect, { replace: true });
    } catch (error: any) {
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        setErrors((prev) => ({
          ...prev,
          apiError: 'Invalid login details',
        }));

        setPassword('');

        setUsername('');
      } else if (error instanceof AuthenticationError) {
        setErrors({
          apiError: 'Invalid password and username combination.',
        });
      } else {
        setErrors({
          apiError: 'Unknown error while trying to authenticate.',
        });
      }
    }
  };

  const renderLoginForm = () => {
    const { usernameError, passwordError, apiError } = errors;

    return (
      !authDetails.defaultHidden && (
        <form onSubmit={handleSubmit}>
          {apiError && <StyledAlert severity='error'>{apiError}</StyledAlert>}

          <StyledDiv>
            <TextField
              label='Username or email'
              name='username'
              id='username'
              type='text'
              onChange={(evt) => setUsername(evt.target.value)}
              value={username}
              error={Boolean(usernameError)}
              helperText={usernameError}
              autoComplete='username'
              data-testid={LOGIN_EMAIL_ID}
              variant='outlined'
              size='small'
              autoFocus
            />
            <PasswordField
              label='Password'
              onChange={(evt) => setPassword(evt.target.value)}
              name='password'
              id='password'
              value={password}
              error={Boolean(passwordError)}
              helperText={passwordError}
              autoComplete='off'
              data-testid={LOGIN_PASSWORD_ID}
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
              style={{ width: '150px', margin: '1rem auto' }}
              data-testid={LOGIN_BUTTON}
            >
              Sign in
            </Button>
          </StyledDiv>
        </form>
      )
    );
  };

  const { options = [] } = authDetails;

  return (
    <>
      {options.length > 0 ? (
        <>
          <AuthOptions options={options} />
          {!authDetails.defaultHidden && (
            <DividerText text='Or sign in with username' />
          )}
          {renderLoginForm()}
        </>
      ) : (
        renderLoginForm()
      )}
    </>
  );
};

export default PasswordAuth;
