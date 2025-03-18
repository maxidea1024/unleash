import type React from 'react';
import { useState } from 'react';
import { ConstraintFormHeader } from '../ConstraintFormHeader/ConstraintFormHeader';
import { FormControl, RadioGroup, Radio, Alert } from '@mui/material';
import { ConstraintValueSearch } from 'component/common/ConstraintAccordion/ConstraintValueSearch/ConstraintValueSearch';
import { useThemeStyles } from 'themes/themeStyles';
import type { ILegalValue } from 'interfaces/context';
import {
  LegalValueLabel,
  filterLegalValues,
} from '../LegalValueLabel/LegalValueLabel';
import { getIllegalValues } from '../RestrictiveLegalValues/RestrictiveLegalValues';

type SingleLegalValueProps = {
  setValue: (value: string) => void;
  value?: string;
  type: string;
  legalValues: ILegalValue[];
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  data: {
    legalValues: ILegalValue[];
    deletedLegalValues: ILegalValue[];
  };
  constraintValue: string;
};

export const SingleLegalValue = ({
  setValue,
  value,
  type,
  legalValues,
  error,
  setError,
  data,
  constraintValue,
}: SingleLegalValueProps) => {
  const [filter, setFilter] = useState('');
  const { classes: styles } = useThemeStyles();
  const filteredValues = filterLegalValues(legalValues, filter);

  const { deletedLegalValues } = data;

  const illegalValues = getIllegalValues([constraintValue], deletedLegalValues);

  return (
    <>
      {illegalValues && illegalValues.length > 0 && (
        <Alert
          severity='warning'
          sx={(theme) => ({ marginTop: theme.spacing(1) })}
        >
          {' '}
          This constraint is using legal values that have been deleted as a
          valid option. Please select a new value from the remaining predefined
          legal values. The constraint will be updated with the new value when
          you save the strategy.
        </Alert>
      )}
      <ConstraintFormHeader>
        Add a single {type.toLowerCase()} value
      </ConstraintFormHeader>
      {legalValues.length > 100 && (
        <ConstraintValueSearch filter={filter} setFilter={setFilter} />
      )}
      {legalValues.length ? (
        <FormControl component='fieldset'>
          <RadioGroup
            aria-label='selected-value'
            name='selected'
            value={value}
            onChange={(e) => {
              setError('');
              setValue(e.target.value);
            }}
          >
            {filteredValues.map((match) => (
              <LegalValueLabel
                key={match.value}
                legal={match}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      ) : (
        <p>No valid legal values available for this operator.</p>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};
