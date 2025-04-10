import { Box, Card, styled, Typography } from '@mui/material';
import EnvironmentIcon from 'component/common/EnvironmentIcon/EnvironmentIcon';
import { BILLING_PRO_DEFAULT_INCLUDED_SEATS } from 'component/admin/billing/BillingDashboard/BillingPlan/BillingPlan';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  justifyContent: 'center',
  height: '100%',
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(7.5),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: `${theme.shape.borderRadiusMedium}px`,
  boxShadow: 'none',
}));

const StyledCardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  padding: theme.spacing(2),
}));

const StyledExtraText = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

type OrderEnvironmentsDialogPricingProps = {
  pricingOptions: Array<{ environments: number; price: number }>;
};

export const OrderEnvironmentsDialogPricing = ({
  pricingOptions,
}: OrderEnvironmentsDialogPricingProps) => (
  <StyledContainer>
    <Typography variant='h3' component='div' color='white' gutterBottom>
      Pricing
    </Typography>
    {pricingOptions.map((option) => (
      <StyledCard key={option.environments}>
        <StyledCardContent>
          <EnvironmentIcon enabled />
          <Box>
            <Box>
              <Typography variant='body2' fontWeight='bold'>
                {option.environments} additional environment
                {option.environments > 1 ? 's' : ''}
              </Typography>
            </Box>
            <Typography variant='body2'>
              ${option.price} per user per month
            </Typography>
          </Box>
        </StyledCardContent>
      </StyledCard>
    ))}
    <StyledExtraText>
      <Typography variant='body2' color='white'>
        With Pro, there is a minimum of {BILLING_PRO_DEFAULT_INCLUDED_SEATS}{' '}
        users, meaning an additional environment will cost at least $50 per
        month.
      </Typography>
    </StyledExtraText>
  </StyledContainer>
);
