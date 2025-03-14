import type { ReactElement } from 'react';
import {
  formatCurrentVersion,
  formatUpdateNotification,
  type IPartialUiConfig,
} from './apidetails.helpers';
import { FooterTitle } from 'component/menu/Footer/FooterTitle';

type ApiDetailsProps = {
  uiConfig: IPartialUiConfig;
};

export const ApiDetails = (props: ApiDetailsProps): ReactElement => {
  const instanceId = props.uiConfig.versionInfo?.instanceId;
  const { name, version, buildNumber } = formatCurrentVersion(props.uiConfig);
  const { environment, billing } = props.uiConfig;
  const updateNotification = formatUpdateNotification(props.uiConfig);

  const buildInfo = buildNumber ? <small>({buildNumber})</small> : '';

  return (
    <section title='API details'>
      <FooterTitle>
        {name} {environment ? environment : ''}
        {billing === 'pay-as-you-go' ? ' Pay-as-You-Go' : ''} {version}{' '}
        {buildInfo}
      </FooterTitle>
      {updateNotification && (
        <small>
          {updateNotification}
          <br />
        </small>
      )}
      <br />
      <small>{props.uiConfig.slogan}</small>
      <br />
      {instanceId && <small>{`${instanceId}`}</small>}
    </section>
  );
};
