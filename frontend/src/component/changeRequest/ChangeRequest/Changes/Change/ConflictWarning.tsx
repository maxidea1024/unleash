import { Alert } from '@mui/material';

type ConflictWarningProps = {
  conflict: string | null | undefined;
};

export const ConflictWarning = ({ conflict }: ConflictWarningProps) => (
  Boolean(conflict) && (
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
  )
);
