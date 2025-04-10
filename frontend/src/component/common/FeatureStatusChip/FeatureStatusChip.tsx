import { Badge } from 'component/common/Badge/Badge';

type StatusChipProps = {
  stale: boolean;
  showActive?: boolean;
};

export const FeatureStatusChip = ({
  stale,
  showActive = true,
}: StatusChipProps) => {
  if (!stale && !showActive) {
    return null;
  }

  const title = stale
    ? 'Feature flag is deprecated.'
    : 'Feature flag is active.';
  const value = stale ? 'Stale' : 'Active';

  return (
    <div data-loading style={{ marginLeft: '8px' }}>
      <Badge color={stale ? 'error' : 'success'} title={title}>
        {value}
      </Badge>
    </div>
  );
};
