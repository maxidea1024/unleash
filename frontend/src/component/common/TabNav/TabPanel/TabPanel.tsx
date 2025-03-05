import type { ReactNode } from 'react';

type TabPanelProps = {
  value: number;
  index: number;
  children: ReactNode;
};

export const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <div
    role='tabpanel'
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && children}
  </div>
);
