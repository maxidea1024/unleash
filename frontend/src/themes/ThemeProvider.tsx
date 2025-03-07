import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useThemeMode } from 'hooks/useThemeMode';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

type ThemeProviderProps = {
  children?: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { resolveTheme } = useThemeMode();

  return (
    <CacheProvider value={muiCache}>
      <MuiThemeProvider theme={resolveTheme()}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};
