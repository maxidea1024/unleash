import type { ComponentType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ProjectCard as NewProjectCard } from '../ProjectCard/ProjectCard';
import type { ProjectSchema } from 'openapi';
import loadingData from './loadingData';
import { TablePlaceholder } from 'component/common/Table';
import { styled, Typography } from '@mui/material';
import { useSearchHighlightContext } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { flexColumn } from 'themes/themeStyles';

const StyledContainer = styled('article')(({ theme }) => ({
  ...flexColumn,
  gap: theme.spacing(2),
}));

const StyledHeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
}));

const StyledHeaderTitle = styled('div')(() => ({
  flexGrow: 0,
}));

const StyledGridContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: theme.spacing(2),
}));

const StyledCardLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  border: 'none',
  padding: '0',
  background: 'transparent',
  fontFamily: theme.typography.fontFamily,
  pointer: 'cursor',
}));

type ProjectGroupProps = {
  sectionTitle?: string;
  sectionSubtitle?: string;
  HeaderActions?: ReactNode;
  projects: ProjectSchema[];
  loading: boolean;
  placeholder?: string;
  ProjectCardComponent?: ComponentType<ProjectSchema & any>;
  link?: boolean;
};

export const ProjectGroup = ({
  sectionTitle,
  sectionSubtitle,
  HeaderActions,
  projects,
  loading,
  placeholder = 'No projects available.',
  ProjectCardComponent,
  link = true,
}: ProjectGroupProps) => {
  const ProjectCard = ProjectCardComponent ?? NewProjectCard;
  const { searchQuery } = useSearchHighlightContext();

  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <StyledHeaderTitle>
          {Boolean(sectionTitle) && (
            <Typography component='h2' variant='h2'>
              {sectionTitle}
            </Typography>
          )}
          {Boolean(sectionSubtitle) && (
            <Typography variant='body2' color='text.secondary'>
              {sectionSubtitle}
            </Typography>
          )}
        </StyledHeaderTitle>
        {HeaderActions}
      </StyledHeaderContainer>
      {projects.length < 1 && !loading ? (
        searchQuery?.length > 0 ? (
          <TablePlaceholder>
            No projects found matching &ldquo;{searchQuery}&rdquo;
          </TablePlaceholder>
        ) : (
          <TablePlaceholder>{placeholder}</TablePlaceholder>
        )
      ) : (
        <StyledGridContainer>
          {loading ? (
            <>
              {loadingData.map((project: ProjectSchema) => (
                <ProjectCard
                  data-loading
                  createdAt={project.createdAt}
                  key={project.id}
                  name={project.name}
                  id={project.id}
                  mode={project.mode}
                  memberCount={2}
                  health={95}
                  featureCount={4}
                  owners={[
                    {
                      ownerType: 'user',
                      name: 'Loading data',
                    },
                  ]}
                />
              ))}
            </>
          ) : (
            <>
              {projects.map((project) =>
                link ? (
                  <StyledCardLink
                    key={project.id}
                    to={`/projects/${project.id}`}
                  >
                    <ProjectCard {...project} />
                  </StyledCardLink>
                ) : (
                  <ProjectCard key={project.id} {...project} />
                ),
              )}
            </>
          )}
        </StyledGridContainer>
      )}
    </StyledContainer>
  );
};
