import { Alert, AlertTitle } from '@mui/material';

type ResetPasswordErrorProps = {
  children: string;
};

const ResetPasswordError = ({ children }: ResetPasswordErrorProps) => {
  if (!children) {
    return null;
  }

  return (
    <Alert severity='error' data-loading>
      <AlertTitle>Unable to reset password</AlertTitle>
      {children}
    </Alert>
  );
};

export default ResetPasswordError;
