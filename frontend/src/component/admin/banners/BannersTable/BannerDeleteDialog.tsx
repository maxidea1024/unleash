import { Dialogue } from 'component/common/Dialogue/Dialogue';
import type { IInternalBanner } from 'interfaces/banner';

type BannerDeleteDialogProps = {
  banner?: IInternalBanner;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (banner: IInternalBanner) => void;
};

export const BannerDeleteDialog = ({
  banner,
  open,
  setOpen,
  onConfirm,
}: BannerDeleteDialogProps) => (
  <Dialogue
    title='Delete banner?'
    open={open}
    primaryButtonText='Delete banner'
    secondaryButtonText='Cancel'
    onClick={() => onConfirm(banner!)}
    onClose={() => {
      setOpen(false);
    }}
  >
    <p>
      You are about to delete banner: <strong>{banner?.message}</strong>
    </p>
  </Dialogue>
);
