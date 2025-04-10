import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { TooltipLink } from 'component/common/TooltipLink/TooltipLink';
import { useSearchHighlightContext } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { Highlighter } from 'component/common/Highlighter/Highlighter';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  padding: theme.spacing(1, 0, 1, 2),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  '&:hover, &:focus': {
    textDecoration: 'underline',
  },
}));

const StyledTooltipLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  '&:hover, &:focus': {
    textDecoration: 'underline',
  },
}));

const StyledTooltipContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  fontSize: theme.fontSizes.smallBody,
  width: '100%',
  whiteSpace: 'nowrap',
}));

type FeaturesCellProps = {
  value: any;
  project: string;
};

export const FeaturesCell = ({ value, project }: FeaturesCellProps) => {
  const { searchQuery } = useSearchHighlightContext();
  const featureNames = value?.map((feature: any) => feature.name);
  return (
    <StyledBox>
      {featureNames?.length < 3 ? (
        featureNames?.map((featureName: string) => (
          <StyledLink
            key={featureName}
            title={featureName}
            to={`/projects/${project}/features/${featureName}`}
          >
            <Highlighter search={searchQuery}>{featureName}</Highlighter>
          </StyledLink>
        ))
      ) : (
        <TooltipLink
          tooltipProps={{ maxWidth: '800px' }}
          tooltip={
            <StyledTooltipContainer>
              {featureNames?.map((featureName: string) => (
                <StyledTooltipLink
                  key={featureName}
                  title={featureName}
                  to={`/projects/${project}/features/${featureName}`}
                >
                  <Highlighter search={searchQuery}>{featureName}</Highlighter>
                </StyledTooltipLink>
              ))}
            </StyledTooltipContainer>
          }
        >
          {featureNames?.length} toggles
        </TooltipLink>
      )}
    </StyledBox>
  );
};
