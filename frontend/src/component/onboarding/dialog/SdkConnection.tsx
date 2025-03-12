import { Suspense } from 'react';
import Loader from 'component/common/Loader/Loader';
import TestSdkConnection from './TestSdkConnection';
import type { ISdk } from './sharedTypes';
import { SdkConnected } from './SdkConnected';

type SdkConnectionProps = {
  sdk: ISdk;
  apiKey: string;
  feature?: string;
  onSdkChange: () => void;
};

export const SdkConnection = ({
  sdk,
  apiKey,
  feature,
  onSdkChange,
}: SdkConnectionProps) => {
  return (
    <Suspense fallback={<Loader />}>
      {feature ? (
        <TestSdkConnection
          sdk={sdk}
          apiKey={apiKey}
          feature={feature}
          onSdkChange={onSdkChange}
        />
      ) : (
        <SdkConnected sdk={sdk} />
      )}
    </Suspense>
  );
};
