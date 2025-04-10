import type React from 'react';
import { useCallback } from 'react';
import type { INavigationMenuItem } from 'interfaces/route';
import type { NavigationMode } from './NavigationMode';
import {
  ExternalFullListItem,
  FullListItem,
  MiniListItem,
  SignOutItem,
} from './ListItems';
import { Box, List, styled, Tooltip, Typography } from '@mui/material';
import { IconRenderer } from './IconRenderer';
import { EnterpriseBadge } from 'component/common/EnterpriseBadge/EnterpriseBadge';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import SearchIcon from '@mui/icons-material/Search';
import PlaygroundIcon from '@mui/icons-material/AutoFixNormal';
import InsightsIcon from '@mui/icons-material/Insights';
import PersonalDashboardIcon from '@mui/icons-material/DashboardOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlagIcon from '@mui/icons-material/OutlinedFlag';
import useProjectOverview from 'hooks/api/getters/useProjectOverview/useProjectOverview';
import { ProjectIcon } from 'component/common/ProjectIcon/ProjectIcon';
import { useUiFlag } from 'hooks/useUiFlag';

const StyledBadgeContainer = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  display: 'flex',
}));

const EnterprisePlanBadge = () => (
  <Tooltip title='This is an Enterprise feature'>
    <StyledBadgeContainer>
      <EnterpriseBadge />
    </StyledBadgeContainer>
  </Tooltip>
);

const useShowBadge = () => {
  const { isPro } = useUiConfig();

  const showBadge = useCallback(
    (mode?: INavigationMenuItem['menu']['mode']) => {
      return !!(
        isPro() &&
        !mode?.includes('pro') &&
        mode?.includes('enterprise')
      );
    },
    [isPro],
  );
  return showBadge;
};

type SecondaryNavigationListProps = {
  routes: INavigationMenuItem[];
  mode: NavigationMode;
  onClick: (activeItem: string) => void;
  activeItem?: string;
};

export const SecondaryNavigationList = ({
  routes,
  mode,
  onClick,
  activeItem,
}: SecondaryNavigationListProps) => {
  const showBadge = useShowBadge();
  const DynamicListItem = mode === 'mini' ? MiniListItem : FullListItem;

  return (
    <List>
      {routes.map((route) => (
        <DynamicListItem
          key={route.title}
          onClick={() => onClick(route.path)}
          href={route.path}
          text={route.title}
          selected={activeItem === route.path}
          badge={showBadge(route?.menu?.mode) ? <EnterprisePlanBadge /> : null}
        >
          <IconRenderer path={route.path} />
        </DynamicListItem>
      ))}
    </List>
  );
};

export const OtherLinksList = () => {
  const { uiConfig } = useUiConfig();

  return (
    <List>
      {uiConfig.links.map((link) => (
        <ExternalFullListItem
          href={link.href}
          text={link.value}
          key={link.value}
        >
          <IconRenderer path={link.value} />
        </ExternalFullListItem>
      ))}
      <SignOutItem />
    </List>
  );
};

type RecentProjectsListProps = {
  projectId: string;
  projectName: string;
  mode: NavigationMode;
  onClick: () => void;
};

export const RecentProjectsList = ({
  projectId,
  projectName,
  mode,
  onClick,
}: RecentProjectsListProps) => {
  const DynamicListItem = mode === 'mini' ? MiniListItem : FullListItem;

  return (
    <List>
      <DynamicListItem
        href={`/projects/${projectId}`}
        text={projectName}
        onClick={onClick}
        selected={false}
      >
        <ProjectIcon />
      </DynamicListItem>
    </List>
  );
};

type RecentFlagsListProps = {
  flags: { featureId: string; projectId: string }[];
  mode: NavigationMode;
  onClick: () => void;
};

export const RecentFlagsList = ({
  flags,
  mode,
  onClick,
}: RecentFlagsListProps) => {
  const DynamicListItem = mode === 'mini' ? MiniListItem : FullListItem;

  return (
    <List>
      {flags.map((flag) => (
        <DynamicListItem
          href={`/projects/${flag.projectId}/features/${flag.featureId}`}
          text={flag.featureId}
          onClick={onClick}
          selected={false}
          key={flag.featureId}
        >
          <FlagIcon />
        </DynamicListItem>
      ))}
    </List>
  );
};

