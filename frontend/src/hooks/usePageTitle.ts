import { useEffect, useContext } from 'react';
import { AnnouncerContext } from 'component/common/Announcer/AnnouncerContext/AnnouncerContext';

// Hook for managing the page title and announcing page navigation
export const usePageTitle = (title?: string) => {
  const { setAnnouncement } = useContext(AnnouncerContext);

  // Effect to update document title when title prop changes
  useEffect(() => {
    if (title) {
      document.title = title;
      // Reset to default title on unmount
      return () => {
        document.title = DEFAULT_PAGE_TITLE;
      };
    }
  }, [title]);

  // Effect to announce page navigation when title changes
  useEffect(() => {
    if (title && title !== DEFAULT_PAGE_TITLE) {
      setAnnouncement(`Navigated to ${title}`);
    }
  }, [setAnnouncement, title]);
};

// Default title to display when no title is provided
const DEFAULT_PAGE_TITLE = 'Ganpa';
