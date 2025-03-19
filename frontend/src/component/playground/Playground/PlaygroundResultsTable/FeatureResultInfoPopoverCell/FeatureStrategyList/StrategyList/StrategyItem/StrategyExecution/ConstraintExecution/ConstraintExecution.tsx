import { Fragment } from 'react';
import type {
  PlaygroundConstraintSchema,
  PlaygroundRequestSchema,
} from 'openapi';
import { objectId } from 'utils/objectId';
import { StrategySeparator } from 'component/common/StrategySeparator/StrategySeparator';
import { styled } from '@mui/material';
import { ConstraintAccordionView } from 'component/common/ConstraintAccordion/ConstraintAccordionView/ConstraintAccordionView';
import { ConstraintError } from './ConstraintError/ConstraintError';
import { ConstraintOk } from './ConstraintOk/ConstraintOk';

export const ConstraintExecutionWrapper = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

type ConstraintExecutionProps = {
  constraints?: PlaygroundConstraintSchema[];
  input?: PlaygroundRequestSchema;
};

export const ConstraintExecution = ({
  constraints,
  input,
}: ConstraintExecutionProps) => {
  if (!constraints) {
    return null;
  }

  return (
    <ConstraintExecutionWrapper>
      {constraints?.map((constraint, index) => (
        <Fragment key={objectId(constraint)}>
          {index > 0 && <StrategySeparator text='AND' />}
          <ConstraintAccordionView
            constraint={constraint}
            compact
            renderAfter={
              constraint.result ? (
                <ConstraintOk />
              ) : (
                <ConstraintError input={input} constraint={constraint} />
              )
            }
          />
        </Fragment>
      ))}
    </ConstraintExecutionWrapper>
  );
};
