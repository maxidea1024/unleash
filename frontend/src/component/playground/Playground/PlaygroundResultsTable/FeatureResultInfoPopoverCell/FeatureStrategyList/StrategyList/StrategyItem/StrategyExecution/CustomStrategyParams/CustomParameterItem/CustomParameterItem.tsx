import { Box, styled, Typography, useTheme } from '@mui/material';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import StringTruncator from 'component/common/StringTruncator/StringTruncator';

const StyledWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 3),
  borderRadius: theme.shape.borderRadiusMedium,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 2,
}));

type CustomParameterItemProps = {
  text: string;
  input?: string | null;
  isRequired?: boolean;
};

export const CustomParameterItem = ({
  text,
  input = null,
  isRequired = false,
}: CustomParameterItemProps) => {
  const theme = useTheme();

  const color = input === null ? 'error' : 'neutral';
  const requiredError = isRequired && input === null;

  return (
    <StyledWrapper>
      <Typography
        variant='subtitle1'
        color={theme.palette[color].main}
        sx={{ minWidth: 118 }}
      >
        {`${input === null ? 'no value' : input}`}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {requiredError ? (
            <>
              <Typography component='span' color={theme.palette.error.main}>
                {' required parameter '}
              </Typography>
              <StringTruncator maxWidth='300' text={text} maxLength={50} />
              <Typography component='span' color={theme.palette.error.main}>
                {' is not set '}
              </Typography>
            </>
          ) : (
            <>
              <Typography component='span' color='text.disabled'>
                {' set on parameter '}
              </Typography>
              <StringTruncator maxWidth='300' text={text} maxLength={50} />
            </>
          )}
        </Box>
      </Box>
      {requiredError ? <CancelOutlined color={'error'} /> : <div />}
    </StyledWrapper>
  );
};
