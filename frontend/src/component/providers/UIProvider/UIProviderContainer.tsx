import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import UIProvider from './UIProvider';
import type { ReactNode } from 'react';

export const UIProviderContainer = ({ children }: { children?: ReactNode }) => {
  const { uiConfig } = useUiConfig();

  if (!uiConfig.flags) {
    return null;
  }

  return <UIProvider>{children}</UIProvider>;
};
