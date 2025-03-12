import { styled } from '@mui/material';

const StyledSpan = styled('span')(({ theme }) => ({
  fontSize: theme.fontSizes.smallBody,
  marginLeft: theme.spacing(1),
}));

export const GridColLink = ({ children }: { children?: React.ReactNode }) => {
  return <StyledSpan>({children})</StyledSpan>;
};
