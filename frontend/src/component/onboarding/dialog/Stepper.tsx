import { styled } from '@mui/material';

const StepContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

const Step = styled('div')(({ theme }) => ({
  background: theme.palette.background.application,
  borderRadius: theme.shape.borderRadius,
  width: theme.spacing(7),
  height: theme.spacing(1),
}));

const ActiveStep = styled('div')(({ theme }) => ({
  background: theme.palette.background.sidebar,
  borderRadius: theme.shape.borderRadius,
  width: theme.spacing(7),
  height: theme.spacing(1),
}));

type StepperProps = {
  active: number;
  steps: number;
};

export const Stepper = ({ active, steps }: StepperProps) => {
  return (
    <StepContainer>
      {Array.from({ length: steps }, (_, index) =>
        index === active ? <ActiveStep key={index} /> : <Step key={index} />,
      )}
    </StepContainer>
  );
};
