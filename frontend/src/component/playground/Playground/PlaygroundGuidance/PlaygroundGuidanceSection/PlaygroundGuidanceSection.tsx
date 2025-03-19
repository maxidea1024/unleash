import { Box, Typography } from '@mui/material';
import { GuidanceIndicator } from 'component/common/GuidanceIndicator/GuidanceIndicator';

type PlaygroundGuidanceSectionProps = {
  headerText: string;
  bodyText?: string;
  sectionNumber: string;
};

export const PlaygroundGuidanceSection = ({
  headerText,
  bodyText,
  sectionNumber,
}: PlaygroundGuidanceSectionProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      mt: 2,
      flexDirection: 'column',
    }}
  >
    <Box sx={{ display: 'flex' }}>
      <Box>
        <GuidanceIndicator>{sectionNumber}</GuidanceIndicator>
      </Box>
      <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
          {headerText}
        </Typography>
        {Boolean(bodyText) && (
          <Typography variant='body1' sx={{ mt: 1 }}>
            {bodyText}
          </Typography>
        )}
      </Box>
    </Box>
  </Box>
);
