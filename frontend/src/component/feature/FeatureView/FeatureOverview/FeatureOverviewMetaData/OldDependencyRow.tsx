import { AddDependencyDialogue } from 'component/feature/Dependencies/AddDependencyDialogue';
import type { IFeatureToggle } from 'interfaces/featureToggle';
import { useState } from 'react';
import {
  FlexRow,
  StyledDetail,
  StyledLabel,
  StyledLink,
} from '../FeatureOverviewSidePanel/FeatureOverviewSidePanelDetails/StyledRow';
import { OldDependencyActions } from './OldDependencyActions';
import { useDependentFeaturesApi } from 'hooks/api/actions/useDependentFeaturesApi/useDependentFeaturesApi';
import { useFeature } from 'hooks/api/getters/useFeature/useFeature';
import { ChildrenTooltip } from './ChildrenTooltip';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import { UPDATE_FEATURE_DEPENDENCY } from 'component/providers/AccessProvider/permissions';
import { useCheckProjectAccess } from 'hooks/useHasAccess';
import { useChangeRequestApi } from 'hooks/api/actions/useChangeRequestApi/useChangeRequestApi';
import { usePendingChangeRequests } from 'hooks/api/getters/usePendingChangeRequests/usePendingChangeRequests';
import useToast from 'hooks/useToast';
import { useHighestPermissionChangeRequestEnvironment } from 'hooks/useHighestPermissionChangeRequestEnvironment';
import { useChangeRequestsEnabled } from 'hooks/useChangeRequestsEnabled';
import { formatUnknownError } from 'utils/formatUnknownError';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';
import { VariantsTooltip } from './VariantsTooltip';

const useDeleteDependency = (project: string, featureId: string) => {
  const { trackEvent } = usePlausibleTracker();
  const { addChange } = useChangeRequestApi();
  const { refetch: refetchChangeRequests } = usePendingChangeRequests(project);
  const { setToastData, setToastApiError } = useToast();
  const { refetchFeature } = useFeature(project, featureId);
  const environment = useHighestPermissionChangeRequestEnvironment(project)();
  const { isChangeRequestConfiguredInAnyEnv } =
    useChangeRequestsEnabled(project);
  const { removeDependencies } = useDependentFeaturesApi(project);

  const handleAddChange = async () => {
    if (!environment) {
      console.error('No change request environment');
      return;
    }
    await addChange(project, environment, [
      {
        action: 'deleteDependency',
        feature: featureId,
        payload: undefined,
      },
    ]);
  };

  const deleteDependency = async () => {
    try {
      if (isChangeRequestConfiguredInAnyEnv()) {
        await handleAddChange();
        trackEvent('dependent_features', {
          props: {
            eventType: 'delete dependency added to change request',
          },
        });
        setToastData({
          text: `${featureId} dependency will be removed`,
          type: 'success',
          title: 'Change added to a draft',
        });
        await refetchChangeRequests();
      } else {
        await removeDependencies(featureId);
        trackEvent('dependent_features', {
          props: {
            eventType: 'dependency removed',
          },
        });
        setToastData({ title: 'Dependency removed', type: 'success' });
        await refetchFeature();
      }
    } catch (error) {
      setToastApiError(formatUnknownError(error));
    }
  };

  return deleteDependency;
};

type OldDependencyRowProps = {
  feature: IFeatureToggle;
};

export const OldDependencyRow = ({ feature }: OldDependencyRowProps) => {
  const [showDependencyDialogue, setShowDependencyDialogue] = useState(false);
  const canAddParentDependency =
    Boolean(feature.project) &&
    feature.dependencies.length === 0 &&
    feature.children.length === 0;
  const hasParentDependency =
    Boolean(feature.project) && Boolean(feature.dependencies.length > 0);
  const hasChildren = Boolean(feature.project) && feature.children.length > 0;
  const environment = useHighestPermissionChangeRequestEnvironment(
    feature.project,
  )();
  const checkAccess = useCheckProjectAccess(feature.project);
  const deleteDependency = useDeleteDependency(feature.project, feature.name);

  return (
    <>
      {canAddParentDependency && (
        <FlexRow>
          <StyledDetail>
            <StyledLabel>Dependency:</StyledLabel>
            <PermissionButton
              size='small'
              permission={UPDATE_FEATURE_DEPENDENCY}
              projectId={feature.project}
              variant='text'
              onClick={() => {
                setShowDependencyDialogue(true);
              }}
              sx={(theme) => ({
                marginBottom: theme.spacing(0.4),
              })}
            >
              Add parent feature
            </PermissionButton>
          </StyledDetail>
        </FlexRow>
      )}
      {hasParentDependency && (
        <FlexRow>
          <StyledDetail>
            <StyledLabel>Dependency:</StyledLabel>
            <StyledLink
              to={`/projects/${feature.project}/features/${feature.dependencies[0]?.feature}`}
            >
              {feature.dependencies[0]?.feature}
            </StyledLink>
          </StyledDetail>
          {checkAccess(UPDATE_FEATURE_DEPENDENCY, environment) && (
            <OldDependencyActions
              feature={feature.name}
              onEdit={() => setShowDependencyDialogue(true)}
              onDelete={deleteDependency}
            />
          )}
        </FlexRow>
      )}
      {hasParentDependency && !feature.dependencies[0]?.enabled && (
        <FlexRow>
          <StyledDetail>
            <StyledLabel>Dependency value:</StyledLabel>
            <span>disabled</span>
          </StyledDetail>
        </FlexRow>
      )}
      {hasParentDependency &&
        Boolean(feature.dependencies[0]?.variants?.length) && (
          <FlexRow>
            <StyledDetail>
              <StyledLabel>Dependency value:</StyledLabel>
              <VariantsTooltip
                variants={feature.dependencies[0]?.variants || []}
              />
            </StyledDetail>
          </FlexRow>
        )}
      {hasChildren && (
        <FlexRow>
          <StyledDetail>
            <StyledLabel>Children:</StyledLabel>
            <ChildrenTooltip
              childFeatures={feature.children}
              project={feature.project}
            />
          </StyledDetail>
        </FlexRow>
      )}
      {Boolean(feature.project) && (
        <AddDependencyDialogue
          project={feature.project}
          featureId={feature.name}
          parentDependency={feature.dependencies[0]}
          onClose={() => setShowDependencyDialogue(false)}
          showDependencyDialogue={showDependencyDialogue}
        />
      )}
    </>
  );
};
