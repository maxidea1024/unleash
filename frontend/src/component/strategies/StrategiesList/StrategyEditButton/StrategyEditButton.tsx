import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import Edit from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';
import { UPDATE_STRATEGY } from 'component/providers/AccessProvider/permissions';
import type { IStrategy } from 'interfaces/strategy';
import { useId } from 'hooks/useId';

type StrategyEditButtonProps = {
  strategy: IStrategy;
  onClick: () => void;
};

export const StrategyEditButton = ({
  strategy,
  onClick,
}: StrategyEditButtonProps) => {
  const id = useId();

  return (
    <ConditionallyRender
      condition={strategy?.editable}
      show={
        <PermissionIconButton
          onClick={onClick}
          permission={UPDATE_STRATEGY}
          tooltipProps={{ title: 'Edit strategy' }}
        >
          <Edit />
        </PermissionIconButton>
      }
      elseShow={
        <Tooltip title='You cannot edit a built-in strategy' arrow>
          <div id={id}>
            <IconButton disabled size='large'>
              <Edit aria-labelledby={id} />
            </IconButton>
          </div>
        </Tooltip>
      }
    />
  );
};
