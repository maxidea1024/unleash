import { APPLY_CHANGE_REQUEST } from '../../../providers/AccessProvider/permissions';
import PermissionButton from '../../../common/PermissionButton/PermissionButton';
import {
  ChangeRequestScheduledDialog,
  type ChangeRequestScheduledDialogProps,
} from './ChangeRequestScheduledDialog';

type ChangeRequestApplyScheduledDialogueProps = Omit<
  ChangeRequestScheduledDialogProps,
  'message' | 'title' | 'primaryButtonText' | 'permissionButton'
> & {
  projectId: string;
  environment: string;
};

export const ChangeRequestApplyScheduledDialogue = ({
  projectId,
  environment,
  disabled,
  onConfirm,
  ...rest
}: ChangeRequestApplyScheduledDialogueProps) => {
  const message =
    'Applying the changes now means the scheduled time will be ignored';
  const title = 'Apply changes';
  const primaryButtonText = 'Apply changes now';

  return (
    <ChangeRequestScheduledDialog
      message={message}
      title={title}
      primaryButtonText={primaryButtonText}
      onConfirm={onConfirm}
      permissionButton={
        <PermissionButton
          variant='contained'
          onClick={() => onConfirm()}
          projectId={projectId}
          permission={APPLY_CHANGE_REQUEST}
          environmentId={environment}
          disabled={disabled}
        >
          Apply changes now
        </PermissionButton>
      }
      {...rest}
    />
  );
};

type ChangeRequestRejectScheduledDialogueProps = Omit<
  ChangeRequestScheduledDialogProps,
  'message' | 'title' | 'primaryButtonText'
>;

export const ChangeRequestRejectScheduledDialogue = ({
  ...rest
}: ChangeRequestRejectScheduledDialogueProps) => {
  const message =
    'Rejecting this change request will delete its schedule and it can no longer be rescheduled or applied.';
  const title = 'Reject changes';
  const primaryButtonText = 'Reject changes';

  return (
    <ChangeRequestScheduledDialog
      message={message}
      title={title}
      primaryButtonText={primaryButtonText}
      {...rest}
    />
  );
};
