import { Fragment, useMemo, useState } from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import { ChangeRequestSidebar } from 'component/changeRequest/ChangeRequestSidebar/ChangeRequestSidebar';
import { usePendingChangeRequests } from 'hooks/api/getters/usePendingChangeRequests/usePendingChangeRequests';
import type { ChangeRequestType } from 'component/changeRequest/changeRequest.types';
import { changesCount } from 'component/changeRequest/changesCount';
import { Sticky } from 'component/common/Sticky/Sticky';

const StyledDraftBannerContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
}));

const StyledDraftBanner = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(9),
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.down('lg')]: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

type DraftBannerContentProps = {
  changeRequests: ChangeRequestType[];
  onClick: () => void;
};

const DraftBannerContent = ({
  changeRequests,
  onClick,
}: DraftBannerContentProps) => {
  const environments = changeRequests.map(({ environment }) => environment);
  const allChangesCount = changeRequests.reduce(
    (acc, curr) => acc + changesCount(curr),
    0,
  );
  const showOneLongExplanation =
    changeRequests.length === 1 &&
    ['Draft', 'In review', 'Approved'].includes(changeRequests[0].state);
  const explanation = showOneLongExplanation
    ? {
        Draft: ' that need to be reviewed',
        'In review': ' that are in review',
        Approved:
          ' that are approved. Adding more changes will clear the approvals and require a new review',
      }[changeRequests[0].state as 'Draft' | 'In review' | 'Approved']
    : '';

  return (
    <StyledDraftBanner>
      <StyledDraftBannerContentWrapper>
        <Typography variant='body2' sx={{ mr: 4 }}>
          <strong>Change request mode</strong> – You have changes{' '}
          {Boolean(environments) && (
            <>
              in{' '}
              {environments.map((env, i) =>
                i === 0 ? (
                  <Fragment key={env}>
                    <strong>{env}</strong>
                  </Fragment>
                ) : (
                  <Fragment key={env}>
                    {i === environments.length - 1 ? ' and ' : ', '}
                    <strong>{env}</strong>
                  </Fragment>
                ),
              )}
            </>
          )}
          {explanation}.
        </Typography>
        <Button variant='contained' onClick={onClick} sx={{ ml: 'auto' }}>
          View changes ({allChangesCount})
        </Button>
      </StyledDraftBannerContentWrapper>
    </StyledDraftBanner>
  );
};

const StickyBanner = styled(Sticky)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.warning.border}`,
  borderBottom: `1px solid ${theme.palette.warning.border}`,
  color: theme.palette.warning.contrastText,
  backgroundColor: theme.palette.warning.light,
  zIndex: 250,
}));

type DraftBannerProps = {
  project: string;
};

export const DraftBanner = ({ project }: DraftBannerProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, loading } = usePendingChangeRequests(project);

  const unfinishedChangeRequests = useMemo(
    () =>
      data?.filter((changeRequest) =>
        ['Draft', 'In review', 'Approved'].includes(changeRequest.state),
      ),
    [data],
  );

  if ((!loading && !data) || data?.length === 0) {
    return null;
  }

  return (
    <StickyBanner>
      {Boolean(unfinishedChangeRequests?.length) && (
        <DraftBannerContent
          changeRequests={unfinishedChangeRequests as ChangeRequestType[]}
          onClick={() => {
            setIsSidebarOpen(true);
          }}
        />
      )}
      <ChangeRequestSidebar
        project={project}
        open={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
        }}
      />
    </StickyBanner>
  );
};
