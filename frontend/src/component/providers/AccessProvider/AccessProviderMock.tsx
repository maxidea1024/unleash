import { type ReactElement, type ReactNode, useMemo } from 'react';
import AccessContext, { type IAccessContext } from 'contexts/AccessContext';
import type { IPermission } from 'interfaces/user';
import {
  checkAdmin,
  hasAccess,
} from 'component/providers/AccessProvider/AccessProvider';

type AccessProviderProps = {
  permissions: IPermission[];
  children: ReactNode;
};

export const AccessProviderMock = ({
  permissions,
  children,
}: AccessProviderProps): ReactElement => {
  const value: IAccessContext = useMemo(
    () => ({
      isAdmin: checkAdmin(permissions),
      hasAccess: hasAccess.bind(null, permissions),
    }),
    [permissions],
  );

  return (
    <AccessContext.Provider value={value}>{children}</AccessContext.Provider>
  );
};
