import { Autocomplete, TextField } from '@mui/material';

type ProjectActionsActionParameterAutocompleteProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export const ProjectActionsActionParameterAutocomplete = ({
  label,
  value,
  onChange,
  options,
}: ProjectActionsActionParameterAutocompleteProps) => (
  <Autocomplete
    options={options}
    autoHighlight
    autoSelect
    value={value}
    onInputChange={(_, parameter) => onChange(parameter)}
    renderInput={(params) => (
      <TextField {...params} size='small' label={label} />
    )}
  />
);
