import type { ReactNode } from 'react';
import { MainLayout } from '../MainLayout/MainLayout';

type LayoutPickerProps = {
  children: ReactNode;
  isStandalone?: boolean;
};

export const LayoutPicker = ({ isStandalone, children }: LayoutPickerProps) => (
  <>{isStandalone ? children : <MainLayout>{children}</MainLayout>}</>
);
