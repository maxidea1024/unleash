import { Box, styled, Typography } from '@mui/material';
import { Badge } from 'component/common/Badge/Badge';
import { HtmlTooltip } from 'component/common/HtmlTooltip/HtmlTooltip';
import type * as React from 'react';
import { ReactComponent as InitialStageIcon } from 'assets/icons/stage-initial.svg';
import { ReactComponent as PreLiveStageIcon } from 'assets/icons/stage-pre-live.svg';
import { ReactComponent as LiveStageIcon } from 'assets/icons/stage-live.svg';
import { ReactComponent as CompletedStageIcon } from 'assets/icons/stage-completed.svg';
import { ReactComponent as ArchivedStageIcon } from 'assets/icons/stage-archived.svg';
import CloudCircle from '@mui/icons-material/CloudCircle';
import { ReactComponent as UsageRate } from 'assets/icons/usage-rate.svg';
import { FeatureLifecycleStageIcon } from './FeatureLifecycleStageIcon';
import { TimeAgo } from 'component/common/TimeAgo/TimeAgo';
import { StyledIconWrapper } from '../../FeatureEnvironmentSeen/FeatureEnvironmentSeen';
import { useLastSeenColors } from '../../FeatureEnvironmentSeen/useLastSeenColors';
import type { LifecycleStage } from './LifecycleStage';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import {
  DELETE_FEATURE,
  UPDATE_FEATURE,
} from 'component/providers/AccessProvider/permissions';
import { isSafeToArchive } from './isSafeToArchive';
import { useLocationSettings } from 'hooks/useLocationSettings';
import { formatDateYMDHMS } from 'utils/formatDate';
import { formatDistanceToNow, parseISO } from 'date-fns';

const TimeLabel = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const InfoText = styled('p')(({ theme }) => ({
  paddingBottom: theme.spacing(1),
}));

const MainLifecycleRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

const TimeLifecycleRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1.5),
}));

const IconsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
}));

const Line = styled(Box)(({ theme }) => ({
  height: '1px',
  background: theme.palette.divider,
  flex: 1,
}));

const StageBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{
  active?: boolean;
}>(({ theme, active }) => ({
  position: 'relative',
  // speech bubble triangle for active stage
  ...(active && {
    '&:before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      borderStyle: 'solid',
      borderColor: `${theme.palette.primary.light} transparent`,
      borderWidth: '0 6px 6px',
      top: theme.spacing(3.25),
      left: theme.spacing(1.75),
    },
  }),
  // stage name text
  '&:after': {
    content: 'attr(data-after-content)',
    display: 'block',
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(-1.25),
    right: theme.spacing(-1.25),
    textAlign: 'center',
    whiteSpace: 'nowrap',
    fontSize: theme.spacing(1.25),
    padding: theme.spacing(0.25, 0),
    color: theme.palette.text.secondary,
    // active wrapper for stage name text
    ...(active && {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      fontWeight: theme.typography.fontWeightBold,
      borderRadius: theme.spacing(0.5),
    }),
  },
}));

const ColorFill = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  borderRadius: `0 0 ${theme.shape.borderRadiusMedium}px ${theme.shape.borderRadiusMedium}px`, // has to match the parent tooltip container
  margin: theme.spacing(-1, -1.5), // has to match the parent tooltip container
  padding: theme.spacing(2, 3),
}));

type LastSeenIconProps = {
  lastSeen: string;
};

const LastSeenIcon = ({ lastSeen }: LastSeenIconProps) => {
  const getColor = useLastSeenColors();
  const { text, background } = getColor(lastSeen);

  return (
    <StyledIconWrapper style={{ background }}>
      <UsageRate stroke={text} />
    </StyledIconWrapper>
  );
};

const InitialStageDescription = () => {
  return (
    <>
      <InfoText>
        This feature flag is currently in the initial phase of its lifecycle.
      </InfoText>
      <InfoText>
        This means that the flag has been created, but it has not yet been seen
        in any environment.
      </InfoText>
      <InfoText>
        Once we detect metrics for a non-production environment it will move
        into pre-live.
      </InfoText>
    </>
  );
};

type StageTimelineProps = {
  stage: LifecycleStage;
};

