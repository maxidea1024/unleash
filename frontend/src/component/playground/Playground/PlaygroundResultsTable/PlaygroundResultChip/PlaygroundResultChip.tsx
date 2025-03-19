import { useTheme } from '@mui/material';
import { ReactComponent as FeatureEnabledIcon } from 'assets/icons/isenabled-true.svg';
import { ReactComponent as FeatureDisabledIcon } from 'assets/icons/isenabled-false.svg';
import WarningOutlined from '@mui/icons-material/WarningOutlined';
import { Badge } from 'component/common/Badge/Badge';

type ResultChipProps = {
  enabled: boolean | 'unevaluated' | 'unknown';
  label: string;
  // Result icon - defaults to true
  showIcon?: boolean;
};

export const PlaygroundResultChip = ({
  enabled,
  label,
  showIcon = true,
}: ResultChipProps) => {
  const theme = useTheme();
  const icon =
    enabled === 'unknown' || enabled === 'unevaluated' ? (
      <WarningOutlined color={'warning'} fontSize='inherit' />
    ) : typeof enabled === 'boolean' && Boolean(enabled) ? (
      <FeatureEnabledIcon
        color={theme.palette.success.main}
        strokeWidth='0.25'
      />
    ) : (
      <FeatureDisabledIcon
        color={theme.palette.error.main}
        strokeWidth='0.25'
      />
    );

  return enabled === 'unknown' || enabled === 'unevaluated' ? (
    <Badge icon={showIcon ? icon : undefined} color='warning'>
      {label}
    </Badge>
  ) : typeof enabled === 'boolean' && Boolean(enabled) ? (
    <Badge color='success' icon={showIcon ? icon : undefined}>
      {label}
    </Badge>
  ) : (
    <Badge color='error' icon={showIcon ? icon : undefined}>
      {label}
    </Badge>
  );
};
