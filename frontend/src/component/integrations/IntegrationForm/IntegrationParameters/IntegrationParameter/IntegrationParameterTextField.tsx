import { TextField, Typography } from '@mui/material';
import type { AddonParameterSchema, AddonSchema } from 'openapi';
import type { ChangeEventHandler } from 'react';
import { styled } from '@mui/material';
import { Markdown } from 'component/common/Markdown/Markdown';

const MASKED_VALUE = '*****';

const resolveType = ({ type = 'text', sensitive = false }, value: string) => {
  if (sensitive && value === MASKED_VALUE) {
    return 'text';
  }
  if (type === 'textfield') {
    return 'text';
  }
  return type;
};

const StyledTextField = styled(TextField)({
  width: '100%',
});

type IntegrationParameterTextFieldProps = {
  parametersErrors: Record<string, string>;
  definition: AddonParameterSchema;
  setParameterValue: (param: string) => ChangeEventHandler<HTMLInputElement>;
  config: AddonSchema;
};

export const IntegrationParameterTextField = ({
  definition,
  config,
  parametersErrors,
  setParameterValue,
}: IntegrationParameterTextFieldProps) => {
  const value = config.parameters[definition?.name] || '';
  const type = resolveType(definition, typeof value === 'string' ? value : '');
  const error = parametersErrors[definition.name];

  return (
    <StyledTextField
      size='small'
      minRows={definition.type === 'textfield' ? 5 : 0}
      multiline={definition.type === 'textfield'}
      type={type}
      label={
        <>
          {definition.displayName}
          {definition.required ? (
            <Typography component='span'>*</Typography>
          ) : null}
        </>
      }
      name={definition.name}
      placeholder={definition.placeholder || ''}
      InputLabelProps={{
        shrink: true,
      }}
      value={value}
      error={Boolean(error)}
      onChange={setParameterValue(definition.name)}
      variant='outlined'
      helperText={
        definition.description ? (
          <Markdown>{definition.description}</Markdown>
        ) : undefined
      }
    />
  );
};
