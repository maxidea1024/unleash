import type { IApiToken } from 'hooks/api/getters/useApiTokens/useApiTokens';
import useToast from 'hooks/useToast';
import copy from 'copy-to-clipboard';
import FileCopy from '@mui/icons-material/FileCopy';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import type { FC } from 'react';

type CopyApiTokenButtonProps = {
  token: IApiToken;
  permission: string;
  project?: string;
  track?: () => void;
};

export const CopyApiTokenButton: FC<CopyApiTokenButtonProps> = ({
  token,
  project,
  permission,
  track,
}) => {
  const { setToastData } = useToast();

  const copyToken = (value: string) => {
    if (copy(value)) {
      setToastData({
        type: 'success',
        title: `Token copied to clipboard`,
      });

      if (track && typeof track === 'function') {
        track();
      }
    }
  };

  return (
    <PermissionIconButton
      permission={permission}
      projectId={project}
      tooltipProps={{ title: 'Copy token', arrow: true }}
      onClick={() => copyToken(token.secret)}
      size='large'
    >
      <FileCopy />
    </PermissionIconButton>
  );
};
