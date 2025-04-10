import Input from 'component/common/Input/Input';
import { Button, FormControl, Typography, Switch, styled } from '@mui/material';
import type React from 'react';
import { EDIT } from 'constants/misc';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { RoleSelect } from 'component/common/RoleSelect/RoleSelect';
import type { IRole } from 'interfaces/role';
import { useUsers } from 'hooks/api/getters/useUsers/useUsers';

const StyledForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const StyledContainer = styled('div')(({ theme }) => ({
  maxWidth: theme.spacing(50),
}));

const StyledInputDescription = styled('p')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledInput = styled(Input)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const StyledRoleSubtitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

const StyledFlexRow = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledButtonContainer = styled('div')(() => ({
  marginTop: 'auto',
  display: 'flex',
  justifyContent: 'flex-end',
}));

const StyledCancelButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(3),
}));

type UserFormProps = {
  email: string;
  name: string;
  rootRole: IRole | null;
  sendEmail: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSendEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setRootRole: React.Dispatch<React.SetStateAction<IRole | null>>;
  handleSubmit: (e: any) => void;
  handleCancel: () => void;
  errors: { [key: string]: string };
  clearErrors: () => void;
  mode?: string;
  children?: React.ReactNode;
};

const UserForm = ({
  children,
  email,
  name,
  rootRole,
  sendEmail,
  setEmail,
  setName,
  setSendEmail,
  setRootRole,
  handleSubmit,
  handleCancel,
  errors,
  clearErrors,
  mode,
}: UserFormProps) => {
  const { uiConfig } = useUiConfig();
  const { roles } = useUsers();

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledContainer>
        <StyledInputDescription>
          Who is the new Ganpa user?
        </StyledInputDescription>
        <StyledInput
          label='Full name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(errors.name)}
          errorText={errors.name}
          onFocus={() => clearErrors()}
          autoFocus
        />
        <StyledInput
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          errorText={errors.email}
          onFocus={() => clearErrors()}
        />
        <StyledRoleSubtitle variant='subtitle1' data-loading>
          What is your team member allowed to do?
        </StyledRoleSubtitle>
        <RoleSelect
          roles={roles}
          value={rootRole}
          setValue={setRootRole}
          required
        />
        {mode !== EDIT && Boolean(uiConfig?.emailEnabled) && (
          <FormControl>
            <StyledRoleSubtitle variant='subtitle1' data-loading>
              Should we send an email to your new team member
            </StyledRoleSubtitle>
            <StyledFlexRow>
              <Switch
                name='sendEmail'
                onChange={() => setSendEmail(!sendEmail)}
                checked={sendEmail}
              />
              <Typography>{sendEmail ? 'Yes' : 'No'}</Typography>
            </StyledFlexRow>
          </FormControl>
        )}
      </StyledContainer>
      <StyledButtonContainer>
        {children}
        <StyledCancelButton onClick={handleCancel}>Cancel</StyledCancelButton>
      </StyledButtonContainer>
    </StyledForm>
  );
};

export default UserForm;
