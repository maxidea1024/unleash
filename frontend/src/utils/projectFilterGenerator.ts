import { ADMIN } from 'component/providers/AccessProvider/permissions';
import type { IPermission } from 'interfaces/user';

type ObjectIndex = {
  [key: string]: string;
};

export const projectFilterGenerator = (
  permissions: IPermission[],
  matcherPermission: string,
): ((projectId: string) => boolean) => {
  let admin = false;

  const permissionMap: ObjectIndex = permissions.reduce(
    (acc: ObjectIndex, p: IPermission) => {
      if (p.permission === ADMIN) {
        admin = true;
      }

      if (p.project && p.permission === matcherPermission) {
        acc[p.project] = matcherPermission;
      }

      return acc;
    },
    {},
  );

  return (projectId: string) => {
    return admin || Boolean(permissionMap[projectId]);
  };
};
