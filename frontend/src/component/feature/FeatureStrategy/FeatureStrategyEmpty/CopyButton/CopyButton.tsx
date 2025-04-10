import { type MouseEvent, useContext, useState } from 'react';
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import Lock from '@mui/icons-material/Lock';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import type { IFeatureEnvironment } from 'interfaces/featureToggle';
import AccessContext from 'contexts/AccessContext';
import { CREATE_FEATURE_STRATEGY } from 'component/providers/AccessProvider/permissions';

type CopyButtonProps = {
  environmentId: IFeatureEnvironment['name'];
  environments: IFeatureEnvironment['name'][];
  onClick: (environmentId: string) => void;
};

export const CopyButton = ({
  environmentId,
  environments,
  onClick,
}: CopyButtonProps) => {
  const projectId = useRequiredPathParam('projectId');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { hasAccess } = useContext(AccessContext);
  const enabled = environments.some((environment) =>
    hasAccess(CREATE_FEATURE_STRATEGY, projectId, environment),
  );

  return (
    <div>
      <Tooltip title={enabled ? '' : '(Access denied)'}>
        <div>
          <Button
            id={`copy-all-strategies-${environmentId}`}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              setAnchorEl(event.currentTarget);
            }}
            disabled={!enabled}
            variant='outlined'
          >
            Copy from another environment
          </Button>
        </div>
      </Tooltip>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        MenuListProps={{
          'aria-labelledby': `copy-all-strategies-${environmentId}`,
        }}
      >
        {environments.map((environment) => {
          const access = hasAccess(
            CREATE_FEATURE_STRATEGY,
            projectId,
            environment,
          );

          return (
            <Tooltip
              title={
                access
                  ? ''
                  : "You don't have access to add a strategy to this environment"
              }
              key={environment}
            >
              <div>
                <MenuItem
                  onClick={() => onClick(environment)}
                  disabled={!access}
                >
                  {!access && (
                    <ListItemIcon>
                      <Lock fontSize='small' />
                    </ListItemIcon>
                  )}
                  <ListItemText>Copy from {environment}</ListItemText>
                </MenuItem>
              </div>
            </Tooltip>
          );
        })}
      </Menu>
    </div>
  );
};
