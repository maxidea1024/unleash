import { useContext, type ReactElement } from 'react';
import AccessContext from 'contexts/AccessContext';
import {
  type TooltipResolverProps,
  TooltipResolver,
} from 'component/common/TooltipResolver/TooltipResolver';
import { formatAccessText } from 'utils/formatAccessText';

type PermissionHOCProps = {
  permission: string;
  projectId?: string;
  environmentId?: string;
  tooltip?: string;
  tooltipProps?: Omit<TooltipResolverProps, 'children' | 'title'>;
  children: ({ hasAccess }: { hasAccess?: boolean }) => ReactElement;
};

export const PermissionHOC = ({
  permission,
  projectId,
  children,
  environmentId,
  tooltip,
  tooltipProps,
}: PermissionHOCProps) => {
  const { hasAccess } = useContext(AccessContext);
  let access: boolean;

  if (projectId && environmentId) {
    access = hasAccess(permission, projectId, environmentId);
  } else if (projectId) {
    access = hasAccess(permission, projectId);
  } else {
    access = hasAccess(permission);
  }

  return (
    <TooltipResolver
      {...tooltipProps}
      title={formatAccessText(access, tooltip)}
    >
      {children({ hasAccess: access })}
    </TooltipResolver>
  );
};
