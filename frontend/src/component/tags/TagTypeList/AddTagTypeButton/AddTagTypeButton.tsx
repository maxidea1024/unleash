import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { CREATE_TAG_TYPE } from 'component/providers/AccessProvider/permissions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import Add from '@mui/icons-material/Add';

export const AddTagTypeButton = () => {
  const navigate = useNavigate();
  const smallScreen = useMediaQuery('(max-width:700px)');

  return smallScreen ? (
    <PermissionIconButton
      onClick={() => navigate('/tag-types/create')}
      size='large'
      permission={CREATE_TAG_TYPE}
    >
      <Add />
    </PermissionIconButton>
  ) : (
    <PermissionButton
      permission={CREATE_TAG_TYPE}
      onClick={() => navigate('/tag-types/create')}
    >
      New tag type
    </PermissionButton>
  );
};
