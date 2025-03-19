import { Fragment } from 'react';
import { Alert, Box, styled, Typography } from '@mui/material';
import type {
  PlaygroundStrategySchema,
  PlaygroundRequestSchema,
  PlaygroundFeatureSchema,
} from 'openapi';
import { StrategySeparator } from 'component/common/StrategySeparator/StrategySeparator';
import { FeatureStrategyItem } from './StrategyItem/FeatureStrategyItem';

const StyledAlertWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: `0, 4px`,
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadiusMedium,
  border: `1px solid ${theme.palette.warning.border}`,
}));

const StyledListWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 0.5),
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  border: '0!important',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderBottom: `1px solid ${theme.palette.warning.border}!important`,
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2, 1, 2, 0),
  color: 'text.secondary',
}));

type PlaygroundResultStrategyListProps = {
  strategies: PlaygroundStrategySchema[];
  input?: PlaygroundRequestSchema;
  titlePrefix?: string;
  infoText?: string;
};

export const PlaygroundResultStrategyLists = ({
  strategies,
  input,
  titlePrefix,
  infoText,
}: PlaygroundResultStrategyListProps) =>
  strategies.length > 0 && (
    <>
      <StyledSubtitle
        variant={'subtitle1'}
      >{`${titlePrefix ? titlePrefix.concat(' strategies') : 'Strategies'} (${strategies?.length})`}</StyledSubtitle>
      {Boolean(infoText) && (
        <StyledSubtitle variant={'subtitle2'}>{infoText}</StyledSubtitle>
      )}
      <Box sx={{ width: '100%' }}>
        {strategies?.map((strategy, index) => (
          <Fragment key={strategy.id}>
            {index > 0 && <StrategySeparator text='OR' />}
            <FeatureStrategyItem
              key={strategy.id}
              strategy={strategy}
              index={index}
              input={input}
            />
          </Fragment>
        ))}
      </Box>
    </>
  );

type WrappedPlaygroundResultStrategyListProps = {
  feature: PlaygroundFeatureSchema;
  input?: PlaygroundRequestSchema;
};

const resolveHintText = (feature: PlaygroundFeatureSchema) => {
  if (
    feature.hasUnsatisfiedDependency &&
    !feature.isEnabledInCurrentEnvironment
  ) {
    return 'If environment was enabled and parent dependencies were satisfied';
  }
  if (feature.hasUnsatisfiedDependency) {
    return 'If parent dependencies were satisfied';
  }
  if (!feature.isEnabledInCurrentEnvironment) {
    return 'If environment was enabled';
  }
  return '';
};

export const WrappedPlaygroundResultStrategyList = ({
  feature,
  input,
}: WrappedPlaygroundResultStrategyListProps) => {
  const enabledStrategies = feature.strategies?.data?.filter(
    (strategy) => !strategy.disabled,
  );
  const disabledStrategies = feature.strategies?.data?.filter(
    (strategy) => strategy.disabled,
  );

  const showDisabledStrategies = disabledStrategies?.length > 0;

  return (
    <StyledAlertWrapper sx={{ pb: 1, mt: 2 }}>
      <StyledAlert severity={'info'} color={'warning'}>
        {resolveHintText(feature)}, then this feature flag would be{' '}
        {feature.strategies?.result ? 'TRUE' : 'FALSE'} with strategies
        evaluated like so:{' '}
      </StyledAlert>
      <StyledListWrapper sx={{ p: 2.5 }}>
        <PlaygroundResultStrategyLists
          strategies={enabledStrategies || []}
          input={input}
          titlePrefix={showDisabledStrategies ? 'Enabled' : ''}
        />
      </StyledListWrapper>
      {showDisabledStrategies && (
        <StyledListWrapper sx={{ p: 2.5 }}>
          <PlaygroundResultStrategyLists
            strategies={disabledStrategies}
            input={input}
            titlePrefix={'Disabled'}
            infoText={
              'Disabled strategies are not evaluated for the overall result.'
            }
          />
        </StyledListWrapper>
      )}
    </StyledAlertWrapper>
  );
};
