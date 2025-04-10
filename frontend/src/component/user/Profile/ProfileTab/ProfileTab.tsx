import { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import { Badge } from 'component/common/Badge/Badge';
import { UserAvatar } from 'component/common/UserAvatar/UserAvatar';
import { useProfile } from 'hooks/api/getters/useProfile/useProfile';
import { useLocationSettings } from 'hooks/useLocationSettings';
import type { IUser } from 'interfaces/user';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import { useNavigate } from 'react-router-dom';
import { PageContent } from 'component/common/PageContent/PageContent';
import { RoleBadge } from 'component/common/RoleBadge/RoleBadge';
import { useUiFlag } from 'hooks/useUiFlag';
import { ProductivityEmailSubscription } from './ProductivityEmailSubscription';

const StyledHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadiusLarge,
  backgroundColor: theme.palette.background.alternative,
  color: theme.palette.primary.contrastText,
  marginBottom: theme.spacing(3),
  boxShadow: theme.boxShadows.primaryHeader,
}));

const StyledInfo = styled('div')(() => ({
  flexGrow: 1,
}));

const StyledInfoName = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3.75),
}));

const StyledAvatar = styled(UserAvatar)(({ theme }) => ({
  width: theme.spacing(9.5),
  height: theme.spacing(9.5),
  marginRight: theme.spacing(3),
}));

const StyledSectionLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.fontSizes.mainHeader,
  marginBottom: theme.spacing(3),
}));

const StyledAccess = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  '& > div > p': {
    marginBottom: theme.spacing(1.5),
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  cursor: 'pointer',
  marginRight: theme.spacing(1),
}));

const StyledDivider = styled('div')(({ theme }) => ({
  width: '100%',
  height: '1px',
  backgroundColor: theme.palette.divider,
  margin: theme.spacing(3, 0),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  width: theme.spacing(30),
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

type ProfileTabProps = {
  user: IUser;
};

export const ProfileTab = ({ user }: ProfileTabProps) => {
  const { profile, refetchProfile } = useProfile();
  const navigate = useNavigate();
  const { locationSettings, setLocationSettings } = useLocationSettings();
  const [currentLocale, setCurrentLocale] = useState<string>();

  // TODO - add more locales
  const [possibleLocales, setPossibleLocales] = useState([
    'en-US',
    'en-GB',
    'nb-NO',
    'sv-SE',
    'da-DK',
    'en-IN',
    'de',
    'cs',
    'pt-BR',
    'fr-FR',
  ]);

  useEffect(() => {
    const found = possibleLocales.find((locale) =>
      locale.toLowerCase().includes(locationSettings.locale.toLowerCase()),
    );

    setCurrentLocale(found);

    if (!found) {
      setPossibleLocales((prev) => [...prev, locationSettings.locale]);
    }
  }, [locationSettings]);

  const changeLocale = (e: SelectChangeEvent) => {
    const locale = e.target.value;
    setCurrentLocale(locale);
    setLocationSettings({ locale });
  };

  const productivityReportEmailEnabled = useUiFlag('productivityReportEmail');

  return (
    <>
      <StyledHeader>
        <StyledAvatar user={user} />
        <StyledInfo>
          <StyledInfoName>{user.name || user.username}</StyledInfoName>
          <Typography variant='body1'>{user.email}</Typography>
        </StyledInfo>
      </StyledHeader>
      <PageContent>
        <StyledSectionLabel>Access</StyledSectionLabel>
        <StyledAccess>
          <Box sx={{ width: '50%' }}>
            {Boolean(profile?.rootRole) && (
              <>
                <Typography variant='body2'>Your root role</Typography>
                <RoleBadge roleId={profile?.rootRole.id!}>
                  {profile?.rootRole.name}
                </RoleBadge>
              </>
            )}
          </Box>
          <Box>
            <Typography variant='body2'>Projects</Typography>
            {profile?.projects.length ? (
              profile?.projects.map((project) => (
                <Tooltip
                  key={project}
                  title='View project'
                  arrow
                  placement='bottom-end'
                  describeChild
                >
                  <StyledBadge
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/projects/${project}`);
                    }}
                    color='secondary'
                    icon={<TopicOutlinedIcon />}
                  >
                    {project}
                  </StyledBadge>
                </Tooltip>
              ))
            ) : (
              <Tooltip
                title='You are not assigned to any projects'
                arrow
                describeChild
              >
                <Badge>No projects</Badge>
              </Tooltip>
            )}
          </Box>
        </StyledAccess>
        <StyledDivider />
        <StyledSectionLabel>Date/Time Settings</StyledSectionLabel>
        <Typography variant='body2'>
          This is the format used across the system for time and date
        </Typography>
        <StyledFormControl variant='outlined' size='small'>
          <StyledInputLabel htmlFor='locale-select'>
            Date/Time formatting
          </StyledInputLabel>
          <Select
            id='locale-select'
            value={currentLocale || ''}
            native
            onChange={changeLocale}
            MenuProps={{
              style: {
                zIndex: 9999,
              },
            }}
          >
            {possibleLocales.map((locale) => {
              return (
                <option key={locale} value={locale}>
                  {locale}
                </option>
              );
            })}
          </Select>
        </StyledFormControl>
        {productivityReportEmailEnabled ? (
          <>
            <StyledDivider />
            <StyledSectionLabel>Email Settings</StyledSectionLabel>
            {profile?.subscriptions && (
              <ProductivityEmailSubscription
                status={
                  profile.subscriptions.includes('productivity-report')
                    ? 'subscribed'
                    : 'unsubscribed'
                }
                onChange={refetchProfile}
              />
            )}
          </>
        ) : null}
      </PageContent>
    </>
  );
};
