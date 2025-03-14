import { safeRegExp } from '@server/util/escape-regex';
import { styled } from '@mui/material';

type HighlighterProps = {
  search?: string;
  children?: string;
  caseSensitive?: boolean;
};

export const StyledSpan = styled('span')(({ theme }) => ({
  '&>mark': {
    backgroundColor: theme.palette.highlight,
  },
}));

export const Highlighter = ({
  search,
  children,
  caseSensitive,
}: HighlighterProps) => {
  if (!children) {
    return null;
  }

  if (!search) {
    return <>{children}</>;
  }

  const searchTerms = search.split(',').map((term) => term.trim());
  const searchRegex = searchTerms
    .map((term) => safeRegExp(term, '').source)
    .join('|');
  const regex = new RegExp(searchRegex, caseSensitive ? 'g' : 'gi');

  const parts = children.split(regex);

  const matches = Array.from(children.matchAll(regex)).map((match) => match[0]);

  const highlightedText = parts.flatMap((part, index) => {
    return index < matches.length
      ? [part, <mark key={index}>{matches[index]}</mark>]
      : [part];
  });

  return <StyledSpan>{highlightedText}</StyledSpan>;
};
