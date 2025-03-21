import {
  Box,
  FormControlLabel,
  Switch,
  Typography,
  styled,
} from '@mui/material';
import type { MouseEventHandler } from 'react';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

type IntegrationStateSwitchProps = {
  checked: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const IntegrationStateSwitch = ({
  checked,
  onClick,
}: IntegrationStateSwitchProps) => {
  return (
    <StyledContainer>
      <Typography component='span'>Integration status</Typography>
      <FormControlLabel
        control={<Switch checked={checked} onClick={onClick} />}
        label={
          <Box
            component='span'
            sx={(theme) => ({ marginLeft: theme.spacing(0.5) })}
          >
            {checked ? 'Enabled' : 'Disabled'}
          </Box>
        }
      />
    </StyledContainer>
  );
};
