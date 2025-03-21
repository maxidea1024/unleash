import { StyledHelpText, StyledTitle } from '../IntegrationForm.styles';
import { Box, Button, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  columnGap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
}));

type AddonInstallProps = {
  url: string;
  title?: string;
  helpText?: string;
};

export const IntegrationInstall = ({
  url,
  title = 'Install addon',
  helpText = 'Click this button to install this integration.',
}: AddonInstallProps) => {
  return (
    <Box>
      <StyledTitle>{title}</StyledTitle>
      <StyledBox>
        <Box>
          <StyledHelpText>{helpText}</StyledHelpText>
        </Box>
        <Box>
          <Button
            type='button'
            variant='contained'
            component={Link}
            target='_blank'
            rel='noopener noreferrer'
            to={url}
          >
            Install&nbsp;&amp;&nbsp;connect
          </Button>
        </Box>
      </StyledBox>
    </Box>
  );
};
