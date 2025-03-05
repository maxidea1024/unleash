import { Typography } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { ChangeRequestApprover } from './ChangeRequestReviewer';
import type { IChangeRequestApproval } from '../../changeRequest.types';

type ChangeRequestApprovalProps = {
  approvals: IChangeRequestApproval[];
};

export const ChangeRequestApprovals = ({
  approvals = [],
}: ChangeRequestApprovalProps) => (
  <>
    <Typography variant='body1' color='text.secondary'>
      <ConditionallyRender
        condition={approvals?.length > 0}
        show={'Approved by'}
        elseShow={'No approvals yet'}
      />
    </Typography>
    {approvals.map((approver) => (
      <ChangeRequestApprover
        key={approver.createdBy.username}
        name={approver.createdBy.username || 'Unknown user'}
        imageUrl={approver.createdBy.imageUrl}
      />
    ))}
  </>
);
