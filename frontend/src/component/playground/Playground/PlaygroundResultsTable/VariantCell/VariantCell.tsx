import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { IconButton, Popover, styled, useTheme } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { VariantInformation } from './VariantInformation/VariantInformation';
import type { IFeatureVariant } from 'interfaces/featureToggle';

const StyledDiv = styled('div')(() => ({
  maxWidth: '100%',
  display: 'flex',
  alignItems: 'center',
  wordBreak: 'break-all',
}));

type VariantCellProps = {
  variant: string;
  variants: IFeatureVariant[];
  feature: string;
  isEnabled: boolean;
};

export const VariantCell = ({
  variant,
  variants,
  feature,
  isEnabled,
}: VariantCellProps) => {
  const theme = useTheme();
  const [anchor, setAnchorEl] = useState<null | Element>(null);

  const onOpen = (event: React.FormEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const onClose = () => setAnchorEl(null);

  const open = Boolean(anchor);

  return (
    <StyledDiv>
      {variant}
      {Boolean(variants) && variants.length > 0 && isEnabled && (
        <>
          <IconButton onClick={onOpen}>
            <InfoOutlined />
          </IconButton>

          <Popover
            open={open}
            id={`${feature}-result-variants`}
            PaperProps={{
              sx: {
                borderRadius: `${theme.shape.borderRadiusLarge}px`,
              },
            }}
            onClose={onClose}
            anchorEl={anchor}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: -320,
            }}
          >
            <VariantInformation variants={variants} selectedVariant={variant} />
          </Popover>
        </>
      )}
    </StyledDiv>
  );
};
