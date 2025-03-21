import { Typography } from '@mui/material';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import { usePersonalAPITokensApi } from 'hooks/api/actions/usePersonalAPITokensApi/usePersonalAPITokensApi';
import { usePersonalAPITokens } from 'hooks/api/getters/usePersonalAPITokens/usePersonalAPITokens';
import useToast from 'hooks/useToast';
import type { IPersonalAPIToken } from 'interfaces/personalAPIToken';
import { formatUnknownError } from 'utils/formatUnknownError';

type DeletePersonalAPITokenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  token?: IPersonalAPIToken;
};

export const DeletePersonalAPIToken = ({
  open,
  setOpen,
  token,
}: DeletePersonalAPITokenProps) => {
  const { refetchTokens } = usePersonalAPITokens();
  const { deletePersonalAPIToken } = usePersonalAPITokensApi();
  const { setToastData, setToastApiError } = useToast();

  const onRemoveClick = async () => {
    if (token) {
      try {
        await deletePersonalAPIToken(token?.id);

        refetchTokens();

        setOpen(false);

        setToastData({
          title: 'Token deleted successfully',
          type: 'success',
        });
      } catch (error: unknown) {
        setToastApiError(formatUnknownError(error));
      }
    }
  };

  return (
    <Dialogue
      open={open}
      primaryButtonText='Delete token'
      secondaryButtonText='Cancel'
      onClick={onRemoveClick}
      onClose={() => {
        setOpen(false);
      }}
      title='Delete token?'
    >
      <Typography>
        Any applications or scripts using this token "
        <strong>{token?.description}</strong>" will no longer be able to access
        the Ganpa API. You cannot undo this action.
      </Typography>
    </Dialogue>
  );
};
