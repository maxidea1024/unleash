import type { ReactNode } from 'react';
import { Box, styled, Typography } from '@mui/material';
import type {
  IChangeRequestAddDependency,
  IChangeRequestDeleteDependency,
} from 'component/changeRequest/changeRequest.types';
import { Link } from 'react-router-dom';
import { ChangeItemWrapper } from './StrategyChange';

const StyledLink = styled(Link)(({ theme }) => ({
  maxWidth: '100%',
  textDecoration: 'none',
  '&:hover, &:focus': {
    textDecoration: 'underline',
  },
}));

const AddDependencyWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

type DependencyChangeProps = {
  actions?: ReactNode;
  change: IChangeRequestAddDependency | IChangeRequestDeleteDependency;
  projectId: string;
  onNavigate?: () => void;
};

export const DependencyChange = ({
  actions,
  change,
  projectId,
  onNavigate,
}: DependencyChangeProps) => {
  return (
    <>
      {change.action === 'addDependency' && (
        <>
          <ChangeItemWrapper>
            <AddDependencyWrapper>
              <Typography color={'success.dark'}>
                + Adding dependency:
              </Typography>
              <StyledLink
                to={`/projects/${projectId}/features/${change.payload.feature}`}
                onClick={onNavigate}
              >
                {change.payload.feature}
              </StyledLink>
              {!change.payload.enabled ? ' (disabled)' : null}
              {change.payload.variants?.length
                ? `(${change.payload.variants?.join(', ')})`
                : null}
            </AddDependencyWrapper>
            {actions}
          </ChangeItemWrapper>
        </>
      )}
      {change.action === 'deleteDependency' && (
        <ChangeItemWrapper>
          <AddDependencyWrapper>
            <Typography
              sx={(theme) => ({
                color: theme.palette.error.main,
              })}
            >
              - Deleting dependencies
            </Typography>
          </AddDependencyWrapper>
          {actions}
        </ChangeItemWrapper>
      )}
    </>
  );
};
