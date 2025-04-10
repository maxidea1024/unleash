import React, { useState } from 'react';
import UIContext, {
  createEmptyToast,
  type themeMode,
} from 'contexts/UIContext';
import type { IToast } from 'interfaces/toast';
import { getLocalStorageItem } from 'utils/storage';

const resolveMode = (): themeMode => {
  const value = getLocalStorageItem('unleash-theme');
  if (value) {
    return value as themeMode;
  }

  const osDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

  if (osDark) {
    return 'dark';
  }
  return 'light';
};

type UIProviderProps = {
  children?: React.ReactNode;
};

const UIProvider = ({ children }: UIProviderProps) => {
  const [toastData, setToast] = useState<IToast>(createEmptyToast());
  const [showFeedback, setShowFeedback] = useState(false);
  const [themeMode, setThemeMode] = useState(resolveMode());

  const context = React.useMemo(
    () => ({
      setToast,
      toastData,
      showFeedback,
      setShowFeedback,
      themeMode,
      setThemeMode,
    }),
    [toastData, showFeedback, themeMode],
  );

  return <UIContext.Provider value={context}>{children}</UIContext.Provider>;
};

export default UIProvider;
