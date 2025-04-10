import type { ISegment } from 'interfaces/segment';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import {
  DELETE_SEGMENT,
  UPDATE_PROJECT_SEGMENT,
} from 'component/providers/AccessProvider/permissions';
import Delete from '@mui/icons-material/Delete';
import { SEGMENT_DELETE_BTN_ID } from 'utils/testIds';
import { useSegments } from 'hooks/api/getters/useSegments/useSegments';
import useToast from 'hooks/useToast';
import { SegmentDelete } from 'component/segments/SegmentDelete/SegmentDelete';
import { useSegmentsApi } from 'hooks/api/actions/useSegmentsApi/useSegmentsApi';
import { formatUnknownError } from 'utils/formatUnknownError';
import { useState } from 'react';
import { useOptionalPathParam } from 'hooks/useOptionalPathParam';

type RemoveSegmentButtonProps = {
  segment: ISegment;
};

export const RemoveSegmentButton = ({ segment }: RemoveSegmentButtonProps) => {
  const projectId = useOptionalPathParam('projectId');
  const { refetchSegments } = useSegments();
  const { deleteSegment } = useSegmentsApi();
  const { setToastData, setToastApiError } = useToast();
  const [showModal, toggleModal] = useState(false);

  const onRemove = async () => {
    try {
      await deleteSegment(segment.id);

      refetchSegments();

      setToastData({
        type: 'success',
        title: 'Successfully deleted segment',
      });
    } catch (error: unknown) {
      setToastApiError(formatUnknownError(error));
    } finally {
      toggleModal(false);
    }
  };

  return (
    <>
      <PermissionIconButton
        onClick={() => toggleModal(true)}
        permission={[DELETE_SEGMENT, UPDATE_PROJECT_SEGMENT]}
        projectId={projectId}
        tooltipProps={{ title: 'Remove segment' }}
        data-testid={`${SEGMENT_DELETE_BTN_ID}_${segment.name}`}
      >
        <Delete data-loading />
      </PermissionIconButton>
      {showModal && (
        <SegmentDelete
          segment={segment}
          open={showModal}
          onClose={() => toggleModal(false)}
          onRemove={onRemove}
        />
      )}
    </>
  );
};
