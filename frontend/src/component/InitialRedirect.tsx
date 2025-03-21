import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useProjects from 'hooks/api/getters/useProjects/useProjects';
import { useLastViewedProject } from 'hooks/useLastViewedProject';
import Loader from './common/Loader/Loader';
import { getSessionStorageItem, setSessionStorageItem } from 'utils/storage';
import { useUiFlag } from 'hooks/useUiFlag';

export const InitialRedirect = () => {
  const personalDashboardUiEnabled = useUiFlag('personalDashboardUI');
  const { lastViewed } = useLastViewedProject();
  const { projects, loading } = useProjects();
  const navigate = useNavigate();
  const sessionRedirect = getSessionStorageItem('login-redirect');

  // Redirect based on project and last viewed
  const getRedirect = useCallback(() => {
    if (projects && lastViewed) {
      return `/projects/${lastViewed}`;
    }

    if (personalDashboardUiEnabled) {
      return '/personal';
    }

    if (projects && !lastViewed && projects.length === 1) {
      return `/projects/${projects[0].id}`;
    }

    return '/projects';
  }, [lastViewed, projects, personalDashboardUiEnabled]);

  const redirect = () => {
    navigate(sessionRedirect ?? getRedirect(), { replace: true });
  };

  useEffect(() => {
    setSessionStorageItem('login-redirect');

    redirect();
  }, [getRedirect]);

  if (loading) {
    return <Loader type='fullscreen' />;
  }

  return null;
};
