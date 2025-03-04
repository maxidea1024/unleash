import type { FC } from 'react';
import { IconButton, type IconButtonProps } from '@mui/material';
import { ConditionallyRender } from '../ConditionallyRender/ConditionallyRender';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { TooltipResolver } from '../TooltipResolver/TooltipResolver';

type FavoriteIconButtonProps = IconButtonProps & {
  isFavorite: boolean;
  size?: 'medium' | 'large';
};

export const FavoriteIconButton: FC<FavoriteIconButtonProps> = ({
  isFavorite,
  size = 'large',
  ...props
}) => {
  return (
    <TooltipResolver
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <IconButton size={size} data-loading {...props}>
        <ConditionallyRender
          condition={isFavorite}
          show={
            <StarIcon
              color='primary'
              sx={{
                fontSize: (theme) =>
                  size === 'medium' ? theme.spacing(2) : theme.spacing(3),
              }}
            />
          }
          elseShow={
            <StarBorderIcon
              color='primary'
              sx={{
                fontSize: (theme) =>
                  size === 'medium' ? theme.spacing(2) : theme.spacing(3),
              }}
            />
          }
        />
      </IconButton>
    </TooltipResolver>
  );
};
