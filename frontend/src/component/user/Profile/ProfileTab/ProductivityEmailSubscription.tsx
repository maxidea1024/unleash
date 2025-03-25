import { Box, FormControlLabel, Switch } from '@mui/material';
import { formatUnknownError } from 'utils/formatUnknownError';
import { useEmailSubscriptionApi } from 'hooks/api/actions/useEmailSubscriptionApi/useEmailSubscriptionApi';
import useToast from 'hooks/useToast';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';

type ProductivityEmailSubscriptionProps = {
  status: 'subscribed' | 'unsubscribed';
  onChange: () => void;
};

export const ProductivityEmailSubscription = ({
  status,
  onChange,
}: ProductivityEmailSubscriptionProps) => {
  const {
    subscribe,
    unsubscribe,
    loading: changingSubscriptionStatus,
  } = useEmailSubscriptionApi();
  const { setToastData, setToastApiError } = useToast();
  const { trackEvent } = usePlausibleTracker();

  return (
    <Box>
      <FormControlLabel
        label='Productivity Email Subscription'
        control={
          <Switch
            onChange={async () => {
              try {
                if (status === 'subscribed') {
                  await unsubscribe('productivity-report');

                  setToastData({
                    title: 'Unsubscribed from productivity report',
                    type: 'success',
                  });

                  trackEvent('productivity-report', {
                    props: {
                      eventType: 'subscribe',
                    },
                  });
                } else {
                  await subscribe('productivity-report');

                  setToastData({
                    title: 'Subscribed to productivity report',
                    type: 'success',
                  });

                  trackEvent('productivity-report', {
                    props: {
                      eventType: 'unsubscribe',
                    },
                  });
                }
              } catch (error) {
                setToastApiError(formatUnknownError(error));
              }

              onChange();
            }}
            name='productivity-email'
            checked={status === 'subscribed'}
            disabled={changingSubscriptionStatus}
          />
        }
      />
    </Box>
  );
};
