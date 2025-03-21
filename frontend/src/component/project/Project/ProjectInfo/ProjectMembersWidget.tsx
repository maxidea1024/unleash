import {
  StyledProjectInfoWidgetContainer,
  StyledWidgetTitle,
} from './ProjectInfo.styles';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { StatusBox } from '../ProjectStats/StatusBox';
import { WidgetFooterLink } from './WidgetFooterLink';
import { Box } from '@mui/material';

type ProjectMembersWidgetProps = {
  projectId: string;
  memberCount: number;
  change?: number;
};

/**
 * @deprecated in favor of ProjectMembers.tsx
 */
export const ProjectMembersWidget = ({
  projectId,
  memberCount,
  change = 0,
}: ProjectMembersWidgetProps) => {
  const { uiConfig } = useUiConfig();

  let link = `/admin/users`;

  if (uiConfig?.versionInfo?.current?.enterprise) {
    link = `/projects/${projectId}/settings/access`;
  }

  return (
    <StyledProjectInfoWidgetContainer>
      <StyledWidgetTitle data-loading>Project members</StyledWidgetTitle>
      <Box
        data-loading
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <StatusBox boxText={`${memberCount}`} change={change} />
      </Box>
      <WidgetFooterLink data-loading to={link}>
        View all members
      </WidgetFooterLink>
    </StyledProjectInfoWidgetContainer>
  );
};
