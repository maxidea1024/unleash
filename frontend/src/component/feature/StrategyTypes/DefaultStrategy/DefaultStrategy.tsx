import type { IStrategy } from 'interfaces/strategy';

type DefaultStrategyProps = {
  strategyDefinition: IStrategy;
};

const DefaultStrategy = ({ strategyDefinition }: DefaultStrategyProps) => {
  return <p>{strategyDefinition?.description}</p>;
};

export default DefaultStrategy;
