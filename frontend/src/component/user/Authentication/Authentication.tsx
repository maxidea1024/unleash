import SimpleAuth from '../SimpleAuth/SimpleAuth';
import { AuthenticationCustomComponent } from 'component/user/AuthenticationCustomComponent';
import PasswordAuth from '../PasswordAuth';
import HostedAuth from '../HostedAuth';
import DemoAuth from '../DemoAuth/DemoAuth';
import {
  SIMPLE_TYPE,
  DEMO_TYPE,
  PASSWORD_TYPE,
  HOSTED_TYPE,
} from 'constants/authTypes';
import SecondaryLoginActions from '../common/SecondaryLoginActions';
import useQueryParams from 'hooks/useQueryParams';
import { Alert } from '@mui/material';
import { useAuthDetails } from 'hooks/api/getters/useAuth/useAuthDetails';
import { AUTH_PAGE_ID } from 'utils/testIds';
import { type ReactElement, useEffect, useLayoutEffect } from 'react';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';
import { setSessionStorageItem } from 'utils/storage';

type AuthenticationProps = {
  redirect: string;
  invited?: boolean;
};

const Authentication = ({ redirect, invited = false }: AuthenticationProps) => {
  const { authDetails } = useAuthDetails();
  const params = useQueryParams();
  const error = params.get('errorMsg');
  const { trackEvent } = usePlausibleTracker();

  useLayoutEffect(() => {
    window.onload = () => {
      window.focus();
    };
  }, []);

  useEffect(() => {
    if (redirect) {
      setSessionStorageItem('login-redirect', redirect, 1000 * 60 * 10);
    }
  }, [redirect]);

  useEffect(() => {
    if (invited) {
      trackEvent('invite', {
        props: {
          eventType: 'user created',
        },
      });
    }
  }, [invited, trackEvent]);

  if (!authDetails) {
    return null;
  }

  let content: ReactElement;
  if (authDetails.type === PASSWORD_TYPE) {
    content = (
      <>
        <PasswordAuth authDetails={authDetails} redirect={redirect} />
        {!authDetails.defaultHidden && <SecondaryLoginActions />}
      </>
    );
  } else if (authDetails.type === SIMPLE_TYPE) {
    content = <SimpleAuth authDetails={authDetails} redirect={redirect} />;
  } else if (authDetails.type === DEMO_TYPE) {
    content = <DemoAuth authDetails={authDetails} redirect={redirect} />;
  } else if (authDetails.type === HOSTED_TYPE) {
    content = (
      <>
        <HostedAuth authDetails={authDetails} redirect={redirect} />
        {!authDetails.defaultHidden && <SecondaryLoginActions />}
      </>
    );
  } else {
    content = <AuthenticationCustomComponent authDetails={authDetails} />;
  }

  return (
    <>
      <div style={{ maxWidth: '350px' }} data-testid={AUTH_PAGE_ID}>
        {Boolean(error) && <Alert severity='error'>{error}</Alert>}
      </div>
      {content}
    </>
  );
};

export default Authentication;
