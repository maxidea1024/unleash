import type { ReactNode } from 'react';
import { Button, type ButtonProps, Icon } from '@mui/material';

type DropdownButtonProps = {
  label: string;
  id?: string;
  title?: ButtonProps['title'];
  className?: string;
  icon?: ReactNode;
  startIcon?: ButtonProps['startIcon'];
  style?: ButtonProps['style'];
  onClick: ButtonProps['onClick'];
};

export const DropdownButton = ({
  label,
  icon,
  ...rest
}: DropdownButtonProps) => (
  <Button {...rest} endIcon={<Icon>{icon}</Icon>}>
    {label}
  </Button>
);