const StageTimeline = ({ stage }: StageTimelineProps) => {
  return (
    <IconsRow>
      <StageBox data-after-content='Initial' active={stage.name === 'initial'}>
        <InitialStageIcon />
      </StageBox>

      <Line />

      <StageBox
        data-after-content='Pre-live'
        active={stage.name === 'pre-live'}
      >
        <PreLiveStageIcon />
      </StageBox>

      <Line />

      <StageBox data-after-content='Live' active={stage.name === 'live'}>
        <LiveStageIcon />
      </StageBox>

      <Line />

      <StageBox
        data-after-content='Completed'
        active={stage.name === 'completed'}
      >
        <CompletedStageIcon />
      </StageBox>

      <Line />

      <StageBox
        data-after-content='Archived'
        active={stage.name === 'archived'}
      >
        <ArchivedStageIcon />
      </StageBox>
    </IconsRow>
  );
};

const EnvironmentLine = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

type EnvironmentsProps = {
  environments: Array<{
    name: string;
    lastSeenAt: string;
  }>;
};

const Environments = ({ environments }: EnvironmentsProps) => {
  return (
    <Box>
      {environments.map((environment) => {
        return (
          <EnvironmentLine key={environment.name}>
            <CenteredBox>
              <CloudCircle />
              <Box>{environment.name}</Box>
            </CenteredBox>
            <CenteredBox>
              <TimeAgo date={environment.lastSeenAt} />
              <LastSeenIcon lastSeen={environment.lastSeenAt} />
            </CenteredBox>
          </EnvironmentLine>
        );
      })}
    </Box>
  );
};

type PreLiveStageDescriptionProps = {
  children?: React.ReactNode;
};

const PreLiveStageDescription = ({
  children,
}: PreLiveStageDescriptionProps) => {
  return (
    <>
      <InfoText>
        We've seen the feature flag in the following environments:
      </InfoText>

      {children}
    </>
  );
};

const BoldTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightBold,
}));

type LiveStageDescriptionProps = {
  onComplete: () => void;
  loading: boolean;
  project: string;
  children?: React.ReactNode;
};

const LiveStageDescription = ({
  children,
  onComplete,
  loading,
  project,
}: LiveStageDescriptionProps) => {
  return (
    <>
      <BoldTitle>Is this feature complete?</BoldTitle>
      <InfoText sx={{ mb: 1 }}>
        Marking the feature flag as complete does not affect any configuration;
        however, it moves the feature flag to its next lifecycle stage and
        indicates that you have learned what you needed in order to progress
        with the feature. It serves as a reminder to start cleaning up the
        feature flag and removing it from the code.
      </InfoText>
      <PermissionButton
        color='inherit'
        variant='outlined'
        permission={UPDATE_FEATURE}
        size='small'
        onClick={onComplete}
        disabled={loading}
        projectId={project}
      >
        Mark completed
      </PermissionButton>
      <InfoText sx={{ mt: 3 }}>
        Users have been exposed to this feature in the following production
        environments:
      </InfoText>

      {children}
    </>
  );
};

type SafeToArchiveProps = {
  onArchive: () => void;
  onUncomplete: () => void;
  loading: boolean;
  project: string;
};

const SafeToArchive = ({
  onArchive,
  onUncomplete,
  loading,
  project,
}: SafeToArchiveProps) => {
  return (
    <>
      <BoldTitle>Safe to archive</BoldTitle>
      <InfoText
        sx={{
          mt: 2,
          mb: 1,
        }}
      >
        We haven’t seen this feature flag in any environment for at least two
        days. It’s likely that it’s safe to archive this flag.
      </InfoText>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <PermissionButton
          color='inherit'
          variant='outlined'
          permission={UPDATE_FEATURE}
          size='small'
          onClick={onUncomplete}
          disabled={loading}
          projectId={project}
        >
          Revert to live
        </PermissionButton>
        <PermissionButton
          color='inherit'
          variant='outlined'
          permission={DELETE_FEATURE}
          size='small'
          sx={{ mb: 2 }}
          onClick={onArchive}
          projectId={project}
        >
          Archive feature
        </PermissionButton>
      </Box>
    </>
  );
};

type ActivelyUsedProps = {
  onUncomplete: () => void;
  loading: boolean;
  children?: React.ReactNode;
};

