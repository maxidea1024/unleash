import { styled } from '@mui/material';
import EventDiff from 'component/events/EventDiff/EventDiff';
import type { IFeatureVariant } from 'interfaces/featureToggle';

const StyledCodeSection = styled('div')(({ theme }) => ({
  overflowX: 'auto',
  '& code': {
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
    lineHeight: 1.5,
    fontSize: theme.fontSizes.smallBody,
  },
}));

const variantsArrayToObject = (variants: IFeatureVariant[]) =>
  variants.reduce(
    (object, { name, ...variant }) => ({ ...object, [name]: variant }),
    {},
  );

type VariantDiffProp = {
  preData: IFeatureVariant[];
  data: IFeatureVariant[];
};

export const VariantDiff = ({ preData, data }: VariantDiffProp) => (
  <StyledCodeSection>
    <EventDiff
      entry={{
        preData: variantsArrayToObject(preData),
        data: variantsArrayToObject(data),
      }}
      sort={(a, b) => a.index - b.index}
    />
  </StyledCodeSection>
);
