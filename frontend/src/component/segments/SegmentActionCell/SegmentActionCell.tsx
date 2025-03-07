import { ActionCell } from 'component/common/Table/cells/ActionCell/ActionCell';
import type { ISegment } from 'interfaces/segment';
import { RemoveSegmentButton } from 'component/segments/RemoveSegmentButton/RemoveSegmentButton';
import { EditSegmentButton } from 'component/segments/EditSegmentButton/EditSegmentButton';

type SegmentActionCellProps = {
  segment: ISegment;
};

export const SegmentActionCell = ({ segment }: SegmentActionCellProps) => {
  return (
    <ActionCell>
      <EditSegmentButton segment={segment} />
      <RemoveSegmentButton segment={segment} />
    </ActionCell>
  );
};
