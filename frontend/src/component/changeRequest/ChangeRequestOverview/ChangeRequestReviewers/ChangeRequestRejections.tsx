import type { IChangeRequestApproval } from '../../changeRequest.types';
import { Typography } from '@mui/material';
import { ChangeRequestRejector } from './ChangeRequestReviewer';

type ChangeRequestRejectionProps = {
  rejections: IChangeRequestApproval[];
};

export const ChangeRequestRejections = ({
  rejections = [],
}: ChangeRequestRejectionProps) => (
  <>
    <Typography variant='body1' color='text.secondary'>
      Rejected by
    </Typography>
    {rejections.map((rejector) => (
      <ChangeRequestRejector
        key={rejector.createdBy.username}
        name={rejector.createdBy.username || 'Unknown user'}
        imageUrl={rejector.createdBy.imageUrl}
      />
    ))}
  </>
);
