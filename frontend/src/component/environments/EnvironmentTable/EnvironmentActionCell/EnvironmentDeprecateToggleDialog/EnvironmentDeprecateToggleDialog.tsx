import { Alert } from '@mui/material';
import type React from 'react';
import type { IEnvironment } from 'interfaces/environments';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import { EnvironmentTableSingle } from 'component/environments/EnvironmentTable/EnvironmentTableSingle';

type EnvironmentDeprecateToggleDialogProps = {
  environment: IEnvironment;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
};

export const EnvironmentDeprecateToggleDialog = ({
  environment,
  open,
  setOpen,
  onConfirm,
}: EnvironmentDeprecateToggleDialogProps) => {
  const { enabled } = environment;
  const actionName = enabled ? 'Deprecate' : 'Undeprecate';

  return (
    <Dialogue
      title={`${actionName} environment?`}
      open={open}
      primaryButtonText={actionName}
      secondaryButtonText='Close'
      onClick={onConfirm}
      onClose={() => {
        setOpen(false);
      }}
    >
      {enabled ? (
        <Alert severity='info'>
          Deprecating an environment will mark it as deprecated. Deprecated
          environments are set as not visible by default for new projects.
          Project owners are still able to override this setting in the project.
          This environment will still be visible in any current projects.
        </Alert>
      ) : (
        <Alert severity='info'>
          Undeprecating an environment will no longer mark it as deprecated. An
          undeprecated environment will be set as visible by default for new
          projects.
        </Alert>
      )}
      <EnvironmentTableSingle environment={environment} />
    </Dialogue>
  );
};
