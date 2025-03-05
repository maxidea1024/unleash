import { StrategyParameter } from './StrategyParameter/StrategyParameter';
import type React from 'react';
import type { IStrategyParameter } from 'interfaces/strategy';

type StrategyParametersProps = {
  input: IStrategyParameter[];
  updateParameter: (index: number, updated: object) => void;
  setParams: React.Dispatch<React.SetStateAction<IStrategyParameter[]>>;
  errors: { [key: string]: string };
};

export const StrategyParameters = ({
  input = [],
  updateParameter,
  setParams,
  errors,
}: StrategyParametersProps) => (
  <div style={{ marginTop: '0.5rem' }}>
    {input.map((item, index) => (
      <StrategyParameter
        params={input}
        key={index}
        set={(value) => updateParameter(index, value)}
        index={index}
        input={input[index]}
        setParams={setParams}
        errors={errors}
      />
    ))}
  </div>
);
