import { Typography, styled } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
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
      <ConditionallyRender
        condition={titleHasChanged}
        show={
          <Truncated>
            <Typography component='del' color='text.secondary'>
              {previousName}
            </Typography>
          </Truncated>
        }
      />
      <ConditionallyRender
        condition={Boolean(newName)}
        show={
          <Truncated>
            <Typography>{newName}</Typography>
          </Truncated>
        }
      />
    </>
  );
};
