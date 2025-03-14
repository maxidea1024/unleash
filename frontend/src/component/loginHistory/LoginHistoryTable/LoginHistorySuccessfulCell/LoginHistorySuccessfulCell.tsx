import { Box, styled } from '@mui/material';
import { Highlighter } from 'component/common/Highlighter/Highlighter';
import { useSearchHighlightContext } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import type { ILoginEvent } from 'interfaces/loginEvent';
import { Badge } from 'component/common/Badge/Badge';
import { HtmlTooltip } from 'component/common/HtmlTooltip/HtmlTooltip';

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

type LoginHistorySuccessfulCellProps = {
  row: {
    original: ILoginEvent;
  };
  value: boolean;
};

export const LoginHistorySuccessfulCell = ({
  row,
  value,
}: LoginHistorySuccessfulCellProps) => {
  const { searchQuery } = useSearchHighlightContext();

  if (value) {
    return (
      <StyledBox>
        <Badge color='success'>True</Badge>
      </StyledBox>
    );
  }

  return (
    <StyledBox>
      <HtmlTooltip
        arrow
        title={
          <Highlighter search={searchQuery}>
            {row.original.failure_reason}
          </Highlighter>
        }
      >
        <Badge color='error'>False</Badge>
      </HtmlTooltip>
    </StyledBox>
  );
};
