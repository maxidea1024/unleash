import type React from 'react';
import { useContext } from 'react';
import CheckBox from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
import { MultiActionButton } from 'component/common/MultiActionButton/MultiActionButton';
import { APPROVE_CHANGE_REQUEST } from 'component/providers/AccessProvider/permissions';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { useAuthUser } from 'hooks/api/getters/useAuth/useAuthUser';
import AccessContext from 'contexts/AccessContext';
import { useChangeRequest } from 'hooks/api/getters/useChangeRequest/useChangeRequest';

type ReviewButtonProps = {
  disabled: boolean;
  onReject: () => void;
  onApprove: () => void;
  children?: React.ReactNode;
};

export const ReviewButton = ({
  disabled,
  onReject,
  onApprove,
  children,
}: ReviewButtonProps) => {
  const { isAdmin } = useContext(AccessContext);
  const projectId = useRequiredPathParam('projectId');
  const id = useRequiredPathParam('id');
  const { user } = useAuthUser();
  const { data } = useChangeRequest(projectId, id);

  const approverIsCreator = data?.createdBy.id === user?.id;
  const disableApprove = disabled || (approverIsCreator && !isAdmin);

  return (
    <MultiActionButton
      permission={APPROVE_CHANGE_REQUEST}
      disabled={disableApprove}
      actions={[
        {
          label: 'Approve',
          onSelect: onApprove,
          icon: <CheckBox fontSize='small' />,
        },
        {
          label: 'Reject',
          onSelect: onReject,
          icon: <Clear fontSize='small' />,
        },
      ]}
      environmentId={data?.environment}
      projectId={projectId}
      ariaLabel='review or reject changes'
    >
      {children}
    </MultiActionButton>
  );
};
