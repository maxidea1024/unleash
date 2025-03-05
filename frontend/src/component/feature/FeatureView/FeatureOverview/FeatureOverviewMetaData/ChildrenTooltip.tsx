import { StyledLink } from '../FeatureOverviewSidePanel/FeatureOverviewSidePanelDetails/StyledRow';
import { TooltipLink } from 'component/common/TooltipLink/TooltipLink';

type ChildrenTooltipProps = {
  childFeatures: string[];
  project: string;
};

export const ChildrenTooltip = ({
  childFeatures,
  project,
}: ChildrenTooltipProps) => (
  <TooltipLink
    tooltip={
      <>
        {childFeatures.map((child) => (
          <StyledLink
            key={`${project}-${child}`}
            to={`/projects/${project}/features/${child}`}
          >
            <div>{child}</div>
          </StyledLink>
        ))}
      </>
    }
  >
    {childFeatures.length === 1
      ? '1 feature'
      : `${childFeatures.length} features`}
  </TooltipLink>
);
