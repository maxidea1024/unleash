import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
import type React from 'react';

const StyledRadioGroup = styled(RadioGroup)({
  flexDirection: 'row',
});

const StyledRadioButtonGroup = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

type EnvironmentTypeSelectorProps = {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  value: string;
};

const EnvironmentTypeSelector = ({
  onChange,
  value,
}: EnvironmentTypeSelectorProps) => {
  return (
    <FormControl component='fieldset'>
      <StyledRadioGroup data-loading value={value} onChange={onChange}>
        <StyledRadioButtonGroup>
          <FormControlLabel
            value='development'
            label='Development'
            control={<Radio />}
          />
          <FormControlLabel value='test' label='Test' control={<Radio />} />
        </StyledRadioButtonGroup>
        <StyledRadioButtonGroup>
          <FormControlLabel
            value='preproduction'
            label='Pre production'
            control={<Radio />}
          />
          <FormControlLabel
            value='production'
            label='Production'
            control={<Radio />}
          />
        </StyledRadioButtonGroup>
      </StyledRadioGroup>
    </FormControl>
  );
};

export default EnvironmentTypeSelector;
