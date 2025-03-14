import { ReactComponent as ProPlanIcon } from 'assets/icons/pro-enterprise-feature-badge.svg';
import { ReactComponent as ProPlanIconLight } from 'assets/icons/pro-enterprise-feature-badge-light.svg';
import { ThemeMode } from 'component/common/ThemeMode/ThemeMode';

type EnterpriseBadgeProps = {
  size?: number;
};

export const EnterpriseBadge = ({ size = 16 }: EnterpriseBadgeProps) => (
  <ThemeMode
    darkmode={
      <ProPlanIconLight
        width={size}
        height={size}
        style={{ filter: 'grayscale(100%)', opacity: 0.51 }}
      />
    }
    lightmode={
      <ProPlanIcon
        width={size}
        height={size}
        style={{ filter: 'grayscale(100%)', opacity: 0.6 }}
      />
    }
  />
);
