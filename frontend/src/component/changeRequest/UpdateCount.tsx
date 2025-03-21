import { Box, Typography } from '@mui/material';

type UpdateCountProps = {
  featuresCount: number;
  segmentsCount: number;
};

export const UpdateCount = ({
  featuresCount,
  segmentsCount,
}: UpdateCountProps) => (
  <Box component={'span'} sx={{ display: 'inline', pl: 0.5 }}>
    <Typography
      component='span'
      variant='body2'
      fontWeight='bold'
      display='inline'
    >
      {featuresCount} {featuresCount === 1 ? 'feature flag' : 'feature flags'}
    </Typography>
    {segmentsCount > 0 && (
      <>
        <Typography component='span' variant='body2'>
          {' and '}
        </Typography>
        <Typography
          component='span'
          variant='body2'
          fontWeight='bold'
          display='inline'
        >
          {segmentsCount} {segmentsCount === 1 ? 'segment' : 'segments'}
        </Typography>
      </>
    )}
  </Box>
);
