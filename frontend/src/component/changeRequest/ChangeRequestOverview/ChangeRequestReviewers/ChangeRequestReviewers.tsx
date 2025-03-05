import { Box, Paper, styled, Typography } from '@mui/material';
import type React from 'react';
import type { ReactNode } from 'react';
import { ConditionallyRender } from '../../../common/ConditionallyRender/ConditionallyRender';
import { ChangeRequestRejections } from './ChangeRequestRejections';
import { ChangeRequestApprovals } from './ChangeRequestApprovals';
import type { ChangeRequestType } from '../../changeRequest.types';

const StyledBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

type ChangeRequestReviewersHeaderProps = {
  actualApprovals: number;
  minApprovals: number;
};

export const ChangeRequestReviewersHeader = ({
  actualApprovals,
  minApprovals,
}: ChangeRequestReviewersHeaderProps) => {
  return (
    <>
      Reviewers{' '}
      <Typography component='span' color='text.secondary'>
        ({actualApprovals}/{minApprovals} required)
      </Typography>
    </>
  );
};

type ChangeRequestReviewersWrapperProps = {
  header: ReactNode;
  children?: React.ReactNode;
};

export const ChangeRequestReviewersWrapper = ({
  header,
  children,
}: ChangeRequestReviewersWrapperProps) => {
  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        marginTop: theme.spacing(2),
        padding: theme.spacing(4),
        borderRadius: (theme) => `${theme.shape.borderRadiusLarge}px`,
      })}
    >
      <StyledBox>{header}</StyledBox>
      {children}
    </Paper>
  );
};

type ChangeRequestReviewersProps = {
  changeRequest: Pick<
    ChangeRequestType,
    'approvals' | 'rejections' | 'state' | 'minApprovals'
  >;
};

export const ChangeRequestReviewers = ({
  changeRequest,
}: ChangeRequestReviewersProps) => (
  <ChangeRequestReviewersWrapper
    header={
      <ChangeRequestReviewersHeader
        actualApprovals={changeRequest.approvals.length}
        minApprovals={changeRequest.minApprovals}
      />
    }
  >
    <ConditionallyRender
      condition={changeRequest.state === 'Rejected'}
      show={<ChangeRequestRejections rejections={changeRequest.rejections} />}
      elseShow={<ChangeRequestApprovals approvals={changeRequest.approvals} />}
    />
  </ChangeRequestReviewersWrapper>
);
