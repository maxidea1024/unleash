import type { ReactNode } from 'react';
import { useUiFlag } from 'hooks/useUiFlag';
import { useFeedback } from 'component/feedbackNew/useFeedback';
import ReviewsOutlined from '@mui/icons-material/ReviewsOutlined';
import {
  Button,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { PageHeader } from 'component/common/PageHeader/PageHeader';

const StyledActionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

const StyledActionButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

const StyledExternalActionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const StyledActionsSmallScreen = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

type DashboardHeaderProps = {
  actions?: ReactNode;
};

export const InsightsHeader = ({ actions }: DashboardHeaderProps) => {
  const showInactiveUsers = useUiFlag('showInactiveUsers');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { openFeedback } = useFeedback(
    'insights',
    'automatic',
    showInactiveUsers ? 'withInactiveUsers' : 'withoutInactiveUsers',
  );

  const createFeedbackContext = () => {
    openFeedback({
      title: 'How easy was it to use insights?',
      positiveLabel: 'What do you like most about insights?',
      areasForImprovementsLabel: 'What should be improved in insights?',
    });
  };

  return (
    <>
      <PageHeader
        title='Insights'
        titleElement={
          <Typography
            variant='h1'
            component='div'
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing(1),
            })}
          >
            <span>Insights</span>{' '}
          </Typography>
        }
        actions={
          <StyledActionsContainer>
            {!isSmallScreen && (
              <StyledExternalActionsContainer>
                {actions}
              </StyledExternalActionsContainer>
            )}
            <StyledActionButtons>
              <Button
                startIcon={<ReviewsOutlined />}
                variant='outlined'
                onClick={createFeedbackContext}
              >
                Provide feedback
              </Button>
            </StyledActionButtons>
          </StyledActionsContainer>
        }
      />
      {isSmallScreen && (
        <StyledActionsSmallScreen>{actions}</StyledActionsSmallScreen>
      )}
    </>
  );
};
