import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import UnfoldMoreOutlined from '@mui/icons-material/UnfoldMoreOutlined';
import classnames from 'classnames';
import type { Theme } from '@mui/material';

const iconStyle = (theme: Theme) => ({
  marginLeft: theme.spacing(0.25),
  marginRight: theme.spacing(-0.5),
  fontSize: theme.fontSizes.mainHeader,
  verticalAlign: 'middle',
});

type SortArrowProps = {
  isSorted?: boolean;
  isDesc?: boolean;
  className?: string;
};

export const SortArrow = ({
  isSorted: sorted,
  isDesc: desc = false,
  className,
}: SortArrowProps) =>
  Boolean(sorted) ? (
    Boolean(desc) ? (
      <KeyboardArrowDown
        sx={(theme) => ({
          ...iconStyle(theme),
        })}
        className={className}
        fontSize='inherit'
      />
    ) : (
      <KeyboardArrowUp
        sx={(theme) => ({
          ...iconStyle(theme),
        })}
        className={className}
        fontSize='inherit'
      />
    )
  ) : (
    <UnfoldMoreOutlined
      sx={(theme) => ({
        ...iconStyle(theme),
      })}
      className={classnames(className, 'hover-only')}
      fontSize='inherit'
    />
  );
