import type { FC, ReactNode } from 'react';
import type {
  IFeatureChange,
  ChangeRequestType,
  IChangeRequestFeature,
} from '../../../changeRequest.types';
import { objectId } from 'utils/objectId';
import { Alert, Box, styled } from '@mui/material';
import { ToggleStatusChange } from './ToggleStatusChange';
import { StrategyChange } from './StrategyChange';
import { VariantPatch } from './VariantPatch/VariantPatch';
import { EnvironmentStrategyExecutionOrder } from './EnvironmentStrategyExecutionOrder/EnvironmentStrategyExecutionOrder';
import { ArchiveFeatureChange } from './ArchiveFeatureChange';
import { DependencyChange } from './DependencyChange';
import { Link } from 'react-router-dom';

const StyledSingleChangeBox = styled(Box, {
  shouldForwardProp: (prop: string) => !prop.startsWith('$'),
})<{
  $hasConflict: boolean;
  $isAfterWarning: boolean;
  $isLast: boolean;
  $isInConflictFeature: boolean;
}>(
  ({
    theme,
    $hasConflict,
    $isInConflictFeature,
    $isAfterWarning,
    $isLast,
  }) => ({
    borderLeft: '1px solid',
    borderRight: '1px solid',
    borderTop: '1px solid',
    borderBottom: $isLast ? '1px solid' : 'none',
    borderRadius: $isLast
      ? `0 0
                ${theme.shape.borderRadiusLarge}px ${theme.shape.borderRadiusLarge}px`
      : 0,
    borderColor:
      $hasConflict || $isInConflictFeature
        ? theme.palette.warning.border
        : theme.palette.divider,
    borderTopColor:
      ($hasConflict || $isAfterWarning) && !$isInConflictFeature
        ? theme.palette.warning.border
        : theme.palette.divider,
  }),
);

const StyledAlert = styled(Alert)(({ theme }) => ({
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  '&.MuiAlert-standardWarning': {
    borderStyle: 'none none solid none',
  },
}));

const InlineList = styled('ul')(({ theme }) => ({
  display: 'inline',
  padding: 0,
  li: { display: 'inline' },
  'li + li::before': {
    content: '", "',
  },
}));

const ChangeInnerBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:has(.delete-strategy-information-wrapper)': {
    backgroundColor: theme.palette.error.light,
  },
}));

type FeatureChangeProps = {
  actions: ReactNode;
  index: number;
  changeRequest: ChangeRequestType;
  change: IFeatureChange;
  feature: IChangeRequestFeature;
  onNavigate?: () => void;
};

export const FeatureChange = ({
  index,
  change,
  feature,
  changeRequest,
  actions,
  onNavigate,
}: FeatureChangeProps) => {
  const lastIndex = feature.defaultChange
    ? feature.changes.length + 1
    : feature.changes.length;

  return (
    <StyledSingleChangeBox
      key={objectId(change)}
      $hasConflict={Boolean(change.conflict || change.scheduleConflicts)}
      $isInConflictFeature={Boolean(feature.conflict)}
      $isAfterWarning={Boolean(
        feature.changes[index - 1]?.conflict ||
          feature.changes[index - 1]?.scheduleConflicts,
      )}
      $isLast={index + 1 === lastIndex}
    >
      {Boolean(change.conflict) && !feature.conflict && (
        <StyledAlert severity='warning'>
          <strong>Conflict!</strong> This change can’t be applied.{' '}
          {change.conflict}.
        </StyledAlert>
      )}

      {Boolean(change.scheduleConflicts) && (
        <StyledAlert severity='warning'>
          <strong>Potential conflict!</strong> This change would create
          conflicts with the following scheduled change request(s):{' '}
          <InlineList>
            {(
              change.scheduleConflicts ?? {
                changeRequests: [],
              }
            ).changeRequests.map(({ id, title }) => {
              const text = title ? `#${id} (${title})` : `#${id}`;
              return (
                <li key={id}>
                  <Link
                    to={`/projects/${changeRequest.project}/change-requests/${id}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    title={`Change request ${id}`}
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
            .
          </InlineList>
        </StyledAlert>
      )}

      <ChangeInnerBox>
        {(change.action === 'addDependency' ||
          change.action === 'deleteDependency') && (
          <DependencyChange
            actions={actions}
            change={change}
            projectId={changeRequest.project}
            onNavigate={onNavigate}
          />
        )}
        {change.action === 'updateEnabled' && (
          <ToggleStatusChange
            enabled={change.payload.enabled}
            actions={actions}
          />
        )}
        {change.action === 'archiveFeature' && (
          <ArchiveFeatureChange actions={actions} />
        )}

        {(change.action === 'addStrategy' ||
          change.action === 'deleteStrategy' ||
          change.action === 'updateStrategy') && (
          <StrategyChange
            actions={actions}
            change={change}
            featureName={feature.name}
            environmentName={changeRequest.environment}
            projectId={changeRequest.project}
            changeRequestState={changeRequest.state}
          />
        )}
        {change.action === 'patchVariant' && (
          <VariantPatch
            feature={feature.name}
            project={changeRequest.project}
            changeRequestState={changeRequest.state}
            environment={changeRequest.environment}
            change={change}
            actions={actions}
          />
        )}
        {change.action === 'reorderStrategy' && (
          <EnvironmentStrategyExecutionOrder
            feature={feature.name}
            project={changeRequest.project}
            environment={changeRequest.environment}
            change={change}
            actions={actions}
          />
        )}
      </ChangeInnerBox>
    </StyledSingleChangeBox>
  );
};
