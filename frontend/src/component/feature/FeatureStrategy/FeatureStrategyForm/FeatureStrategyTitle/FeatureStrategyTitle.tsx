import { Box, Typography } from '@mui/material';
import Input from 'component/common/Input/Input';

type FeatureStrategyTitleProps = {
  title: string;
  setTitle: (title: string) => void;
};

export const FeatureStrategyTitle = ({
  title,
  setTitle,
}: FeatureStrategyTitleProps) => {
  return (
    <Box sx={{ paddingBottom: (theme) => theme.spacing(2) }}>
      <Typography
        sx={{
          paddingBottom: (theme) => theme.spacing(2),
        }}
      >
        What would you like to call this strategy? (optional)
      </Typography>
      <Input
        label='Strategy title'
        id='title-input'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ width: '100%' }}
      />
    </Box>
  );
};
