import { styled } from '@mui/material';
import EventDiff from 'component/events/EventDiff/EventDiff';

const StyledCodeSection = styled('div')(({ theme }) => ({
  overflowX: 'auto',
  '& code': {
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
    lineHeight: 1.5,
    fontSize: theme.fontSizes.smallBody,
  },
}));
type StrategyIds = { strategyIds: string[] };

type EnvironmentStrategyOrderDiff = {
  preData: StrategyIds;
  data: StrategyIds;
};

export const EnvironmentStrategyOrderDiff = ({
  preData,
  data,
}: EnvironmentStrategyOrderDiff) => (
  <StyledCodeSection>
    <EventDiff
      entry={{
        preData: preData.strategyIds,
        data: data.strategyIds,
      }}
      sort={(a, b) => a.index - b.index}
    />
  </StyledCodeSection>
);
