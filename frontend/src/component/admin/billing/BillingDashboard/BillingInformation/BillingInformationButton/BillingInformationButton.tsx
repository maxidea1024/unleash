import { Button, styled } from '@mui/material';
import { formatApiPath } from 'utils/formatPath';

const PORTAL_URL = formatApiPath('api/admin/invoices');

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(1.5),
}));

type BillingInformationButtonProps = {
  update?: boolean;
};

export const BillingInformationButton = ({
  update,
}: BillingInformationButtonProps) => (
  <StyledButton
    href={`${PORTAL_URL}/${update ? 'portal' : 'checkout'}`}
    variant={update ? 'outlined' : 'contained'}
  >
    {update ? 'Update billing information' : 'Add billing information'}
  </StyledButton>
);
