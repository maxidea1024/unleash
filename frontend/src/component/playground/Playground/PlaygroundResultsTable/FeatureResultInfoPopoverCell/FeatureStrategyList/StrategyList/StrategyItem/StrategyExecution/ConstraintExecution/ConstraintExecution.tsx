import { Fragment } from 'react';
import type {
  PlaygroundConstraintSchema,
  PlaygroundRequestSchema,
} from 'openapi';
import { objectId } from 'utils/objectId';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
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
          <ConditionallyRender
            condition={index > 0}
            show={<StrategySeparator text='AND' />}
          />
          <ConstraintAccordionView
            constraint={constraint}
            compact
            renderAfter={
              <ConditionallyRender
                condition={constraint.result}
                show={<ConstraintOk />}
                elseShow={
                  <ConstraintError input={input} constraint={constraint} />
                }
              />
            }
          />
        </Fragment>
      ))}
    </ConstraintExecutionWrapper>
  );
};
