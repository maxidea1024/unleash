import type { ILegalValue } from 'interfaces/context';
import { useStyles } from './LegalValueLabel.styles';
import type React from 'react';
import { FormControlLabel } from '@mui/material';

type LegalValueTextProps = {
  legal: ILegalValue;
  control: React.ReactElement;
};

export const LegalValueLabel = ({ legal, control }: LegalValueTextProps) => {
  const { classes: styles } = useStyles();

  return (
    <div className={styles.container}>
      <FormControlLabel
        value={legal.value}
        control={control}
        label={
          <>
            <div className={styles.value}>{legal.value}</div>
            <div className={styles.description}>{legal.description}</div>
          </>
        }
      />
    </div>
  );
};

export const filterLegalValues = (
  legalValues: ILegalValue[],
  filter: string,
): ILegalValue[] => {
  return legalValues.filter((legalValue) => {
    return legalValue.value.includes(filter);
  });
};
