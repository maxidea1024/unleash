import {
  Box,
  FormControlLabel,
  styled,
  Switch,
  Typography,
} from '@mui/material';

type FeatureStrategyEnabledDisabledProps = {
  enabled: boolean;
  onToggleEnabled: () => void;
};

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.elevation1,
  padding: theme.spacing(2),
  borderRadius: `${theme.shape.borderRadiusMedium}px`,
}));

export const FeatureStrategyEnabledDisabled = ({
  enabled,
  onToggleEnabled,
}: FeatureStrategyEnabledDisabledProps) => {
  return (
    <StyledBox>
      <Typography>Strategy Status</Typography>
      <FormControlLabel
        control={
          <Switch name='enabled' onChange={onToggleEnabled} checked={enabled} />
        }
        label='Enabled'
      />
    </StyledBox>
  );
};
