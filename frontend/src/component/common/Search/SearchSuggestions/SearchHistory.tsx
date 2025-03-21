import History from '@mui/icons-material/History';
import { Box, styled } from '@mui/material';
import { StyledCode } from './SearchInstructions/SearchInstructions';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';
import { onEnter } from './onEnter';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

const StyledHistory = styled(History)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

type SearchHistoryProps = {
  onSuggestion: (suggestion: string) => void;
  savedQuery?: string;
};

export const SearchHistory = ({
  onSuggestion,
  savedQuery,
}: SearchHistoryProps) => {
  const { trackEvent } = usePlausibleTracker();
  const onSavedQuery = () => {
    onSuggestion(savedQuery || '');
    trackEvent('search-filter-suggestions', {
      props: {
        eventType: 'saved query',
      },
    });
  };

  return (
    Boolean(savedQuery) && (
      <StyledBox>
        <StyledHistory />
        <StyledCode
          tabIndex={0}
          onClick={onSavedQuery}
          onKeyDown={onEnter(onSavedQuery)}
        >
          <span>{savedQuery}</span>
        </StyledCode>
      </StyledBox>
    )
  );
};