type PrimaryNavigationListProps = {
  mode: NavigationMode;
  onClick: (activeItem: string) => void;
  activeItem?: string;
};

export const PrimaryNavigationList = ({
  mode,
  onClick,
  activeItem,
}: PrimaryNavigationListProps) => {
  const DynamicListItem = mode === 'mini' ? MiniListItem : FullListItem;
  const personalDashboardUIEnabled = useUiFlag('personalDashboardUI');
  const { isOss } = useUiConfig();

  return (
    <List>
      {personalDashboardUIEnabled ? (
        <DynamicListItem
          href='/personal'
          text='Dashboard'
          onClick={() => onClick('/personal')}
          selected={activeItem === '/personal'}
        >
          <PersonalDashboardIcon />
        </DynamicListItem>
      ) : null}

      <DynamicListItem
        href='/projects'
        text='Projects'
        onClick={() => onClick('/projects')}
        selected={activeItem === '/projects'}
      >
        <ProjectIcon />
      </DynamicListItem>
      <DynamicListItem
        href='/search'
        text='Search'
        onClick={() => onClick('/search')}
        selected={activeItem === '/search'}
      >
        <SearchIcon />
      </DynamicListItem>
      <DynamicListItem
        href='/playground'
        text='Playground'
        onClick={() => onClick('/playground')}
        selected={activeItem === '/playground'}
      >
        <PlaygroundIcon />
      </DynamicListItem>
      {!isOss() && (
        <DynamicListItem
          href='/insights'
          text='Insights'
          onClick={() => onClick('/insights')}
          selected={activeItem === '/insights'}
        >
          <InsightsIcon />
        </DynamicListItem>
      )}
    </List>
  );
};

type AccordionHeaderProps = {
  children?: React.ReactNode;
};

const AccordionHeader = ({ children }: AccordionHeaderProps) => {
  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls='configure-content'
      id='configure-header'
    >
      <Typography sx={{ fontWeight: 'bold', fontSize: 'small' }}>
        {children}
      </Typography>
    </AccordionSummary>
  );
};

type SecondaryNavigationProps = {
  expanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  mode: NavigationMode;
  title: string;
  children?: React.ReactNode;
};

export const SecondaryNavigation = ({
  mode,
  expanded,
  onExpandChange,
  title,
  children,
}: SecondaryNavigationProps) => {
  return (
    <Accordion
      disableGutters={true}
      sx={{
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
      }}
      expanded={expanded}
      onChange={(_, expand) => {
        onExpandChange(expand);
      }}
    >
      {mode === 'full' && <AccordionHeader>{title}</AccordionHeader>}
      <AccordionDetails sx={{ p: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

type RecentProjectsNavigationProps = {
  mode: NavigationMode;
  projectId: string;
  onClick: () => void;
};

export const RecentProjectsNavigation = ({
  mode,
  onClick,
  projectId,
}: RecentProjectsNavigationProps) => {
  const { project, loading } = useProjectOverview(projectId);
  const projectDeleted = !project.name && !loading;

  if (projectDeleted) {
    return null;
  }

  return (
    <Box>
      {mode === 'full' && (
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: 'small',
            ml: 2,
            mt: 1.5,
          }}
        >
          Recent project
        </Typography>
      )}
      <RecentProjectsList
        projectId={projectId}
        projectName={project.name}
        mode={mode}
        onClick={onClick}
      />
    </Box>
  );
};

type RecentFlagsNavigationProps = {
  mode: NavigationMode;
  flags: { featureId: string; projectId: string }[];
  onClick: () => void;
};

export const RecentFlagsNavigation = ({
  mode,
  onClick,
  flags,
}: RecentFlagsNavigationProps) => {
  return (
    <Box>
      {mode === 'full' && (
        <Typography sx={{ fontWeight: 'bold', fontSize: 'small', ml: 2 }}>
          Recent flags
        </Typography>
      )}
      <RecentFlagsList flags={flags} mode={mode} onClick={onClick} />
    </Box>
  );
};
