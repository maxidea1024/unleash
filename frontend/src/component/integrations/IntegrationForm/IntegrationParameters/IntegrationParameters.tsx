import React from 'react';
import {
  IntegrationParameter,
  type IntegrationParameterProps,
} from './IntegrationParameter/IntegrationParameter';
import type { AddonTypeSchema } from 'openapi';

type IntegrationParametersProps = {
  provider?: AddonTypeSchema;
  parametersErrors: IntegrationParameterProps['parametersErrors'];
  editMode: boolean;
  setParameterValue: IntegrationParameterProps['setParameterValue'];
  config: IntegrationParameterProps['config'];
};

export const IntegrationParameters = ({
  provider,
  config,
  parametersErrors,
  setParameterValue,
  editMode,
}: IntegrationParametersProps) => {
  if (!provider) return null;
  return (
    <React.Fragment>
      {editMode ? (
        <p>
          Sensitive parameters will be masked with value "<i>*****</i>
          ". If you don't change the value they will not be updated when saving.
        </p>
      ) : null}
      {provider.parameters?.map((parameter) => (
        <IntegrationParameter
          key={parameter.name}
          definition={parameter}
          parametersErrors={parametersErrors}
          config={config}
          setParameterValue={setParameterValue}
        />
      ))}
    </React.Fragment>
  );
};
