import { Banner } from '../Banner/Banner';
import type { IBanner } from 'interfaces/banner';
import { useOutdatedSdks } from 'hooks/api/getters/useOutdatedSdks/useOutdatedSdks';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';

const StyledList = styled('ul')({ margin: 0 });

type OutdatedSdksBannerProps = {
  project: string;
};

export const OutdatedSdksBanner = ({ project }: OutdatedSdksBannerProps) => {
  const {
    data: { sdks },
  } = useOutdatedSdks(project);
  const { trackEvent } = usePlausibleTracker();

  const applicationClickedWithVersion = (sdkVersion: string) => {
    trackEvent('sdk-banner', {
      props: {
        eventType: `banner application clicked`,
        sdkVersion: sdkVersion,
      },
    });
  };

  const bannerClicked = () => {
    trackEvent('sdk-banner', {
      props: {
        eventType: 'banner clicked',
      },
    });
  };

  const outdatedSdksBanner: IBanner = {
    message: `We noticed that an outdated SDK version is connected to ${project} project.`,
    variant: 'warning',
    link: 'dialog',
    linkText: 'Please update those versions',
    linkClicked: bannerClicked,
    dialogTitle: 'Outdated SDKs',
    dialog: (
      <>
        {sdks.map((item) => (
          <div key={item.sdkVersion}>
            <span>{item.sdkVersion}</span>
            <StyledList>
              {item.applications.map((application) => (
                <li
                  key={application}
                  onClick={() => {
                    applicationClickedWithVersion(item.sdkVersion);
                  }}
                  onKeyDown={() => {
                    applicationClickedWithVersion(item.sdkVersion);
                  }}
                >
                  <Link to={`/applications/${application}`}>{application}</Link>
                </li>
              ))}
            </StyledList>
          </div>
        ))}
      </>
    ),
  };
  return (
    <>{sdks.length > 0 && <Banner banner={outdatedSdksBanner} inline />}</>
  );
};
