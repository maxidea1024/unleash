import { Alert } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';

type ConflictWarningProps = {
  conflict: string | null | undefined;
};

export const ConflictWarning = ({ conflict }: ConflictWarningProps) => (
  <ConditionallyRender
    condition={Boolean(conflict)}
    show={
      <Alert
        severity='warning'
        sx={{
          px: 3,
          mb: 2,
          '&.MuiAlert-standardWarning': {
            borderStyle: 'none',
          },
          borderRadius: '0px',
        }}
      >
        <strong>Conflict!</strong> {conflict}.
      </Alert>
    }
  />
);
