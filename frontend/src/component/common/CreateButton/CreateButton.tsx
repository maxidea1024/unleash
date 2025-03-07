import PermissionButton, {
  type PermissionButtonProps,
} from 'component/common/PermissionButton/PermissionButton';

interface ICreateButtonProps extends PermissionButtonProps {
  name: string;
}

export const CreateButton = ({ name, ...rest }: ICreateButtonProps) => {
  return (
    <PermissionButton type='submit' {...rest}>
      Create {name}
    </PermissionButton>
  );
};
