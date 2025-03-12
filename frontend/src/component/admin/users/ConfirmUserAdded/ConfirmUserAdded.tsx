import ConfirmUserEmail from './ConfirmUserEmail/ConfirmUserEmail';
import ConfirmUserLink from './ConfirmUserLink/ConfirmUserLink';

type ConfirmUserAddedProps = {
  open: boolean;
  closeConfirm: () => void;
  inviteLink: string;
  emailSent: boolean;
};

const ConfirmUserAdded = ({
  open,
  closeConfirm,
  emailSent,
  inviteLink,
}: ConfirmUserAddedProps) => {
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
