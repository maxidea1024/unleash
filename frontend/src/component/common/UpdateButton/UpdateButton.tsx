import PermissionButton, {
  type PermissionButtonProps,
} from 'component/common/PermissionButton/PermissionButton';

export const UpdateButton = ({
  children = 'Save',
  ...rest
}: PermissionButtonProps) => {
  return (
    <PermissionButton type='submit' {...rest}>
      {children}
    </PermissionButton>
  );
};
