import UIContext from 'contexts/UIContext';
import { useContext } from 'react';

type ThemeModeProps = {
  darkmode: JSX.Element;
  lightmode: JSX.Element;
};

export const ThemeMode = ({ darkmode, lightmode }: ThemeModeProps) => {
  const { themeMode } = useContext(UIContext);

  return themeMode === 'dark' ? darkmode : lightmode;
};
