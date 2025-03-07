import { Dialogue } from 'component/common/Dialogue/Dialogue';
import type { IActionSet } from 'interfaces/action';

type ProjectActionsDeleteDialogProps = {
  action?: IActionSet;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (action: IActionSet) => void;
};

export const ProjectActionsDeleteDialog = ({
  action,
  open,
  setOpen,
  onConfirm,
}: ProjectActionsDeleteDialogProps) => (
  <Dialogue
    title='Delete action?'
    open={open}
    primaryButtonText='Delete action'
    secondaryButtonText='Cancel'
    onClick={() => onConfirm(action!)}
    onClose={() => {
      setOpen(false);
    }}
  >
    <p>
      You are about to delete action: <strong>{action?.name}</strong>
    </p>
  </Dialogue>
);
