import { type ReactElement, useMemo, useState, type ReactNode } from 'react';
import { AnnouncerContext } from '../AnnouncerContext/AnnouncerContext';
import { AnnouncerElement } from 'component/common/Announcer/AnnouncerElement/AnnouncerElement';

type AnnouncerProviderProps = {
  children: ReactNode;
};

export const AnnouncerProvider = ({
  children,
}: AnnouncerProviderProps): ReactElement => {
  const [announcement, setAnnouncement] = useState<string>();

  const value = useMemo(
    () => ({
      setAnnouncement,
    }),
    [setAnnouncement],
  );

  return (
    <AnnouncerContext.Provider value={value}>
      {children}
      <AnnouncerElement announcement={announcement} />
    </AnnouncerContext.Provider>
  );
};
