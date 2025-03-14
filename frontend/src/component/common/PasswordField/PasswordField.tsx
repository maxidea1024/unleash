import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import type React from 'react';
import { useState } from 'react';

const PasswordField = ({ ...rest }: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const IconComponent = showPassword ? Visibility : VisibilityOff;
  const iconTitle = 'Toggle password visibility';

  return (
    <TextField
      variant='outlined'
      size='small'
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        style: {
          paddingRight: '0px',
        },
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              size='large'
            >
              <IconComponent titleAccess={iconTitle} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

export default PasswordField;
