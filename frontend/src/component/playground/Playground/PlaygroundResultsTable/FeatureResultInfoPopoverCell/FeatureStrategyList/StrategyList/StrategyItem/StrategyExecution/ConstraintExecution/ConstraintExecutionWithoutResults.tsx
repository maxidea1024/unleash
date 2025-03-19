import { Fragment } from 'react';
import type { PlaygroundConstraintSchema } from 'openapi';
import { objectId } from 'utils/objectId';
import { StrategySeparator } from 'component/common/StrategySeparator/StrategySeparator';
import { styled } from '@mui/material';
import { ConstraintAccordionView } from 'component/common/ConstraintAccordion/ConstraintAccordionView/ConstraintAccordionView';

export const ConstraintExecutionWrapper = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

type ConstraintExecutionWithoutResultsProps = {
  constraints?: PlaygroundConstraintSchema[];
};

export const ConstraintExecutionWithoutResults = ({
  constraints,
}: ConstraintExecutionWithoutResultsProps) => {
  if (!constraints) {
    return null;
  }

  return (
    <ConstraintExecutionWrapper>
      {constraints?.map((constraint, index) => (
        <Fragment key={objectId(constraint)}>
          {index > 0 && <StrategySeparator text='AND' />}
          <ConstraintAccordionView constraint={constraint} compact disabled />
        </Fragment>
      ))}
    </ConstraintExecutionWrapper>
  );
};
