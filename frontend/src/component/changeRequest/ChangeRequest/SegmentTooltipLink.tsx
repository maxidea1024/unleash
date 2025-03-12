import type {
  IChangeRequestDeleteSegment,
  IChangeRequestUpdateSegment,
} from 'component/changeRequest/changeRequest.types';
import type React from 'react';
import type { FC } from 'react';
import EventDiff from 'component/events/EventDiff/EventDiff';
import omit from 'lodash.omit';
import { TooltipLink } from 'component/common/TooltipLink/TooltipLink';
import { styled } from '@mui/material';
import { textTruncated } from 'themes/themeStyles';
import type { ISegment } from 'interfaces/segment';
import { NameWithChangeInfo } from './NameWithChangeInfo/NameWithChangeInfo';

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

type SegmentDiffProps = {
  change: IChangeRequestUpdateSegment | IChangeRequestDeleteSegment;
  currentSegment?: ISegment;
};

export const SegmentDiff = ({ change, currentSegment }: SegmentDiffProps) => {
  const changeRequestSegment =
    change.action === 'deleteSegment' ? undefined : change.payload;

  return (
    <StyledCodeSection>
      <EventDiff
        entry={{
          preData: omit(currentSegment, ['createdAt', 'createdBy']),
          data: changeRequestSegment,
        }}
      />
    </StyledCodeSection>
  );
};

const StyledContainer: FC<{ children?: React.ReactNode }> = styled('div')(
  ({ theme }) => ({
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(1),
    alignItems: 'center',
  }),
);

const Truncated = styled('div')(() => ({
  ...textTruncated,
  maxWidth: 500,
}));

type StrategyTooltipLinkProps = {
  change: IChangeRequestUpdateSegment | IChangeRequestDeleteSegment;
  children?: React.ReactNode;
};

export const SegmentTooltipLink = ({
  change,
  children,
}: StrategyTooltipLinkProps) => (
  <StyledContainer>
    <Truncated>
      <TooltipLink
        tooltip={children}
        tooltipProps={{
          maxWidth: 500,
          maxHeight: 600,
        }}
      >
        <NameWithChangeInfo
          previousName={change.name}
          newName={change.payload.name}
        />
      </TooltipLink>
    </Truncated>
  </StyledContainer>
);
