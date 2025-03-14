import { styled } from '@mui/material';

const StyledContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.codebox,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusMedium,
  position: 'relative',
  maxHeight: '500px',
  overflow: 'auto',
}));

const StyledCode = styled('pre')(({ theme }) => ({
  margin: 0,
  wordBreak: 'break-all',
  whiteSpace: 'pre-wrap',
  color: theme.palette.common.white,
  fontSize: theme.fontSizes.smallBody,
}));

type CodeboxProps = {
  text: string;
};

const Codebox = ({ text }: CodeboxProps) => {
  return (
    <StyledContainer>
      <StyledCode>{text}</StyledCode>
    </StyledContainer>
  );
};

export default Codebox;
