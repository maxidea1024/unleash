import { styled } from '@mui/material';
import type { IFeatureNamingType } from 'interfaces/project';

const StyledFlagNamingInfo = styled('article')(({ theme }) => ({
  fontSize: theme.fontSizes.smallBody,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.elevation2}`,
  dl: {
    display: 'grid',
    gridTemplateColumns: 'max-content auto',
    rowGap: theme.spacing(1),
    columnGap: 0,
  },
  dt: {
    color: theme.palette.text.secondary,
    '&::after': { content: '":"' },
  },
  dd: {
    marginInlineStart: theme.spacing(2),
  },

  marginBlockEnd: theme.spacing(2),
}));

type FeatureNamingPatternInfoProps = {
  featureNaming: IFeatureNamingType;
};

export const FeatureNamingPatternInfo = ({
  featureNaming,
}: FeatureNamingPatternInfoProps) => {
  return (
    <StyledFlagNamingInfo>
      <p>This project has feature flag naming patterns enabled.</p>
      <dl id='feature-naming-pattern-info'>
        <dt>Pattern</dt>
        <dd>
          <code>^{featureNaming.pattern}$</code>
        </dd>
        {Boolean(featureNaming?.example) && (
          <>
            <dt>Example</dt>
            <dd>{featureNaming?.example}</dd>
          </>
        )}
        {Boolean(featureNaming?.description) && (
          <>
            <dt>Description</dt>
            <dd>{featureNaming?.description}</dd>
          </>
        )}
      </dl>
    </StyledFlagNamingInfo>
  );
};
