import { useNavigate } from 'react-router-dom';
import { Box, Button, styled, Typography } from '@mui/material';
import useLoading from 'hooks/useLoading';
import { useInviteTokens } from 'hooks/api/getters/useInviteTokens/useInviteTokens';
import { LinkField } from '../LinkField/LinkField';
import { add, formatDistanceToNowStrict, isAfter, parseISO } from 'date-fns';
import { formatDateYMD } from 'utils/formatDate';
import { useLocationSettings } from 'hooks/useLocationSettings';

export const StyledBox = styled(Box)(() => ({
  mb: {
    xs: 1,
    md: 0,
  },
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export const StyledButtonBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
}));

type InviteLinkBarContentProps = {
  onActionClick?: (inviteLink?: string) => void;
};

export const InviteLinkBarContent = ({
  onActionClick,
}: InviteLinkBarContentProps) => {
  const navigate = useNavigate();
  const { data, loading } = useInviteTokens();
  const ref = useLoading(loading);
  const inviteToken =
    data?.tokens?.find((token) => token.name === 'default') ?? null;
  const inviteLink = inviteToken?.url;
  const createdAt = data?.tokens?.[0]?.createdAt ?? '';
  const expiresAt = data?.tokens?.[0]?.expiresAt ?? '';
  const expires = expiresAt || false;
  const isExpired = Boolean(expires && isAfter(new Date(), parseISO(expires)));
  const willExpireSoon =
    expires && isAfter(add(new Date(), { days: 14 }), parseISO(expires));
  const expiresIn = expires
    ? formatDistanceToNowStrict(parseISO(expires))
    : false;
  const { locationSettings } = useLocationSettings();

  const expireDateComponent = (
    <Typography
      component='span'
      variant='body2'
      color={willExpireSoon ? 'warning.dark' : 'inherit'}
      fontWeight='bold'
    >
      {expiresIn}
    </Typography>
  );

  const onInviteLinkActionClick = () => {
    onActionClick?.(inviteLink);
    navigate('/admin/invite-link');
  };
  return (
    <>
      <StyledBox ref={ref}>
        {Boolean(inviteLink) ? (
          <>
            <Typography variant='body2' sx={{ mb: 1 }}>
              {`You have an invite link created on ${formatDateYMD(createdAt, locationSettings.locale)} `}
              {isExpired ? (
                <>that expired {expireDateComponent} ago</>
              ) : (
                <>that will expire in {expireDateComponent}</>
              )}
            </Typography>
            <LinkField small inviteLink={inviteLink!} isExpired={isExpired} />
          </>
        ) : (
          <Typography variant='body2' data-loading>
            You can easily create an invite link here that you can share and use
            to invite people from your company to your Ganpa setup.
          </Typography>
        )}
      </StyledBox>
      <StyledButtonBox
        sx={{
          justifyContent: {
            xs: 'center',
            md: 'flex-end',
          },
        }}
      >
        <Button
          variant='outlined'
          onClick={onInviteLinkActionClick}
          data-loading
        >
          {inviteLink ? 'Update' : 'Create'} invite link
        </Button>
      </StyledButtonBox>
    </>
  );
};
