import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import type { ChangeRequestType } from 'component/changeRequest/changeRequest.types';
import { ChangeRequestStatusBadge } from 'component/changeRequest/ChangeRequestStatusBadge/ChangeRequestStatusBadge';

type ChangeRequestStatusCellProps = {
  value?: string | null; // FIXME: proper type
  row: { original: ChangeRequestType };
};

export const ChangeRequestStatusCell = ({
  value,
  row: { original },
}: ChangeRequestStatusCellProps) => {
  const renderState = () => {
    if (!value) {
      return null;
    }

    return <ChangeRequestStatusBadge changeRequest={original} />;
  };

  if (!value) {
    return <TextCell />;
  }

  return <TextCell>{renderState()}</TextCell>;
};
