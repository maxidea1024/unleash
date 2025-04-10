import { styled, Typography } from '@mui/material';
import { formatAssetPath } from 'utils/formatPath';

export const StyledFigure = styled('figure')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  margin: theme.spacing(2, 0),
  flexDirection: 'column',
}));

export const StyledFigCaption = styled('figcaption')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexDirection: 'column',
}));

export const StyledImg = styled('img')({
  maxWidth: '100%',
  maxHeight: '100%',
  width: 'auto',
  height: 'auto',
});

type JiraIntegrationProps = {
  title: string;
  description: string;
  src: string;
};

export const JiraImageContainer = ({
  title,
  description,
  src,
}: JiraIntegrationProps) => {
  return (
    <StyledFigure>
      <StyledFigCaption>
        <Typography variant={'h3'}>{title}</Typography>
        <Typography>{description}</Typography>
      </StyledFigCaption>
      <StyledImg src={formatAssetPath(src)} alt={title} />
    </StyledFigure>
  );
};
