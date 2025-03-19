import { useTheme } from '@mui/material';
import { PlaygroundResultChip } from '../../../../PlaygroundResultChip/PlaygroundResultChip';
import type {
  PlaygroundStrategySchema,
  PlaygroundRequestSchema,
} from 'openapi';
import { StrategyExecution } from './StrategyExecution/StrategyExecution';
import { StrategyItemContainer } from 'component/common/StrategyItemContainer/StrategyItemContainer';
import { objectId } from 'utils/objectId';
import { DisabledStrategyExecution } from './StrategyExecution/DisabledStrategyExecution';

type FeatureStrategyItemProps = {
  strategy: PlaygroundStrategySchema;
  index: number;
  input?: PlaygroundRequestSchema;
};

export const FeatureStrategyItem = ({
  strategy,
  input,
  index,
}: FeatureStrategyItemProps) => {
  const { result } = strategy;
  const theme = useTheme();
  const label =
    result.evaluationStatus === 'incomplete' ||
    result.evaluationStatus === 'unevaluated'
      ? 'Unevaluated'
      : result.enabled
        ? 'True'
        : 'False';

  return (
    <StrategyItemContainer
      style={{
        borderColor:
          result.enabled && result.evaluationStatus === 'complete'
            ? theme.palette.success.main
            : 'none',
      }}
      strategy={{ ...strategy, id: `${objectId(strategy)}` }}
      orderNumber={index + 1}
      actions={
        <PlaygroundResultChip
          showIcon={false}
          enabled={result.enabled}
          label={label}
        />
      }
    >
      {strategy.disabled ? (
        <DisabledStrategyExecution strategyResult={strategy} input={input} />
      ) : (
        <StrategyExecution
          strategyResult={strategy}
          input={input}
          percentageFill={theme.palette.background.elevation2}
        />
      )}
    </StrategyItemContainer>
  );
};
