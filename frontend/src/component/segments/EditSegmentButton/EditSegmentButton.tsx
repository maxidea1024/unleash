import type { ISegment } from 'interfaces/segment';
import Edit from '@mui/icons-material/Edit';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import {
  UPDATE_SEGMENT,
  UPDATE_PROJECT_SEGMENT,
} from 'component/providers/AccessProvider/permissions';
import { useNavigate } from 'react-router-dom';
import { useOptionalPathParam } from 'hooks/useOptionalPathParam';

type EditSegmentButtonProps = {
  segment: ISegment;
};

export const EditSegmentButton = ({ segment }: EditSegmentButtonProps) => {
  const projectId = useOptionalPathParam('projectId');
  const navigate = useNavigate();

  return (
    <PermissionIconButton
      onClick={() => {
        if (projectId) {
          navigate(
            `/projects/${projectId}/settings/segments/edit/${segment.id}`,
          );
        } else {
          navigate(`/segments/edit/${segment.id}`);
        }
      }}
      permission={[UPDATE_SEGMENT, UPDATE_PROJECT_SEGMENT]}
      projectId={projectId}
      tooltipProps={{ title: 'Edit segment' }}
    >
      <Edit data-loading />
    </PermissionIconButton>
  );
};
