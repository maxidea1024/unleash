import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import UnfoldMoreOutlined from '@mui/icons-material/UnfoldMoreOutlined';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import classnames from 'classnames';
import type { Theme } from '@mui/material';

type SortArrowProps = {
  isSorted?: boolean;
  isDesc?: boolean;
  className?: string;
};

const iconStyle = (theme: Theme) => ({
  marginLeft: theme.spacing(0.25),
  marginRight: theme.spacing(-0.5),
  fontSize: theme.fontSizes.mainHeader,
  verticalAlign: 'middle',
});

export const SortArrow = ({
  isSorted: sorted,
  isDesc: desc = false,
  className,
}: SortArrowProps) => (
  <ConditionallyRender
    condition={Boolean(sorted)}
    show={
      <ConditionallyRender
        condition={Boolean(desc)}
        show={
          <KeyboardArrowDown
            sx={(theme) => ({
              ...iconStyle(theme),
            })}
            className={className}
            fontSize='inherit'
          />
        }
        elseShow={
          <KeyboardArrowUp
            sx={(theme) => ({
              ...iconStyle(theme),
            })}
            className={className}
            fontSize='inherit'
          />
        }
      />
    }
    elseShow={
      <UnfoldMoreOutlined
        sx={(theme) => ({
          ...iconStyle(theme),
        })}
        className={classnames(className, 'hover-only')}
        fontSize='inherit'
      />
    }
  />
);
