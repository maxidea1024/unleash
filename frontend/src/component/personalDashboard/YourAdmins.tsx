import { UserAvatar } from 'component/common/UserAvatar/UserAvatar';
import { Typography, styled } from '@mui/material';
import type { PersonalDashboardSchemaAdminsItem } from 'openapi';

const StyledList = styled('ul')(({ theme }) => ({
  padding: 0,
  'li + li': {
    marginTop: theme.spacing(2),
  },
}));

const StyledListItem = styled('li')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row',
  gap: theme.spacing(2),
}));

const Wrapper = styled('article')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'column',
  gap: theme.spacing(2),
}));

type YourAdminsProps = {
  admins: PersonalDashboardSchemaAdminsItem[];
};

export const YourAdmins = ({ admins }: YourAdminsProps) => {
  return (
    <Wrapper>
      {admins.length ? (
        <>
          <p>
            Your Ganpa administrator
            {admins.length > 1 ? 's are' : ' is'}:
          </p>
          <StyledList>
            {admins.map((admin) => {
              return (
                <StyledListItem key={admin.id}>
                  <UserAvatar
                    sx={{
                      margin: 0,
                    }}
                    user={admin}
                  />
                  <Typography>
                    {admin.name || admin.username || admin.email}
                  </Typography>
                </StyledListItem>
              );
            })}
          </StyledList>
        </>
      ) : (
        <p>You have no Ganpa administrators to contact.</p>
      )}
    </Wrapper>
  );
};
