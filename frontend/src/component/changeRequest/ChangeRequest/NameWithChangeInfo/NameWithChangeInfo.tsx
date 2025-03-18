import { Typography, styled } from '@mui/material';
import { textTruncated } from 'themes/themeStyles';

const Truncated = styled('div')(() => ({
  ...textTruncated,
  maxWidth: 500,
}));

type NameWithChangeInfoProps = {
  newName: string | undefined;
  previousName: string | undefined;
};

export const NameWithChangeInfo = ({
  newName,
  previousName,
}: NameWithChangeInfoProps) => {
  const titleHasChanged = Boolean(previousName && previousName !== newName);

  return (
    <>
      {titleHasChanged && (
        <Truncated>
          <Typography component='del' color='text.secondary'>
            {previousName}
          </Typography>
        </Truncated>
      )}
      {Boolean(newName) && (
        <Truncated>
          <Typography>{newName}</Typography>
        </Truncated>
      )}
    </>
  );
};
