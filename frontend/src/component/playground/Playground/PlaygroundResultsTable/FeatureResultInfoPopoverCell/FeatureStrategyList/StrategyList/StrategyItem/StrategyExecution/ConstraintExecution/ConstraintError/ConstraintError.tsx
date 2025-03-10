import { styled, Typography } from '@mui/material';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import type {
  PlaygroundConstraintSchema,
  PlaygroundRequestSchema,
} from 'openapi';

const StyledConstraintErrorDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(1),
  color: theme.palette.error.main,
}));

type ConstraintErrorProps = {
  constraint: PlaygroundConstraintSchema;
  input?: PlaygroundRequestSchema;
};

export const ConstraintError = ({
  constraint,
  input,
}: ConstraintErrorProps) => {
  const formatText = () => {
    const value = input?.context[constraint.contextName];

    if (value) {
      return `Constraint not met – the value in the context: { ${value} } is not ${constraint.operator} ${constraint.contextName}`;
    }

    return `Constraint not met – no value was specified for ${constraint.contextName}`;
  };

  return (
    <StyledConstraintErrorDiv>
      <CancelOutlined style={{ marginRight: '0.25rem' }} />
      <Typography variant='body2'>{formatText()}</Typography>
    </StyledConstraintErrorDiv>
  );
};
