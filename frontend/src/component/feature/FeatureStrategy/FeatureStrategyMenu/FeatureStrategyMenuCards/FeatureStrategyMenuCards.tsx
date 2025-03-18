import { List, ListItem, styled, Typography } from '@mui/material';
import { useStrategies } from 'hooks/api/getters/useStrategies/useStrategies';
import { FeatureStrategyMenuCard } from '../FeatureStrategyMenuCard/FeatureStrategyMenuCard';
import { useReleasePlanTemplates } from 'hooks/api/getters/useReleasePlanTemplates/useReleasePlanTemplates';
import { FeatureReleasePlanCard } from '../FeatureReleasePlanCard/FeatureReleasePlanCard';

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.fontSizes.smallBody,
  padding: theme.spacing(1, 2),
}));

type FeatureStrategyMenuCardsProps = {
  projectId: string;
  featureId: string;
  environmentId: string;
};

export const FeatureStrategyMenuCards = ({
  projectId,
  featureId,
  environmentId,
}: FeatureStrategyMenuCardsProps) => {
  const { strategies } = useStrategies();
  const { templates } = useReleasePlanTemplates();

  const preDefinedStrategies = strategies.filter(
    (strategy) => !strategy.deprecated && !strategy.editable,
  );

  const customStrategies = strategies.filter(
    (strategy) => !strategy.deprecated && strategy.editable,
  );

  const defaultStrategy = {
    name: 'flexibleRollout',
    displayName: 'Default strategy',
    description:
      'This is the default strategy defined for this environment in the project',
  };

  return (
    <List dense>
      <>
        <StyledTypography color='textSecondary'>
          Default strategy for {environmentId} environment
        </StyledTypography>
        <ListItem key={defaultStrategy.name}>
          <FeatureStrategyMenuCard
            projectId={projectId}
            featureId={featureId}
            environmentId={environmentId}
            strategy={defaultStrategy}
            defaultStrategy={true}
          />
        </ListItem>
      </>
      {templates.length > 0 && (
        <>
          <StyledTypography color='textSecondary'>
            Release templates
          </StyledTypography>
          {templates.map((template) => (
            <ListItem key={template.id}>
              <FeatureReleasePlanCard
                projectId={projectId}
                featureId={featureId}
                environmentId={environmentId}
                releasePlanTemplate={template}
              />
            </ListItem>
          ))}
        </>
      )}
      <StyledTypography color='textSecondary'>
        Predefined strategy types
      </StyledTypography>
      {preDefinedStrategies.map((strategy) => (
        <ListItem key={strategy.name}>
          <FeatureStrategyMenuCard
            projectId={projectId}
            featureId={featureId}
            environmentId={environmentId}
            strategy={strategy}
          />
        </ListItem>
      ))}
      {customStrategies.length > 0 && (
        <>
          <StyledTypography color='textSecondary'>
            Custom strategies
          </StyledTypography>
          {customStrategies.map((strategy) => (
            <ListItem key={strategy.name}>
              <FeatureStrategyMenuCard
                projectId={projectId}
                featureId={featureId}
                environmentId={environmentId}
                strategy={strategy}
              />
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
};
