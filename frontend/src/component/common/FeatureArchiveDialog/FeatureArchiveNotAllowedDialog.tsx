import { Dialogue } from '../Dialogue/Dialogue';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: theme.fontWeight.bold,
}));

type FeatureArchiveNotAllowedDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  features: string[];
  project: string;
};

export const FeatureArchiveNotAllowedDialog = ({
  isOpen,
  onClose,
  features,
  project,
}: FeatureArchiveNotAllowedDialogProps) => {
  return (
    <Dialogue
      title="You can't archive a feature that other features depend on"
      open={isOpen}
      primaryButtonText='OK'
      onClick={onClose}
    >
      <p>The following features depend on your feature:</p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <StyledLink
              to={`/projects/${project}/features/${feature}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {feature}
            </StyledLink>
          </li>
        ))}
      </ul>
    </Dialogue>
  );
};
