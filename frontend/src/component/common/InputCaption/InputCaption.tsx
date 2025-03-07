import { Box } from '@mui/material';

type InputCaptionProps = {
  text?: string;
};

export const InputCaption = ({ text }: InputCaptionProps) => {
  if (!text) {
    return null;
  }

  return (
    <Box
      sx={(theme) => ({
        color: theme.palette.text.secondary,
        fontSize: theme.fontSizes.smallerBody,
        marginTop: theme.spacing(1),
      })}
    >
      {text}
    </Box>
  );
};
