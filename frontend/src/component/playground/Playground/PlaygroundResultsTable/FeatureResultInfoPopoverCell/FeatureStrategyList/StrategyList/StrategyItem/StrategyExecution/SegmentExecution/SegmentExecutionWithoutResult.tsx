import { Fragment } from 'react';
import type { PlaygroundSegmentSchema } from 'openapi';
import { StrategySeparator } from 'component/common/StrategySeparator/StrategySeparator';
import { SegmentItem } from 'component/common/SegmentItem/SegmentItem';
import { ConstraintExecutionWithoutResults } from '../ConstraintExecution/ConstraintExecutionWithoutResults';

type SegmentExecutionWithoutResultProps = {
  segments?: PlaygroundSegmentSchema[];
};

export const SegmentExecutionWithoutResult = ({
  segments,
}: SegmentExecutionWithoutResultProps) => {
  if (!segments) {
    return null;
  }

  return (
    <>
      {segments.map((segment, index) => (
        <Fragment key={segment.id}>
          <SegmentItem
            segment={segment}
            constraintList={
              <ConstraintExecutionWithoutResults
                constraints={segment.constraints}
              />
            }
            isExpanded
            disabled
          />
          {index >= 0 &&
            segments.length > 1 &&
            index !== segments.length - 1 && <StrategySeparator text='AND' />}
        </Fragment>
      ))}
    </>
  );
};
