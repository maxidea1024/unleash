import { StyledContainer, StyledInputLabel } from '../ApiTokenForm.styles';
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import type { TokenType } from 'interfaces/token';

export type ISelectOption = {
  key: string;
  label: string;
  title: string;
  enabled: boolean;
};

type TokenTypeSelectorProps = {
  type: string;
  setType: (value: TokenType) => void;
  apiTokenTypes: ISelectOption[];
};

export const TokenTypeSelector = ({
  type,
  setType,
  apiTokenTypes,
}: TokenTypeSelectorProps) => {
  return (
    <StyledContainer>
      <FormControl sx={{ mb: 2, width: '100%' }}>
        <StyledInputLabel id='token-type'>
          What do you want to connect?
        </StyledInputLabel>
        <RadioGroup
          aria-labelledby='token-type'
          defaultValue='CLIENT'
          name='radio-buttons-group'
          value={type}
          onChange={(_, value) => setType(value as TokenType)}
        >
          {apiTokenTypes.map(({ key, label, title, enabled: hasAccess }) => (
            <FormControlLabel
              key={key}
              value={key}
              sx={{ mb: 1 }}
              disabled={!hasAccess}
              control={
                <Radio
                  sx={{
                    ml: 0.75,
                    alignSelf: 'flex-start',
                  }}
                />
              }
              label={
                <Box>
                  <Box>
                    <Typography>{label}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {title}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </StyledContainer>
  );
};
