import { INPUT_ERROR_TEXT } from 'utils/testIds';
import { TextField, type OutlinedTextFieldProps, styled } from '@mui/material';
import { useStyles } from './Input.styles';

type InputProps = Omit<OutlinedTextFieldProps, 'variant'> & {
  label: string;
  error?: boolean;
  errorText?: string;
  style?: Object;
  className?: string;
  value: string;
  onChange: (e: any) => any;
  onFocus?: (e: any) => any;
  onBlur?: (e: any) => any;
  multiline?: boolean;
  rows?: number;
};

const StyledDiv = styled('div')({
  position: 'relative',
});

const Input = ({
  label,
  placeholder,
  error,
  errorText,
  style,
  className,
  value,
  onChange,
  size = 'small',
  ...rest
}: InputProps) => {
  const { classes: styles } = useStyles();
  return (
    <StyledDiv data-loading>
      <TextField
        size={size}
        variant='outlined'
        label={label}
        placeholder={placeholder}
        error={error}
        helperText={errorText}
        style={style}
        className={className ? className : ''}
        value={value}
        onChange={onChange}
        FormHelperTextProps={{
          'data-testid': INPUT_ERROR_TEXT,
          title: errorText,
          classes: {
            root: styles.helperText,
          },
        }}
        {...rest}
      />
    </StyledDiv>
  );
};

export default Input;
