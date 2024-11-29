import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { adminRoutes } from './adminRoutes';
import { useInstanceStatus } from 'hooks/api/getters/useInstanceStatus/useInstanceStatus';
import { filterAdminRoutes } from './filterAdminRoutes';
import { filterByConfig, mapRouteLink } from 'component/common/util';
import { useUiFlag } from 'hooks/useUiFlag';

export const useAdminRoutes = () => {
  const { uiConfig, isPro, isEnterprise } = useUiConfig();
  const isUnleashCloud = useUiFlag('UNLEASH_CLOUD');
  const { isBilling } = useInstanceStatus();
  const routes = [...adminRoutes];

  if (isUnleashCloud) {
    const adminBillingMenuItem = adminRoutes.findIndex(
      (route) => route.title === 'Billing & invoices',
    ); // TODO: title로 체크하는건 좀 위험할 수 있을듯함.
    routes[adminBillingMenuItem] = {
      ...routes[adminBillingMenuItem],
      path: '/admin/billing',
    };
  }

  return routes
    .filter(filterByConfig(uiConfig))
    .filter((route) =>
      filterAdminRoutes(route?.menu, {
        enterprise: isEnterprise(),
        pro: isPro(),
        billing: isBilling,
      }),
    )
    .map(mapRouteLink);
};
