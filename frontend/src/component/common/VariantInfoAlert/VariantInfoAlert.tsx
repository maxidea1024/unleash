import { Alert, styled } from '@mui/material';

const StyledAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& code': {
    fontWeight: theme.fontWeight.bold,
  },
}));

type VariantInfoAlertProps = {
  mode: 'feature' | 'strategy';
};

export const VariantInfoAlert = ({ mode }: VariantInfoAlertProps) => {
  return (
    <StyledAlert severity='info'>
      Variant allows you to return a variant object if the{' '}
      {mode === 'feature'
        ? 'feature flag is considered enabled '
        : 'this strategy is active '}
      for the current request. When using variants you should use the{' '}
      <code>getVariant()</code> method in the Client SDK.
    </StyledAlert>
  );
};