const ActivelyUsed = ({
  children,
  onUncomplete,
  loading,
}: ActivelyUsedProps) => (
  <>
    <InfoText
      sx={{
        mt: 1,
        mb: 1,
      }}
    >
      This feature has been successfully completed, but we are still seeing
      usage. Clean up the feature flag from your code before archiving it:
    </InfoText>
    {children}
    <InfoText
      sx={{
        mt: 1,
        mb: 1,
      }}
    >
      If you think this feature was completed too early you can revert to the
      live stage:
    </InfoText>
    <PermissionButton
      color='inherit'
      variant='outlined'
      permission={UPDATE_FEATURE}
      size='small'
      sx={{ mb: 2 }}
      onClick={onUncomplete}
      disabled={loading}
    >
      Revert to live
    </PermissionButton>
  </>
);

type CompletedStageDescriptionProps = {
  onArchive: () => void;
  onUncomplete: () => void;
  loading: boolean;
  environments: Array<{
    name: string;
    lastSeenAt: string;
  }>;
  children?: React.ReactNode;
  project: string;
};

const CompletedStageDescription = ({
  children,
  environments,
  onArchive,
  onUncomplete,
  loading,
  project,
}: CompletedStageDescriptionProps) => {
  return isSafeToArchive(environments) ? (
    <SafeToArchive
      onArchive={onArchive}
      onUncomplete={onUncomplete}
      loading={loading}
      project={project}
    />
  ) : (
    <ActivelyUsed onUncomplete={onUncomplete} loading={loading}>
      {children}
    </ActivelyUsed>
  );
};

type FormatTimeProps = {
  time: string;
};

const FormatTime = ({ time }: FormatTimeProps) => {
  const { locationSettings } = useLocationSettings();

  return <span>{formatDateYMDHMS(time, locationSettings.locale)}</span>;
};

type FormatElapsedTimeProps = {
  time: string;
};

const FormatElapsedTime = ({ time }: FormatElapsedTimeProps) => {
  const pastTime = parseISO(time);
  const elapsedTime = formatDistanceToNow(pastTime, { addSuffix: false });
  return <span>{elapsedTime}</span>;
};

type FeatureLifecycleTooltipProps = {
  children: React.ReactElement<any, any>;
  stage: LifecycleStage;
  project: string;
  onArchive: () => void;
  onComplete: () => void;
  onUncomplete: () => void;
  loading: boolean;
};

export const FeatureLifecycleTooltip = ({
  children,
  stage,
  project,
  onArchive,
  onComplete,
  onUncomplete,
  loading,
}: FeatureLifecycleTooltipProps) => (
  <HtmlTooltip
    maxHeight={800}
    maxWidth={350}
    arrow
    tabIndex={0}
    title={
      <Box>
        <Box sx={(theme) => ({ padding: theme.spacing(2) })}>
          <MainLifecycleRow>
            <Typography variant='h3'>Lifecycle</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Badge sx={{ textTransform: 'capitalize' }}>{stage.name}</Badge>
              <FeatureLifecycleStageIcon stage={stage} />
            </Box>
          </MainLifecycleRow>
          <TimeLifecycleRow>
            <TimeLabel>Stage entered at</TimeLabel>

            <FormatTime time={stage.enteredStageAt} />
          </TimeLifecycleRow>
          <TimeLifecycleRow>
            <TimeLabel>Time spent in stage</TimeLabel>
            <FormatElapsedTime time={stage.enteredStageAt} />
          </TimeLifecycleRow>
          <StageTimeline stage={stage} />
        </Box>
        <ColorFill>
          {stage.name === 'initial' && <InitialStageDescription />}
          {stage.name === 'pre-live' && (
            <PreLiveStageDescription>
              <Environments environments={stage.environments} />
            </PreLiveStageDescription>
          )}
          {stage.name === 'live' && (
            <LiveStageDescription
              onComplete={onComplete}
              loading={loading}
              project={project}
            >
              <Environments environments={stage.environments} />
            </LiveStageDescription>
          )}
          {stage.name === 'completed' && (
            <CompletedStageDescription
              environments={stage.environments}
              onArchive={onArchive}
              onUncomplete={onUncomplete}
              loading={loading}
              project={project}
            >
              <Environments environments={stage.environments} />
            </CompletedStageDescription>
          )}
        </ColorFill>
      </Box>
    }
  >
    <CenteredBox>{children}</CenteredBox>
  </HtmlTooltip>
);
