import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';

const ZendeskButton = () => {
  const openZendeskSupport = () => {
    window?.open('https://getunleash.zendesk.com', '_blank');
  };
  return <Button onClick={openZendeskSupport}>Open a ticket</Button>;
};

type ErrorProps = {
  error: Error;
};

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Error = ({ error }: ErrorProps) => {
  const navigate = useNavigate();
  const { trackEvent } = usePlausibleTracker();
  const { isOss } = useUiConfig();
  const showZendeskButton = true;//!isOss();

  useEffect(() => {
    const { message, stack = 'unknown' } = error;

    trackEvent('unknown_ui_error', {
      props: {
        location: window?.location?.href || 'unknown',
        message,
        stack,
      },
    });
  }, []);

  return (
    <Box sx={{ backgroundColor: 'neutral.light', height: '100%', p: 4 }}>
      <Dialogue
        open={true}
        title='Something went wrong'
        primaryButtonText='Go back'
        onClick={() => {
          navigate('/');
          window?.location?.reload();
        }}
        secondaryButtonText='Reload this page'
        onClose={() => {
          window?.location?.reload();
        }}
        maxWidth='xl'
        customButton={showZendeskButton ? <ZendeskButton /> : undefined}
      >
        <Box component='pre' sx={{ color: 'error.main' }}>
          {error.message}
        </Box>
        {Boolean(error.stack) && (
          <Box component='pre' sx={{ color: 'error.main' }}>
            {error.stack}
          </Box>
        )}
      </Dialogue>
    </Box>
  );
};
