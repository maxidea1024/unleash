import type { FC } from 'react';
import ConfirmUserEmail from './ConfirmUserEmail/ConfirmUserEmail';
import ConfirmUserLink from './ConfirmUserLink/ConfirmUserLink';

type ConfirmUserAddedProps = {
  open: boolean;
  closeConfirm: () => void;
  inviteLink: string;
  emailSent: boolean;
};

const ConfirmUserAdded: FC<ConfirmUserAddedProps> = ({
  open,
  closeConfirm,
  emailSent,
  inviteLink,
}) => {
  if (emailSent) {
    return (
      <ConfirmUserEmail
        open={open}
        closeConfirm={closeConfirm}
        inviteLink={inviteLink}
      />
    );
  }

  return (
    <ConfirmUserLink
      open={open}
      closeConfirm={closeConfirm}
      inviteLink={inviteLink}
    />
  );
};

export default ConfirmUserAdded;
