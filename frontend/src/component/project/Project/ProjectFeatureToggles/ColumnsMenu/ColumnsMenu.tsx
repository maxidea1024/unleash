import { useEffect, useState } from 'react';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  Popover,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ColumnIcon from '@mui/icons-material/ViewWeek';
import CloseIcon from '@mui/icons-material/Close';
import {
  StyledBoxContainer,
  StyledBoxMenuHeader,
  StyledCheckbox,
  StyledDivider,
  StyledIconButton,
  StyledMenuItem,
} from './ColumnsMenu.styles';

type ColumnsMenuProps = {
  allColumns: {
    Header?: string | any;
    id: string;
    isVisible: boolean;
    toggleHidden: (state: boolean) => void;
    hideInMenu?: boolean;
  }[];
  staticColumns?: string[];
  dividerBefore?: string[];
  dividerAfter?: string[];
  isCustomized?: boolean;
  setHiddenColumns: (hiddenColumns: string[]) => void;
  onCustomize?: () => void;
};

const columnNameMap: Record<string, string> = {
  favorite: 'Favorite',
};

export const ColumnsMenu = ({
  allColumns,
  staticColumns = [],
  dividerBefore = [],
  dividerAfter = [],
  isCustomized = false,
  onCustomize,
  setHiddenColumns,
}: ColumnsMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isTinyScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    if (isCustomized) {
      return;
    }

    const setVisibleColumns = (
      columns: string[],
      environmentsToShow: number = 0,
    ) => {
      const visibleEnvColumns = allColumns
        .filter(({ id }) => id.startsWith('environment:') !== false)
        .map(({ id }) => id)
        .slice(0, environmentsToShow);
      const hiddenColumns = allColumns
        .map(({ id }) => id)
        .filter((id) => !columns.includes(id))
        .filter((id) => !staticColumns.includes(id))
        .filter((id) => !visibleEnvColumns.includes(id));
      setHiddenColumns(hiddenColumns);
    };

    if (isTinyScreen) {
      return setVisibleColumns(['createdAt']);
    }
    if (isSmallScreen) {
      return setVisibleColumns(['createdAt'], 1);
    }
    if (isMediumScreen) {
      return setVisibleColumns(['type', 'createdAt'], 1);
    }
    setVisibleColumns(['lastSeenAt', 'type', 'createdAt'], 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTinyScreen, isSmallScreen, isMediumScreen]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const id = `columns-menu`;
  const menuId = `columns-menu-list-${id}`;

  return (
    <StyledBoxContainer>
      <Tooltip title='Select columns' arrow describeChild>
        <StyledIconButton
          id={id}
          aria-controls={isOpen ? menuId : undefined}
          aria-haspopup='true'
          aria-expanded={isOpen ? 'true' : undefined}
          onClick={handleClick}
          type='button'
          size='large'
          data-loading
        >
          <ColumnIcon />
        </StyledIconButton>
      </Tooltip>

      <Popover
        id={menuId}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableScrollLock={true}
        PaperProps={{
          sx: (theme) => ({
            borderRadius: theme.shape.borderRadius,
            paddingBottom: theme.spacing(2),
          }),
        }}
      >
        <StyledBoxMenuHeader>
          <Typography variant='body2'>
            <strong>Columns</strong>
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </StyledBoxMenuHeader>
        <MenuList>
          {allColumns
            .filter(({ hideInMenu }) => !hideInMenu)
            .map((column) => [
              dividerBefore.includes(column.id) && <StyledDivider />,
              <StyledMenuItem
                onClick={() => {
                  column.toggleHidden(column.isVisible);
                  onCustomize?.();
                }}
                disabled={staticColumns.includes(column.id)}
              >
                <ListItemIcon>
                  <StyledCheckbox
                    edge='start'
                    checked={column.isVisible}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': column.id,
                    }}
                    size='medium'
                  />
                </ListItemIcon>
                <ListItemText
                  id={column.id}
                  primary={
                    <Typography variant='body2'>
                      {typeof column.Header === 'string' && column.Header
                        ? column.Header
                        : columnNameMap[column.id] || column.id}
                    </Typography>
                  }
                />
              </StyledMenuItem>,
              dividerAfter.includes(column.id) && <StyledDivider />,
            ])}
        </MenuList>
      </Popover>
    </StyledBoxContainer>
  );
};
