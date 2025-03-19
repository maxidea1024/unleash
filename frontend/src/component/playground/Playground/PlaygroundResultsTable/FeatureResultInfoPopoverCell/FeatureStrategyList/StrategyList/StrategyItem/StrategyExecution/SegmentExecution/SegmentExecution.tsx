import { Fragment } from 'react';
import type { PlaygroundSegmentSchema, PlaygroundRequestSchema } from 'openapi';
import { ConstraintExecution } from '../ConstraintExecution/ConstraintExecution';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import { StrategySeparator } from 'component/common/StrategySeparator/StrategySeparator';
import { styled, Typography } from '@mui/material';
import { SegmentItem } from 'component/common/SegmentItem/SegmentItem';

const SegmentResultTextWrapper = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  display: 'inline-flex',
  justifyContent: 'center',
  marginLeft: 'auto',
  gap: theme.spacing(1),
}));

type SegmentExecutionProps = {
  segments?: PlaygroundSegmentSchema[];
  input?: PlaygroundRequestSchema;
};

export const SegmentExecution = ({
  segments,
  input,
}: SegmentExecutionProps) => {
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
              <ConstraintExecution
                constraints={segment.constraints}
                input={input}
              />
            }
            headerContent={
              !segment.result ? (
                <SegmentResultTextWrapper>
                  <Typography variant={'subtitle2'} sx={{ pt: 0.25 }}>
                    segment is false
                  </Typography>
                  <span>
                    <CancelOutlined />
                  </span>
                </SegmentResultTextWrapper>
              ) : undefined
            }
            isExpanded
          />
          {index >= 0 &&
            segments.length > 1 &&
            index !== segments.length - 1 && <StrategySeparator text='AND' />}
        </Fragment>
      ))}
    </>
  );
};
