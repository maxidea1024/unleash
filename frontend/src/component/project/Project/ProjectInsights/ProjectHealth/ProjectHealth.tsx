import { ProjectHealthChart } from './ProjectHealthChart';
import { Alert, Box, styled, Typography } from '@mui/material';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import type { ProjectInsightsSchemaHealth } from '../../../../../openapi';
import { FlagCounts } from './FlagCounts';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

type ProjectHealthProps = {
  health: ProjectInsightsSchemaHealth;
};

export const ProjectHealth = ({ health }: ProjectHealthProps) => {
  const projectId = useRequiredPathParam('projectId');
  const { staleCount, potentiallyStaleCount, activeCount, rating } = health;

  return (
    <Container>
      <Typography variant='h3'>Project Health</Typography>
      {staleCount > 0 && (
        <Alert severity='warning'>
          <b>Health alert!</b> Review your flags and delete the stale flags
        </Alert>
      )}

      <Box
        data-loading
        sx={(theme) => ({
          display: 'flex',
          gap: theme.spacing(4),
          marginTop: theme.spacing(3),
        })}
      >
        <ProjectHealthChart
          active={activeCount}
          stale={staleCount}
          potentiallyStale={potentiallyStaleCount}
          health={rating}
        />

        <FlagCounts
          projectId={projectId}
          activeCount={activeCount}
          potentiallyStaleCount={potentiallyStaleCount}
          staleCount={staleCount}
        />
      </Box>
    </Container>
  );
};
