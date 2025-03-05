import type { ReactNode } from 'react';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { MainLayout } from '../MainLayout/MainLayout';

type LayoutPickerProps = {
  children: ReactNode;
  isStandalone?: boolean;
};

export const LayoutPicker = ({ isStandalone, children }: LayoutPickerProps) => (
  <ConditionallyRender
    condition={isStandalone === true}
    show={children}
    elseShow={<MainLayout>{children}</MainLayout>}
  />
);
