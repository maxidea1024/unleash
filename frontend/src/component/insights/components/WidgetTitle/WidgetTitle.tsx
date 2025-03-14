import type { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { HelpIcon } from 'component/common/HelpIcon/HelpIcon';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

type WidgetTitleProps = {
  title: ReactNode;
  tooltip?: ReactNode;
};

export const WidgetTitle = ({ title, tooltip }: WidgetTitleProps) => (
  <Typography
    variant='h3'
    sx={(theme) => ({
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(0.5),
    })}
  >
    {title}
    {tooltip && (
      <HelpIcon htmlTooltip tooltip={tooltip}>
        <InfoOutlined />
      </HelpIcon>
    )}
  </Typography>
);
