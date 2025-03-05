import { Button } from '@mui/material';
import { Alert } from '@mui/material';

type ApiErrorProps = {
  className?: string;
  onClick: () => void;
  text: string;
  style?: React.CSSProperties;
};

const ApiError = ({ className, onClick, text, ...rest }: ApiErrorProps) => {
  return (
    <Alert
      className={className ? className : ''}
      action={
        <Button color='inherit' size='small' onClick={onClick}>
          TRY AGAIN
        </Button>
      }
      severity='error'
      {...rest}
    >
      {text}
    </Alert>
  );
};

export default ApiError;
