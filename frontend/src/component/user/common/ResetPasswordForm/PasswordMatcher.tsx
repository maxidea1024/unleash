import { styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const StyledMatcher = styled('div', {
  shouldForwardProp: (prop) => prop !== 'error',
})<{ error: boolean }>(({ theme, error }) => ({
  display: 'flex',
  alignItems: 'center',
  lineHeight: 1,
  color: error ? theme.palette.error.main : theme.palette.primary.main,
}));

const StyledMatcherCheckIcon = styled(CheckIcon)({
  marginRight: '5px',
});

const StyledMatcherErrorIcon = styled(CloseIcon)({
  marginRight: '5px',
});

type PasswordMatcherProps = {
  started: boolean;
  passwordsDoNotMatch: boolean;
  sameAsOldPassword?: boolean;
};

const PasswordMatcher = ({
  started,
  passwordsDoNotMatch,
  sameAsOldPassword = false,
}: PasswordMatcherProps) => {
  const error = passwordsDoNotMatch || sameAsOldPassword;

  if (!started) {
    return null;
  }

  const label = passwordsDoNotMatch
    ? 'Passwords do not match'
    : sameAsOldPassword
      ? 'Cannot be the same as the old password'
      : 'Passwords match';

  return (
    <StyledMatcher data-loading error={error}>
      {error ? <StyledMatcherErrorIcon /> : <StyledMatcherCheckIcon />}{' '}
      <span>{label}</span>
    </StyledMatcher>
  );
};

export default PasswordMatcher;
