import { Alert, Tab, Tabs } from '@mui/material';
import { PageContent } from 'component/common/PageContent/PageContent';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { OidcAuth } from './OidcAuth/OidcAuth';
import { SamlAuth } from './SamlAuth/SamlAuth';
import { ScimSettings } from './ScimSettings/ScimSettings';
import { PasswordAuth } from './PasswordAuth/PasswordAuth';
import { GoogleAuth } from './GoogleAuth/GoogleAuth';
import { PermissionGuard } from 'component/common/PermissionGuard/PermissionGuard';
import { ADMIN } from '@server/types/permissions';
import { PremiumFeature } from 'component/common/PremiumFeature/PremiumFeature';
import { useState } from 'react';
import { TabPanel } from 'component/common/TabNav/TabPanel/TabPanel';
import { usePageTitle } from 'hooks/usePageTitle';

export const AuthSettings = () => {
  const { authenticationType } = useUiConfig().uiConfig;
  const { uiConfig, isEnterprise } = useUiConfig();

  const tabs = [
    {
      label: 'OpenID Connect',
      component: <OidcAuth />,
    },
    {
      label: 'SAML 2.0',
      component: <SamlAuth />,
    },
    {
      label: 'Password',
      component: <PasswordAuth />,
    },
    {
      label: 'Google',
      component: <GoogleAuth />,
    },
  ].filter(
    (item) => uiConfig.flags?.googleAuthEnabled || item.label !== 'Google',
  );

  if (isEnterprise()) {
    tabs.push({
      label: 'SCIM',
      component: <ScimSettings />,
    });
  }

  const [activeTab, setActiveTab] = useState(0);
  usePageTitle(`Single sign-on: ${tabs[activeTab].label}`);

  return (
    <div>
      <PermissionGuard permissions={ADMIN}>
        <PageContent
          withTabs
          header={
            authenticationType === 'enterprise' && (
              <Tabs
                value={activeTab}
                onChange={(_, tabId) => {
                  setActiveTab(tabId);
                }}
                indicatorColor='primary'
                textColor='primary'
              >
                {tabs.map((tab, index) => (
                  <Tab
                    key={`${tab.label}_${index}`}
                    label={tab.label}
                    id={`tab-${index}`}
                    aria-controls={`tabpanel-${index}`}
                    sx={{
                      minWidth: {
                        lg: 160,
                      },
                    }}
                  />
                ))}
              </Tabs>
            )
          }
        >
          {authenticationType === 'open-source' && (
            <PremiumFeature feature='sso' />
          )}
          {authenticationType === 'demo' && (
            <Alert severity='warning'>
              You are running Ganpa in demo mode. You have to use the Enterprise
              edition in order configure Single Sign-on.
            </Alert>
          )}
          {authenticationType === 'custom' && (
            <Alert severity='warning'>
              You have decided to use custom authentication type. You have to
              use the Enterprise edition in order configure Single Sign-on from
              the user interface.
            </Alert>
          )}
          {authenticationType === 'hosted' && (
            <Alert severity='info'>
              Your Ganpa instance is managed by the Ganpa team.
            </Alert>
          )}
          {authenticationType === 'enterprise' && (
            <div>
              {tabs.map((tab, index) => (
                <TabPanel key={index} value={activeTab} index={index}>
                  {tab.component}
                </TabPanel>
              ))}
            </div>
          )}
        </PageContent>
      </PermissionGuard>
    </div>
  );
};
