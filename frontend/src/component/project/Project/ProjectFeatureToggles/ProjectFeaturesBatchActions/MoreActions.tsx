import { type FC, useState } from 'react';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import { PermissionHOC } from 'component/common/PermissionHOC/PermissionHOC';
import { UPDATE_FEATURE } from 'component/providers/AccessProvider/permissions';
import MoreVert from '@mui/icons-material/MoreVert';
import WatchLater from '@mui/icons-material/WatchLater';
import type { FeatureSchema } from 'openapi';
import useProjectApi from 'hooks/api/actions/useProjectApi/useProjectApi';
import useToast from 'hooks/useToast';
import { formatUnknownError } from 'utils/formatUnknownError';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';
import { MORE_BATCH_ACTIONS } from 'utils/testIds';

type MoreActionsProps = {
  projectId: string;
  data: FeatureSchema[];
  onChange?: () => void;
};

const menuId = 'selection-actions-menu';

export const MoreActions = ({
  projectId,
  data,
  onChange,
}: MoreActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { staleFeatures } = useProjectApi();
  const { setToastData, setToastApiError } = useToast();
  const { trackEvent } = usePlausibleTracker();

  const open = Boolean(anchorEl);
  const selectedIds = data.map(({ name }) => name);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const hasStale = data.some(({ stale }) => stale === true);
  const hasUnstale = data.some(({ stale }) => stale === false);

  const onMarkAsStale = async () => {
    try {
      handleClose();
      await staleFeatures(projectId, selectedIds);
      onChange?.();
      setToastData({
        title: 'State updated',
        text: 'Feature flags marked as stale',
        type: 'success',
      });
      trackEvent('batch_operations', {
        props: {
          eventType: 'features staled',
        },
      });
    } catch (error: unknown) {
      setToastApiError(formatUnknownError(error));
    }
  };

  const onUnmarkAsStale = async () => {
    try {
      handleClose();
      await staleFeatures(projectId, selectedIds, false);
      onChange?.();
      setToastData({
        title: 'State updated',
        text: 'Feature flags unmarked as stale',
        type: 'success',
      });
      trackEvent('batch_operations', {
        props: {
          eventType: 'features unstaled',
        },
      });
    } catch (error: unknown) {
      setToastApiError(formatUnknownError(error));
    }
  };

  return (
    <>
      <Tooltip title='More bulk actions' arrow describeChild>
        <IconButton
          id={menuId}
          aria-controls={open ? menuId : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          type='button'
          data-testid={MORE_BATCH_ACTIONS}
        >
          <MoreVert />
        </IconButton>
      </Tooltip>
      <Popover
        id={`${menuId}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        disableScrollLock={true}
        PaperProps={{
          sx: (theme) => ({
            borderRadius: `${theme.shape.borderRadius}px`,
            padding: theme.spacing(1, 1.5),
          }),
        }}
      >
        <MenuList aria-labelledby={`${menuId}-menu`}>
          <PermissionHOC projectId={projectId} permission={UPDATE_FEATURE}>
            {({ hasAccess }) => (
              <>
                {hasUnstale && (
                  <MenuItem
                    onClick={onMarkAsStale}
                    disabled={!hasAccess}
                    sx={{
                      borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                    }}
                  >
                    <ListItemIcon>
                      <WatchLater />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant='body2'>Mark as stale</Typography>
                    </ListItemText>
                  </MenuItem>
                )}
                {hasStale && (
                  <MenuItem
                    onClick={onUnmarkAsStale}
                    disabled={!hasAccess}
                    sx={{
                      borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                    }}
                  >
                    <ListItemIcon>
                      <WatchLater />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant='body2'>Un-mark as stale</Typography>
                    </ListItemText>
                  </MenuItem>
                )}
              </>
            )}
          </PermissionHOC>
        </MenuList>
      </Popover>
    </>
  );
};
