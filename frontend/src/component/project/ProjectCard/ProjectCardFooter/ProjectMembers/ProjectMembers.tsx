import { styled } from '@mui/material';
import { AvatarGroup } from 'component/common/AvatarGroup/AvatarGroup';
import { UserAvatar } from 'component/common/UserAvatar/UserAvatar';
import { flexColumn } from 'themes/themeStyles';

const StyledContainer = styled('div')(({ theme }) => ({
  ...flexColumn,
  alignItems: 'flex-end',
  padding: theme.spacing(0, 2, 0, 1),
  minWidth: 95,
}));

const StyledDescription = styled('span')(({ theme }) => ({
  fontSize: theme.fontSizes.smallerBody,
  color: theme.palette.text.secondary,
  textWrap: 'nowrap',
}));

const StyledAvatar = styled(UserAvatar)(({ theme }) => ({
  width: theme.spacing(2),
  height: theme.spacing(2),
}));

const AvatarComponent = ({ ...props }) => (
  <StyledAvatar {...props} disableTooltip />
);

type ProjectMembersProps = {
  count?: number;
  members: Array<{
    imageUrl?: string;
    email?: string;
    name: string;
  }>;
};

export const ProjectMembers = ({ count = 0, members }: ProjectMembersProps) => {
  return (
    <StyledContainer>
      <StyledDescription data-loading>
        {count} member
        {count === 1 ? '' : 's'}
      </StyledDescription>
      <AvatarGroup
        users={members}
        avatarLimit={4}
        AvatarComponent={AvatarComponent}
      />
    </StyledContainer>
  );
};
