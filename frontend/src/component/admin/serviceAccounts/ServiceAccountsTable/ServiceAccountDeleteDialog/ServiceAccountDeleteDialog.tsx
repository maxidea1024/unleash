import { Alert, styled } from '@mui/material';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import type { IServiceAccount } from 'interfaces/service-account';
import { ServiceAccountTokens } from '../ServiceAccountModal/ServiceAccountTokens/ServiceAccountTokens';

const StyledTableContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1.5),
}));

const StyledLabel = styled('p')(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

type ServiceAccountDeleteDialogProps = {
  serviceAccount?: IServiceAccount;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (serviceAccount: IServiceAccount) => void;
};

export const ServiceAccountDeleteDialog = ({
  serviceAccount,
  open,
  setOpen,
  onConfirm,
}: ServiceAccountDeleteDialogProps) => {
  const deleteMessage = (
    <>
      You are about to delete service account:{' '}
      <strong>{serviceAccount?.name}</strong>
    </>
  );

  return (
    <Dialogue
      title='Delete service account?'
      open={open}
      primaryButtonText='Delete service account'
      secondaryButtonText='Cancel'
      onClick={() => onConfirm(serviceAccount!)}
      onClose={() => {
        setOpen(false);
      }}
    >
      {serviceAccount?.tokens.length ? (
        <>
          <Alert severity='error'>
            Deleting this service account may break any existing implementations
            currently using it.
          </Alert>
          <StyledLabel>{deleteMessage}</StyledLabel>
          <StyledLabel>Service account tokens:</StyledLabel>
          <StyledTableContainer>
            <ServiceAccountTokens serviceAccount={serviceAccount} readOnly />
          </StyledTableContainer>
        </>
      ) : (
        <p>{deleteMessage}</p>
      )}
    </Dialogue>
  );
};
