import { styled, Tooltip } from '@mui/material';
import type { IGroup } from 'interfaces/group';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'component/common/Badge/Badge';
import { GroupCardActions } from './GroupCardActions/GroupCardActions';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import { RoleBadge } from 'component/common/RoleBadge/RoleBadge';
import { useScimSettings } from 'hooks/api/getters/useScimSettings/useScimSettings';
import { AvatarGroup } from 'component/common/AvatarGroup/AvatarGroup';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
}));

const StyledGroupCard = styled('aside')(({ theme }) => ({
  padding: theme.spacing(2.5),
  height: '100%',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadiusLarge,
  boxShadow: theme.boxShadows.card,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
  '&:hover': {
    transition: 'background-color 0.2s ease-in-out',
    backgroundColor: theme.palette.neutral.light,
  },
}));

const StyledRow = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledTitleRow = styled(StyledRow)(() => ({
  alignItems: 'flex-start',
}));

const StyledBottomRow = styled(StyledRow)(({ theme }) => ({
  marginTop: 'auto',
  alignItems: 'flex-end',
  gap: theme.spacing(1),
}));

const StyledHeaderTitle = styled('h2')(({ theme }) => ({
  fontSize: theme.fontSizes.mainHeader,
  fontWeight: theme.fontWeight.medium,
}));

const StyledHeaderActions = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  fontSize: theme.fontSizes.smallBody,
}));

const StyledDescription = styled('p')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.fontSizes.smallBody,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(4),
}));

const StyledCounterDescription = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(1),
}));

const ProjectBadgeContainer = styled('div')(({ theme }) => ({
  maxWidth: '50%',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(0.5),
  flexWrap: 'wrap',
}));

const InfoBadgeDescription = styled('span')(({ theme }) => ({
  display: 'flex',
  color: theme.palette.text.secondary,
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: theme.fontSizes.smallBody,
}));

const ProjectNameBadge = styled(Badge)({
  wordBreak: 'break-word',
});

type GroupCardProps = {
  group: IGroup;
  onEditUsers: (group: IGroup) => void;
  onRemoveGroup: (group: IGroup) => void;
};

export const GroupCard = ({
  group,
  onEditUsers,
  onRemoveGroup,
}: GroupCardProps) => {
  const navigate = useNavigate();

  const {
    settings: { enabled: scimEnabled },
  } = useScimSettings();
  const isScimGroup = scimEnabled && Boolean(group.scimId);

  return (
    <>
      <StyledLink key={group.id} to={`/admin/groups/${group.id}`}>
        <StyledGroupCard>
          <StyledTitleRow>
            <StyledHeaderTitle>{group.name}</StyledHeaderTitle>
            <StyledHeaderActions>
              <GroupCardActions
                groupId={group.id}
                onEditUsers={() => onEditUsers(group)}
                onRemove={() => onRemoveGroup(group)}
                isScimGroup={isScimGroup}
              />
            </StyledHeaderActions>
          </StyledTitleRow>
          {Boolean(group.rootRole) && (
            <InfoBadgeDescription>
              <p>Root role:</p>
              <RoleBadge roleId={group.rootRole!} />
            </InfoBadgeDescription>
          )}

          <StyledDescription>{group.description}</StyledDescription>
          <StyledBottomRow>
            {group.users?.length > 0 ? (
              <AvatarGroup users={group.users} />
            ) : (
              <StyledCounterDescription>
                This group has no users.
              </StyledCounterDescription>
            )}
            <ProjectBadgeContainer>
              {group.projects.length > 0
                ? group.projects.map((project) => (
                    <Tooltip
                      key={project}
                      title='View project'
                      arrow
                      placement='bottom-end'
                      describeChild
                    >
                      <ProjectNameBadge
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/projects/${project}/settings/access`);
                        }}
                        color='secondary'
                        icon={<TopicOutlinedIcon />}
                      >
                        {project}
                      </ProjectNameBadge>
                    </Tooltip>
                  ))
                : !group.rootRole && (
                    <Tooltip
                      title='This group is not used in any project'
                      arrow
                      describeChild
                    >
                      <Badge>Not used</Badge>
                    </Tooltip>
                  )}
            </ProjectBadgeContainer>
          </StyledBottomRow>
        </StyledGroupCard>
      </StyledLink>
    </>
  );
};
