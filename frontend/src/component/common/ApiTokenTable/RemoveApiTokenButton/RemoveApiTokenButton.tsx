import Delete from '@mui/icons-material/Delete';
import { styled } from '@mui/material';
import type { IApiToken } from 'hooks/api/getters/useApiTokens/useApiTokens';
import { useState } from 'react';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import useToast from 'hooks/useToast';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { formatUnknownError } from 'utils/formatUnknownError';

const StyledUl = styled('ul')({
  marginBottom: 0,
});

type RemoveApiTokenButtonProps = {
  token: IApiToken;
  permission: string;
  onRemove: () => Promise<void>;
  project?: string;
};

export const RemoveApiTokenButton = ({
  token,
  permission,
  onRemove,
  project,
}: RemoveApiTokenButtonProps) => {
  const [open, setOpen] = useState(false);
  const { setToastData, setToastApiError } = useToast();

  const onRemoveToken = async () => {
    try {
      await onRemove();
      setOpen(false);

      setToastData({
        type: 'success',
        title: 'API token removed',
      });
    } catch (error: unknown) {
      setToastApiError(formatUnknownError(error));
    }
  };

  return (
    <>
      <PermissionIconButton
        permission={permission}
        projectId={project}
        tooltipProps={{ title: 'Delete token', arrow: true }}
        onClick={() => setOpen(true)}
        size='large'
      >
        <Delete />
      </PermissionIconButton>
      <Dialogue
        open={open}
        onClick={onRemoveToken}
        onClose={() => setOpen(false)}
        title='Confirm deletion'
      >
        <div>
          Are you sure you want to delete the following API token?
          <br />
          <StyledUl>
            <li>
              <strong>username</strong>: <code>{token.username}</code>
            </li>
            <li>
              <strong>type</strong>: <code>{token.type}</code>
            </li>
            <li>
              <strong>environment</strong>: <code>{token.environment}</code>
            </li>
          </StyledUl>
        </div>
      </Dialogue>
    </>
  );
};
