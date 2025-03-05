import type { ComponentProps } from 'react';
import { SvgIcon } from '@mui/material';
import { ReactComponent as Svg } from 'assets/icons/projectIconSmall.svg';

export const ProjectIcon = ({ ...props }: ComponentProps<typeof SvgIcon>) => (
  <SvgIcon
    component={Svg}
    viewBox={'0 0 14 10'}
    data-testid='UnleashProjectIcon'
    {...props}
  />
);
