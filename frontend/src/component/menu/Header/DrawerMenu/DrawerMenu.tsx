import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Drawer, styled } from '@mui/material';
import { ReactComponent as GanpaLogo } from 'assets/img/logoDarkWithText.svg';
import { ReactComponent as GanpaLogoWhite } from 'assets/img/logoWithWhiteText.svg';
import type { INavigationMenuItem } from 'interfaces/route';
import styles from './DrawerMenu.module.scss'; // FIXME: useStyle - theme
import theme from 'themes/theme';
import { ThemeMode } from 'component/common/ThemeMode/ThemeMode';
import { MobileNavigationSidebar } from 'component/layout/MainLayout/NavigationSidebar/NavigationSidebar';
import { NewInUnleash } from 'component/layout/MainLayout/NavigationSidebar/NewInUnleash/NewInUnleash';

const StyledDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  '& svg': {
    width: '100%',
    height: '100%',
    maxHeight: theme.spacing(8),
    padding: theme.spacing(0.5),
  },
}));

type DrawerMenuProps = {
  title?: string;
  open?: boolean;
  toggleDrawer: () => void;
  links: Array<{
    value: string;
    icon: ReactNode;
    href: string;
    title: string;
  }>;
  routes: {
    mainNavRoutes: INavigationMenuItem[];
    mobileRoutes: INavigationMenuItem[];
    adminRoutes: INavigationMenuItem[];
  };
};

export const DrawerMenu = ({
  links = [],
  open = false,
  toggleDrawer,
  routes,
}: DrawerMenuProps) => {
  return (
    <Drawer
      className={styles.drawer}
      open={open}
      anchor='left'
      onClose={toggleDrawer}
      style={{ zIndex: theme.zIndex.snackbar + 1 }}
    >
      <nav id='header-drawer' className={styles.drawerContainer}>
        <StyledDrawerHeader>
          <Link
            to='/'
            className={styles.drawerTitle}
            aria-label='Home'
            onClick={() => toggleDrawer()}
          >
            <ThemeMode
              darkmode={<GanpaLogoWhite aria-label='Ganpa logo' />}
              lightmode={<GanpaLogo aria-label='Ganpa logo' />}
            />
          </Link>
        </StyledDrawerHeader>
        <Divider />
        <MobileNavigationSidebar
          onClick={toggleDrawer}
          NewInUnleash={NewInUnleash}
        />
      </nav>
    </Drawer>
  );
};
