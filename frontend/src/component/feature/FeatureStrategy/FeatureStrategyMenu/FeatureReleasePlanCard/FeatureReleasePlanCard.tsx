import { getFeatureStrategyIcon } from 'utils/strategyNames';
import StringTruncator from 'component/common/StringTruncator/StringTruncator';
import { Link, styled } from '@mui/material';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';
import type { IReleasePlanTemplate } from 'interfaces/releasePlans';

const StyledIcon = styled('div')(({ theme }) => ({
  width: theme.spacing(4),
  height: 'auto',
  '& > svg': {
    fill: theme.palette.primary.main,
  },
  '& > div': {
    height: theme.spacing(2),
    marginLeft: '-.75rem',
    color: theme.palette.primary.main,
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  fontSize: theme.fontSizes.smallBody,
}));

const StyledName = styled(StringTruncator)(({ theme }) => ({
  fontWeight: theme.fontWeight.bold,
}));

const StyledCard = styled(Link)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '3rem 1fr',
  width: '20rem',
  padding: theme.spacing(2),
  color: 'inherit',
  textDecoration: 'inherit',
  lineHeight: 1.25,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.spacing(1),
  '&:hover, &:focus': {
    borderColor: theme.palette.primary.main,
  },
}));

type FeatureReleasePlanCardProps = {
  projectId: string;
  featureId: string;
  environmentId: string;
  releasePlanTemplate: IReleasePlanTemplate;
};

export const FeatureReleasePlanCard = ({
  projectId,
  featureId,
  environmentId,
  releasePlanTemplate,
}: FeatureReleasePlanCardProps) => {
  const Icon = getFeatureStrategyIcon('releasePlanTemplate');
  const { trackEvent } = usePlausibleTracker();

  const addReleasePlan = () => {
    trackEvent('release-plans', {
      props: {
        eventType: 'add',
        name: releasePlanTemplate.name,
      },
    });
    console.log('TODO: call and implement addReleasePlan');
  };

  return (
    <StyledCard onClick={addReleasePlan}>
      <StyledIcon>
        <Icon />
      </StyledIcon>
      <div>
        <StyledName
          text={releasePlanTemplate.name}
          maxWidth='200'
          maxLength={25}
        />
        <StyledDescription>{releasePlanTemplate.description}</StyledDescription>
      </div>
    </StyledCard>
  );
};
