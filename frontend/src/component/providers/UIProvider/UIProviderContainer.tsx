import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import UIProvider from './UIProvider';
import type { ReactNode } from 'react';

type UIProviderContainerProps = {
  children?: ReactNode;
};

export const UIProviderContainer = ({ children }: UIProviderContainerProps) => {
  const { uiConfig } = useUiConfig();

  if (!uiConfig.flags) {
    return null;
  }

  return <UIProvider>{children}</UIProvider>;
};
