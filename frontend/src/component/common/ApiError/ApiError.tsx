import { Button } from '@mui/material';
import { Alert } from '@mui/material';
import type { FC } from 'react';

type ApiErrorProps = {
  className?: string;
  onClick: () => void;
  text: string;
  style?: React.CSSProperties;
};

const ApiError: FC<ApiErrorProps> = ({ className, onClick, text, ...rest }) => {
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
