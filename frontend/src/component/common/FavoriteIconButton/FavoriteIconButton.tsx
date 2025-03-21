import { IconButton, type IconButtonProps } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { TooltipResolver } from '../TooltipResolver/TooltipResolver';

type FavoriteIconButtonProps = IconButtonProps & {
  isFavorite: boolean;
  size?: 'medium' | 'large';
};

export const FavoriteIconButton = ({
  isFavorite,
  size = 'large',
  ...props
}: FavoriteIconButtonProps) => {
  return (
    <TooltipResolver
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <IconButton size={size} data-loading {...props}>
        {isFavorite ? (
          <StarIcon
            color='primary'
            sx={{
              fontSize: (theme) =>
                size === 'medium' ? theme.spacing(2) : theme.spacing(3),
            }}
          />
        ) : (
          <StarBorderIcon
            color='primary'
            sx={{
              fontSize: (theme) =>
                size === 'medium' ? theme.spacing(2) : theme.spacing(3),
            }}
          />
        )}
      </IconButton>
    </TooltipResolver>
  );
};
